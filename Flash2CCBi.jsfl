function count(obj)
{
	var count = 0;
	for (var i in obj)
	{
		count++;
	}
	return count;
}

var CCBIProperty =
{
	Position: function(name, x, y, positionType)
	{
		return {
			propertyName: name,
			platform: 0,
			typeID: 0,
			cacheStrings: function(ccbi)
			{
				ccbi.addToStringCache(this.propertyName, false);
			},
			serialize: function(ccbi, outputFile)
			{
				JSFLBitWriter.writeFloat(x, outputFile);
				JSFLBitWriter.writeFloat(y, outputFile);
				JSFLBitWriter.writeUInt(positionType, outputFile);
			}
		};
	},
	Point: function(name, x, y)
	{
		return {
			propertyName: name,
			platform: 0,
			typeID: 2,
			cacheStrings: function(ccbi)
			{
				ccbi.addToStringCache(this.propertyName, false);
			},
			serialize: function(ccbi, outputFile)
			{
				JSFLBitWriter.writeFloat(x, outputFile);
				JSFLBitWriter.writeFloat(y, outputFile);
			}
		};
	},
	PointLock: function(name, x, y)
	{
		return {
			propertyName: name,
			platform: 0,
			typeID: 3,
			cacheStrings: function(ccbi)
			{
				ccbi.addToStringCache(this.propertyName, false);
			},
			serialize: function(ccbi, outputFile)
			{
				JSFLBitWriter.writeFloat(x, outputFile);
				JSFLBitWriter.writeFloat(y, outputFile);
			}
		};
	},
	Size: function(name, width, height, sizeType)
	{
		return {
			propertyName: name,
			platform: 0,
			typeID: 1,
			cacheStrings: function(ccbi)
			{
				ccbi.addToStringCache(this.propertyName, false);
			},
			serialize: function(ccbi, outputFile)
			{
				JSFLBitWriter.writeFloat(width, outputFile);
				JSFLBitWriter.writeFloat(height, outputFile);
				JSFLBitWriter.writeUInt(sizeType, outputFile);
			}
		};
	},
	ScaleLock: function(name, x, y, scaleType)
	{
		return {
			propertyName: name,
			platform: 0,
			typeID: 4,
			cacheStrings: function(ccbi)
			{
				ccbi.addToStringCache(this.propertyName, false);
			},
			serialize: function(ccbi, outputFile)
			{
				JSFLBitWriter.writeFloat(x, outputFile);
				JSFLBitWriter.writeFloat(y, outputFile);
				JSFLBitWriter.writeUInt(scaleType, outputFile);
			}
		};
	},
	Flip: function(name, x, y)
	{
		return {
			propertyName: name,
			platform: 0,
			typeID: 15,
			cacheStrings: function(ccbi)
			{
				ccbi.addToStringCache(this.propertyName, false);
			},
			serialize: function(ccbi, outputFile)
			{
				JSFLBitWriter.writeBool(x, outputFile);
				JSFLBitWriter.writeBool(y, outputFile);
			}
		};
	},
	Float: function(name, value)
	{
		return {
			propertyName: name,
			platform: 0,
			typeID: 7,
			cacheStrings: function(ccbi)
			{
				ccbi.addToStringCache(this.propertyName, false);
			},
			serialize: function(ccbi, outputFile)
			{
				JSFLBitWriter.writeFloat(value, outputFile);
			}
		};
	},
	Degrees: function(name, value)
	{
		return {
			propertyName: name,
			platform: 0,
			typeID: 5,
			cacheStrings: function(ccbi)
			{
				ccbi.addToStringCache(this.propertyName, false);
			},
			serialize: function(ccbi, outputFile)
			{
				JSFLBitWriter.writeFloat(value, outputFile);
			}
		};
	},
	FloatVar: function(name, value, valueVar)
	{
		return {
			propertyName: name,
			platform: 0,
			typeID: 8,
			cacheStrings: function(ccbi)
			{
				ccbi.addToStringCache(this.propertyName, false);
			},
			serialize: function(ccbi, outputFile)
			{
				JSFLBitWriter.writeFloat(value, outputFile);
				JSFLBitWriter.writeFloat(valueVar, outputFile);
			}
		};
	},
	Integer: function(name, value)
	{
		return {
			propertyName: name,
			platform: 0,
			typeID: 6,
			cacheStrings: function(ccbi)
			{
				ccbi.addToStringCache(this.propertyName, false);
			},
			serialize: function(ccbi, outputFile)
			{
				JSFLBitWriter.writeInt(value, outputFile);
			}
		};
	},
	IntegerLabeled: function(name, value)
	{
		return {
			propertyName: name,
			platform: 0,
			typeID: 20,
			cacheStrings: function(ccbi)
			{
				ccbi.addToStringCache(this.propertyName, false);
			},
			serialize: function(ccbi, outputFile)
			{
				JSFLBitWriter.writeInt(value, outputFile);
			}
		};
	},
	Byte: function(name, value)
	{
		return {
			propertyName: name,
			platform: 0,
			typeID: 12,
			cacheStrings: function(ccbi)
			{
				ccbi.addToStringCache(this.propertyName, false);
			},
			serialize: function(ccbi, outputFile)
			{
				JSFLBitWriter.writeByte(value, outputFile);
			}
		};
	},
	Check: function(name, value)
	{
		return {
			propertyName: name,
			platform: 0,
			typeID: 9,
			cacheStrings: function(ccbi)
			{
				ccbi.addToStringCache(this.propertyName, false);
			},
			serialize: function(ccbi, outputFile)
			{
				JSFLBitWriter.writeBool(value, outputFile);
			}
		};
	},
	Text: function(name, value)
	{
		return {
			propertyName: name,
			platform: 0,
			typeID: 18,
			cacheStrings: function(ccbi)
			{
				ccbi.addToStringCache(this.propertyName, false);
				ccbi.addToStringCache(value, false);
			},
			serialize: function(ccbi, outputFile)
			{
				ccbi.writeString(value, false, outputFile);
			}
		};
	},
	SpriteFrame: function(name, spriteSheetFile, spriteFile)
	{
		return {
			propertyName: name,
			platform: 0,
			typeID: 10,
			cacheStrings: function(ccbi)
			{
				ccbi.addToStringCache(this.propertyName, false);
				ccbi.addToStringCache(spriteSheetFile, true);
				ccbi.addToStringCache(spriteFile, false);
			},
			serialize: function(ccbi, outputFile)
			{
				ccbi.writeString(spriteSheetFile, true, outputFile);
				ccbi.writeString(spriteFile, false, outputFile);
			}
		};
	},
	Texture: function(name, spriteFile)
	{
		return {
			propertyName: name,
			platform: 0,
			typeID: 11,
			cacheStrings: function(ccbi)
			{
				ccbi.addToStringCache(this.propertyName, false);
				ccbi.addToStringCache(spriteFile, true);
			},
			serialize: function(ccbi, outputFile)
			{
				ccbi.writeString(spriteFile, true, outputFile);
			}
		};
	},
	FntFile: function(name, fntFile)
	{
		return {
			propertyName: name,
			platform: 0,
			typeID: 17,
			cacheStrings: function(ccbi)
			{
				ccbi.addToStringCache(this.propertyName, false);
				ccbi.addToStringCache(fntFile, true);
			},
			serialize: function(ccbi, outputFile)
			{
				ccbi.writeString(fntFile, true, outputFile);
			}
		};
	},
	FontTTF: function(name, fontName)
	{
		return {
			propertyName: name,
			platform: 0,
			typeID: 19,
			cacheStrings: function(ccbi)
			{
				ccbi.addToStringCache(this.propertyName, false);
				ccbi.addToStringCache(fontName, false);
			},
			serialize: function(ccbi, outputFile)
			{
				ccbi.writeString(fontName, false, outputFile);
			}
		};
	},
	Color3: function(name, r, g, b)
	{
		return {
			propertyName: name,
			platform: 0,
			typeID: 13,
			cacheStrings: function(ccbi)
			{
				ccbi.addToStringCache(this.propertyName, false);
			},
			serialize: function(ccbi, outputFile)
			{
				JSFLBitWriter.writeByte(r, outputFile);
				JSFLBitWriter.writeByte(g, outputFile);
				JSFLBitWriter.writeByte(b, outputFile);
			}
		};
	},
	Color4FVar: function(name, r, g, b, a, rVar, gVar, bVar, aVar)
	{
		return {
			propertyName: name,
			platform: 0,
			typeID: 14,
			cacheStrings: function(ccbi)
			{
				ccbi.addToStringCache(this.propertyName, false);
			},
			serialize: function(ccbi, outputFile)
			{
				JSFLBitWriter.writeFloat(r, outputFile);
				JSFLBitWriter.writeFloat(g, outputFile);
				JSFLBitWriter.writeFloat(b, outputFile);
				JSFLBitWriter.writeFloat(a, outputFile);
				JSFLBitWriter.writeFloat(rVar, outputFile);
				JSFLBitWriter.writeFloat(gVar, outputFile);
				JSFLBitWriter.writeFloat(bVar, outputFile);
				JSFLBitWriter.writeFloat(aVar, outputFile);
			}
		};
	},
	Blendmode: function(name, src, dst)
	{
		return {
			propertyName: name,
			platform: 0,
			typeID: 16,
			cacheStrings: function(ccbi)
			{
				ccbi.addToStringCache(this.propertyName, false);
			},
			serialize: function(ccbi, outputFile)
			{
				JSFLBitWriter.writeUInt(src, outputFile);
				JSFLBitWriter.writeUInt(dst, outputFile);
			}
		};
	},
	Block: function(name, selector, target)
	{
		return {
			propertyName: name,
			platform: 0,
			typeID: 21,
			cacheStrings: function(ccbi)
			{
				ccbi.addToStringCache(this.propertyName, false);
				ccbi.addToStringCache(selector, false);
			},
			serialize: function(ccbi, outputFile)
			{
				ccbi.writeString(selector, false, outputFile);
				JSFLBitWriter.writeUInt(target, outputFile);
			}
		};
	}
}

function CCBINode()
{
	return {
		class: "CCNode",
		jsController: null,
		memberVarAssignmentType: 0,
		memberVarAssignmentName: null,
		sequences: [],
		regularProperties: [],
		extraProperties: [],
		children: []
	};
}

function CCBI(inJsControlled, inFlattenPaths)
{
	return {
		version: 5,
		jsControlled: inJsControlled,
		flattenPaths: inFlattenPaths,
		stringCache: {},
		nextStringId: 0,
		sequenceAutoPlay: -1,
		rootNode: null,
		
		writeHeader: function(outputFile)
		{
			JSFLBitWriter.writeByte("i".charCodeAt(0), outputFile);
			JSFLBitWriter.writeByte("b".charCodeAt(0), outputFile);
			JSFLBitWriter.writeByte("c".charCodeAt(0), outputFile);
			JSFLBitWriter.writeByte("c".charCodeAt(0), outputFile);
			JSFLBitWriter.writeUInt(this.version, outputFile);
			JSFLBitWriter.writeBool(this.jsControlled, outputFile);
		},
		
		addToStringCache: function(string, isPath)
		{
			if (isPath && this.flattenPaths)
			{
				string = string.replace(/^.*[\\\/]/, '');
			}
			
			if (string in this.stringCache)
			{
				return this.stringCache[string];
			}
			else
			{
				var stringId = this.nextStringId;
				this.nextStringId = this.nextStringId + 1;
				
				this.stringCache[string] = stringId;
			
				return stringId;
			}
		},
		
		writeString: function(string, isPath, outputFile)
		{
			JSFLBitWriter.writeUInt(this.addToStringCache(string, isPath), outputFile);
		},
		
		writeStringCache: function(outputFile)
		{
			var size = count(this.stringCache);
			
			JSFLBitWriter.writeUInt(size, outputFile);
			
			for (var str in this.stringCache)
			{
				JSFLBitWriter.writeString(str, outputFile);
			}
		},
		
		writeSequences: function(outputFile)
		{
			// TODO: Implement this
			JSFLBitWriter.writeUInt(0, outputFile);
			
			JSFLBitWriter.writeInt(this.sequenceAutoPlay, outputFile);
		},
		
		addNodeToStringCache: function(node)
		{
			this.addToStringCache(node.class, false);
			if(this.jsControlled)
			{
				this.addToStringCache(node.jsController, false);
			}
			
			if(node.memberVarAssignmentType != 0)
			{
				this.addToStringCache(node.memberVarAssignmentName, false);
			}
			
			for(var i = 0; i < node.regularProperties.length; i++)
			{
				node.regularProperties[i].cacheStrings(this);
			}
			
			for(var i = 0; i < node.extraProperties.length; i++)
			{
				node.extraProperties[i].cacheStrings(this);
			}
			
			for(var i = 0; i < node.children.length; i++)
			{
				this.addNodeToStringCache(node.children[i]);
			}
		},
		
		writeProperty: function(property, outputFile)
		{
			JSFLBitWriter.writeUInt(property.typeID, outputFile);
			this.writeString(property.propertyName, false, outputFile);
			JSFLBitWriter.writeByte(property.platform, outputFile);
			property.serialize(this, outputFile)
		},
		
		writeNode: function(node, outputFile)
		{
			this.writeString(node.class, false, outputFile);
			
			if(this.jsControlled)
			{
				this.writeString(node.jsController, false, outputFile);
			}
			
			JSFLBitWriter.writeUInt(node.memberVarAssignmentType, outputFile);
			if(node.memberVarAssignmentType != 0)
			{
				this.writeString(node.memberVarAssignmentName, false, outputFile);
			}
			
			// TODO: Sequences
			JSFLBitWriter.writeUInt(0, outputFile);
			
			JSFLBitWriter.writeUInt(node.regularProperties.length, outputFile);
			JSFLBitWriter.writeUInt(node.extraProperties.length, outputFile);
			
			for(var i = 0; i < node.regularProperties.length; i++)
			{
				this.writeProperty(node.regularProperties[i], outputFile);
			}
			
			for(var i = 0; i < node.extraProperties.length; i++)
			{
				this.writeProperty(node.extraProperties[i], outputFile);
			}
			
			JSFLBitWriter.writeUInt(node.children.length, outputFile);
			for(var i = 0; i < node.children.length; i++)
			{
				this.writeNode(node.children[i], outputFile);
			}
		},

		writeNodeGraph: function(outputFile)
		{
			this.writeNode(this.rootNode, outputFile);
		},
		
		write: function (filename)
		{
			
			this.addNodeToStringCache(this.rootNode);
			
			var outputFile = JSFLBitWriter.openFile(filename); // Set full filepath here.
			
			this.writeHeader(outputFile);
			this.writeStringCache(outputFile);
			this.writeSequences(outputFile);
			this.writeNodeGraph(outputFile);
			
			JSFLBitWriter.closeFile(outputFile);
		}
	};
}

function elementToNode(element)
{
	var node = CCBINode();
	
	node.class = "CCSprite";
	node.regularProperties.push(CCBIProperty.Position("position", element.x, element.y, 1));
	node.regularProperties.push(CCBIProperty.Size("contentSize", element.width, element.height, 0));
	node.regularProperties.push(CCBIProperty.Point("anchorPoint", 0, 1));
	node.regularProperties.push(CCBIProperty.ScaleLock("scale", element.scaleX, element.scaleY, 0));
	node.regularProperties.push(CCBIProperty.Degrees("rotation", element.rotation));
	node.regularProperties.push(CCBIProperty.SpriteFrame("displayFrame", "Animations/chicken_animations.plist", "chicken_move_B.swf/0002"));
	
	return node;
}

function layerToNode(layer)
{
	var node = CCBINode();
	
	node.class = "CCLayer";
	node.regularProperties.push(CCBIProperty.Point("anchorPoint", 0, 1));
	
	for(var elementIndex in layer.frames[0].elements)
	{
		var element = layer.frames[0].elements[elementIndex];
		
		fl.trace("Adding sprite");
		node.children.push(elementToNode(element));
	}
	
	return node;
}

fl.trace("Working...");

var ccbi = CCBI(false, false);

var root = layerToNode(fl.getDocumentDOM().getTimeline().layers[0]);

ccbi.rootNode = root;

fl.trace("Write...");
ccbi.write('C:\\Users\\Daniel\\Downloads\\test.ccbi');

fl.trace("Done!");