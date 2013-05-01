xjsfl.init(this, ['Node', 'Property', 'URI', 'LibraryPacker']);

var CCBConverter =
{
    timelineToNode: function(timeline, libraryPacker)
    {
        var node = new Node("CCLayer");
        
        for(var layerIndex in timeline.layers)
        {
            var layerNode = CCBConverter.layerToNode(timeline.layers[layerIndex], libraryPacker);
            
            if(layerNode)
                node.children.push(layerNode);
        }
		
		// Reverse to preserve Z-order
		node.children.reverse();
        
        return node;
    },
    
    layerToNode: function(layer, libraryPacker)
    {
        if(layer.layerType != "normal")
            return null;
        
        var node = new Node("CCLayer");
		
		var frame = layer.frames[0];
        
        for(var elementIndex in frame.elements)
        {
            var elementNode = CCBConverter.elementToNode(frame.elements[elementIndex], libraryPacker);
            
            if(elementNode)
                node.children.push(elementNode);
        }
		
		return node;
    },
    
    elementToNode: function(element, libraryPacker)
    {
        if(element.elementType != 'instance')
            return null;
        
        if(element.instanceType != 'bitmap' && element.instanceType != 'symbol')
            return null;
		
		libraryPacker.addItem(element.libraryItem);
		
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
        node.regularProperties.push(new Property("displayFrame", new Value.SpriteFrame(element.libraryItem.getData("spriteSheet"), URI.getName(element.libraryItem.name))));
        
        return node;
    }
};

xjsfl.classes.register('CCBConverter', CCBConverter);