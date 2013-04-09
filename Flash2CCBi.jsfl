function count(obj)
{
	var count = 0;
	for (var i in obj)
	{
		count++;
	}
	return count;
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

function CCBI()
{
	return {
		version: 4,
		jsControlled: false,
		flattenPaths: false,
		stringCache: {},
		nextStringId: 0,
		
		writeHeader: function(outputFile) {
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
			
			// TODO: serialize properties
			
			JSFLBitWriter.writeUInt(node.children.length);
			for(var i; i < node.children.length; i++)
			{
				writeNode(node.children[i], outputFile);
			}
		},

		writeNodeGraph: function(outputFile)
		{
			// TODO: Implement this
		},
		
		write: function (filename) {
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

var ccbi = CCBI();
fl.trace("Write...");
ccbi.write('C:\\Users\\Daniel\\Downloads\\test.ccbi');

fl.trace("Done!");