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
	Point: 2,
	PointLock: 3,
	Size: 1,
	ScaleLock: 4,
	Flip: 15,
	Float: 7,
	Degrees: 5,
	FloatVar: 8,
	Integer: 6,
	IntegerLabeled: 20,
	Byte: 12,
	Check: 9,
	Text: 18,
	SpriteFrame: 10,
	Texture: 11,
	FntFile: 17,
	FontTTF: 19,
	Color3: 13,
	Color4FVar: 14,
	Blendmode: 16,
	Block: 21
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
		version: 4,
		jsControlled: inJsControlled,
		flattenPaths: inFlattenPaths,
		stringCache: {},
		nextStringId: 1,
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
			
			for(var i; i < node.children.length; i++)
			{
				this.addNodeToStringCache(node.children[i]);
			}
			
			for(var i = 0; i < node.regularProperties.length; i++)
			{
				node.regularProperties[i].cacheStrings(this);
			}
			
			for(var i = 0; i < node.extraProperties.length; i++)
			{
				node.extraProperties[i].cacheStrings(this);
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

fl.trace("Working...");

var ccbi = CCBI(false, false);

var root = CCBINode();

root.regularProperties.push(CCBIProperty.Position("Pos", 0.5, 2.0, 1));

ccbi.rootNode = root;

fl.trace("Write...");
ccbi.write('C:\\Users\\Daniel\\Downloads\\test.ccbi');

fl.trace("Done!");