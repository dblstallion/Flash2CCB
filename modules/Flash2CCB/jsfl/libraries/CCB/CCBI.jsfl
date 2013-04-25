xjsfl.init(this, ['Class', 'Property', 'Node', 'URI']);

var CCBI =
{
    init: function(jsControlled, flattenPaths)
    {
        this.jsControlled = jsControlled;
        this.flattenPaths = flattenPaths;
        
        // Reset string cache
        this.stringCache = {};
        this.nextStringId = 0;
        this.rootNode = null;
    },
    
    version: 5,
    jsControlled: null,
    flattenPaths: null,
    stringCache: null,
    nextStringId: null,
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
            this.nextStringId++;
            
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
        var size = Utils.getKeys(this.stringCache).length;
        
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
        if(!node)
        {
            throw new Error("Argument Error: addNodeToStringCache does not accept null node");
        }
        
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

    writeNodeGraph: function(outputFile)
    {
        if(this.rootNode)
        {
            this.rootNode.serialize(this, outputFile);
        }
        else
        {
            trace("Warning: Writing nodegraph but root node is missing");
        }
    },
    
    write: function (uri)
    {
        // Reset string cache
        this.stringCache = {};
        this.nextStringId = 0;
        
        // Populate string cache
        if(this.rootNode)
            this.addNodeToStringCache(this.rootNode);
            
        var outputPath = URI.toPath(uri, 1);
        
        if(outputPath)
        {
            // Write file
            var outputFile = JSFLBitWriter.openFile(outputPath);
            
            this.writeHeader(outputFile);
            this.writeStringCache(outputFile);
            this.writeSequences(outputFile);
            this.writeNodeGraph(outputFile);
            
            JSFLBitWriter.closeFile(outputFile);
        }
    }
};

CCBI = Class.extend(CCBI);
CCBI.toString = function()
{
    return '[class CCBI]';
}

xjsfl.classes.register('CCBI', CCBI);