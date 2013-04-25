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
        node.regularProperties.push(new Property.Position("position", element.transformX, fl.getDocumentDOM().height - element.transformY, Property.PositionType.RelativeBottomLeft));
        node.regularProperties.push(new Property.Size("contentSize", element.width, element.height, Property.SizeType.Absolute));
        node.regularProperties.push(new Property.Point("anchorPoint", anchor.x, anchor.y));
        node.regularProperties.push(new Property.ScaleLock("scale", element.scaleX, element.scaleY, Property.ScaleType.Absolute));
        node.regularProperties.push(new Property.Degrees("rotationX", element.skewX));
        node.regularProperties.push(new Property.Degrees("rotationY", element.skewY));
        node.regularProperties.push(new Property.SpriteFrame("displayFrame", element.libraryItem.getData("spriteSheet"), URI.getName(element.libraryItem.name)));
        
        return node;
    }
};

xjsfl.classes.register('CCBConverter', CCBConverter);