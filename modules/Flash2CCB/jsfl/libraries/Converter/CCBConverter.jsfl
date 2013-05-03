xjsfl.init(this, ['Node', 'Property', 'URI', 'LibraryPacker', 'Sequence', 'NodeSequence', 'CCBI', 'SequenceProperty', 'Value']);

function mapXMLLists(mapFunction, list /*, ...*/)
{
	var output = [];
	
	var length = list.length();
	for(var i = 2; i < arguments.length; i++)
	{
		if(length != arguments[i].length())
			throw new Error("XML lists passed to mapXMLLists have mismatched length");
	}
	
	var args = Array.prototype.splice.call(arguments, 1);
	var argItems = [];
	argItems.length = args.length;
	for(var i = 0; i < length; i++)
	{
		for(var a = 0; a < args.length; a++)
			argItems[a] = args[a][i];
		
		output.push(mapFunction.apply(null, argItems));
	}
	
	return output;
}

function anchorValue(xmlKeyframe)
{
	return parseFloat(xmlKeyframe.@anchor.split(",")[1]);
}

var CCBConverter =
{
    timelineToCCBI: function(timeline, libraryPacker)
    {
		// Set frame to 0, important for motion tweens
		timeline.currentFrame = 0;
		
		var ccbi = new CCBI(false, false);
		
		ccbi.sequences = CCBConverter.extractSequences(timeline);
		ccbi.sequenceAutoPlay = ccbi.sequences[0];
        ccbi.rootNode = new Node("CCNode");
        
        for(var layerIndex = 0; layerIndex < timeline.layers.length; layerIndex++)
        {
            var layerNode = CCBConverter.layerToNode(timeline.layers[layerIndex], libraryPacker, ccbi);
            
            if(layerNode)
                ccbi.rootNode.children.push(layerNode);
        }
		
		// Reverse to preserve Z-order
		ccbi.rootNode.children.reverse();
        
        return ccbi;
    },
	
	extractSequences: function(timeline)
	{
		// Try to find the sequences layer
		var sequenceLayerId = timeline.findLayerIndex("sequences");
		
		if(sequenceLayerId)
		{
			// Sequence layer, parse it up
			var sequenceLayer = timeline.layers[sequenceLayerId];
			var sequences = [];
			
			var frameSequenceId = 0;
			while(frameSequenceId < sequenceLayer.frameCount)
			{
				var frameSequence = sequenceLayer.frames[frameSequenceId];
				
				sequences.push(new Sequence(frameSequence.name, frameSequence.duration));
				
				frameSequenceId += frameSequence.duration;
			}
			
			return sequences;
		}
		else
		{
			// No sequence layer, return a single long sequence with default name
			var defaultSequence = new Sequence("default", timeline.frameCount / fl.getDocumentDOM().frameRate);
			
			defaultSequence.chained = defaultSequence;
			
			return [defaultSequence];
		}
	},
	
	motionToNodeSequence: function(frame, parentSequence, element)
	{
		if(!frame.isMotionObject())
			throw new Error("Cannot extract motion from frame sequence without Motion Tween");
		
		if(frame.hasCustomEase)
			throw new Error("ccbi files do not support custom ease");
		
		var motion = XML(frame.getMotionObjectXML());
		var sequence = new NodeSequence(parentSequence);
		
		var fps = motion.@TimeScale;
		
		var position = new SequenceProperty("position");
		var rotationX = new SequenceProperty("rotationX");
		var rotationY = new SequenceProperty("rotationY");
		var opacity = new SequenceProperty("opacity");
		var color = new SequenceProperty("color");
		var visible = new SequenceProperty("visible");
		var scale = new SequenceProperty("scale");
		
		// Find the shit in the XML w00t
		var basicMotion = motion.PropertyContainer.PropertyContainer.(@id == "Basic_Motion");
		var transform = motion.PropertyContainer.PropertyContainer.(@id == "Transformation");
		var colors = motion.PropertyContainer.PropertyContainer.(@id == "Colors");
		var filters = motion.PropertyContainer.PropertyContainer.(@id == "Filters");
		
		position.keyframes = mapXMLLists(
			function(xKey, yKey)
			{
				var x = anchorValue(xKey) + element.transformX;
				var y = fl.getDocumentDOM().height - anchorValue(yKey) - element.transformY;
				
				return new Keyframe(xKey.@timevalue / fps, new Value.FloatXY(x, y));
			},
			basicMotion.Property.(@id == "Motion_X").Keyframe,
			basicMotion.Property.(@id == "Motion_Y").Keyframe
		);
		
		var toDegrees = function(rotKey, skewKey)
		{
			return new Keyframe(rotKey.@timevalue / fps, new Value.Degrees(anchorValue(rotKey) + anchorValue(skewKey)));
		};
		
		var rotationKeyframes = basicMotion.Property.(@id == "Rotation_Z").Keyframe;
		rotationX.keyframes = mapXMLLists(toDegrees, rotationKeyframes, transform.Property.(@id == "Skew_X").Keyframe);
		rotationY.keyframes = mapXMLLists(toDegrees, rotationKeyframes, transform.Property.(@id == "Skew_Y").Keyframe);
		
		opacity.keyframes = mapXMLLists(
			function(colorKey)
			{
				var opacity = colorKey.@value & 0x000000ff;
				
				return new Keyframe(colorKey.@timevalue / fps, new Value.Byte(opacity));
			},
			colors.Property.(@id == "Tint_ColorXform").Keyframe
		);
		
		color.keyframes = mapXMLLists(
			function(colorKey)
			{
				var r = (colorKey.@value & 0xff000000) >> 24;
				var g = (colorKey.@value & 0x00ff0000) >> 16;
				var b = (colorKey.@value & 0x0000ff00) >> 8;
				
				return new Keyframe(colorKey.@timevalue / fps, new Value.Color3(r, g, b));
			},
			colors.Property.(@id == "Tint_ColorXform").Keyframe
		);
		
		scale.keyframes = mapXMLLists(
			function(xKey, yKey)
			{
				var x = anchorValue(xKey) / 100.0;
				var y = anchorValue(yKey) / 100.0;
				return new Keyframe(xKey.@timevalue / fps, new Value.FloatXY(x, y));
			},
			transform.Property.(@id == "Scale_X").Keyframe,
			transform.Property.(@id == "Scale_Y").Keyframe
		);
		
		sequence.properties.push(position);
		sequence.properties.push(rotationX);
		sequence.properties.push(rotationY);
		//sequence.properties.push(opacity);
		//sequence.properties.push(color);
		//sequence.properties.push(visible);
		sequence.properties.push(scale);
		
		return sequence;
	},
    
    layerToNode: function(layer, libraryPacker, ccbi)
    {
        if(layer.layerType != "normal")
            return null;
		
		// is it a motion tween?
		if(layer.animationType == "motion object")
		{
			var frame = layer.frames[0];
			var node = CCBConverter.elementToNode(frame.elements[0], libraryPacker);
			
			node.nodeSequences.push(CCBConverter.motionToNodeSequence(frame, ccbi.sequences[0], frame.elements[0]));
			
			return node;
		}
        else
		{
			var node = new Node("CCLayer");
			
			var frame = layer.frames[0];
			
			for(var elementIndex = 0; elementIndex < frame.elements.length; elementIndex++)
			{
				var elementNode = CCBConverter.elementToNode(frame.elements[elementIndex], libraryPacker);
				
				if(elementNode)
					node.children.push(elementNode);
			}
			
			return node;
		}
    },
    
    elementToNode: function(element, libraryPacker)
    {
        if(element.elementType != 'instance')
            return null;
        
        if(element.instanceType != 'bitmap' && element.instanceType != 'symbol')
            return null;
		
		libraryPacker.addItem(element.libraryItem);
		
		var spriteName = URI.getName(element.libraryItem.name);
		if(element.instanceType == 'symbol')
			spriteName += "0000";
		
		// Getting and setting prevents a bug where transformation point will say 0,0 but not be there
		var anchor = element.getTransformationPoint();
		element.setTransformationPoint(anchor);
		
		anchor.x = anchor.x / element.width;
		anchor.y = 1.0 - anchor.y / element.height;
        
        var node = new Node("CCSprite");
        node.regularProperties.push(new Property("position", new Value.Position(element.transformX, fl.getDocumentDOM().height - element.transformY, Value.PositionType.RelativeBottomLeft)));
        node.regularProperties.push(new Property("contentSize", new Value.Size(element.width, element.height, Value.SizeType.Absolute)));
        node.regularProperties.push(new Property("anchorPoint", new Value.Point(anchor.x, anchor.y)));
        node.regularProperties.push(new Property("scale", new Value.ScaleLock(element.scaleX, element.scaleY, Value.ScaleType.Absolute)));
        node.regularProperties.push(new Property("rotationX", new Value.Degrees(element.skewX)));
        node.regularProperties.push(new Property("rotationY", new Value.Degrees(element.skewY)));
        node.regularProperties.push(new Property("displayFrame", new Value.SpriteFrame(element.libraryItem.getData("spriteSheet"), spriteName)));
		
		trace(spriteName + ": " + element.transformX + ", " + (fl.getDocumentDOM().height - element.transformY));
        
        return node;
    }
};

xjsfl.classes.register('CCBConverter', CCBConverter);