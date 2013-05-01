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
        
        this.sequenceAutoPlay = null;
        this.sequences = [];
    },
    
    // Static
    version: 5,
    
    // Instance
    jsControlled: null,
    flattenPaths: null,
    stringCache: null,
    nextStringId: null,
    rootNode: null,
    sequenceAutoPlay: null,
    sequences: null,
    
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
    
    findSequenceId: function(sequence)
    {
        return this.sequences.indexOf(sequence);
    },
    
    writeSequences: function(outputFile)
    {
        JSFLBitWriter.writeUInt(this.sequences.length, outputFile);
        
        for(var i = 0; i < this.sequences.length; i++)
        {
            this.sequences[i].serialize(this, outputFile);
        }
        
        JSFLBitWriter.writeInt(this.findSequenceId(this.sequenceAutoPlay), outputFile);
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
            this.rootNode.cacheStrings(this);
            
        for(var i = 0; i < this.sequences.length; i++)
        {
            this.sequences[i].cacheStrings(this);
        }
        
        // Write file
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