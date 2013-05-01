xjsfl.init(this, ['Class', 'CCBI', 'Sequence', 'SequenceProperty']);

var NodeSequence =
{
    init: function(parentSequence)
    {
        this.parentSequence = parentSequence;
        this.properties = [];
    },
    
    parentSequence: null,
    properties: null,
    
    cacheStrings: function(ccbi)
    {
		for(var i = 0; i < this.properties.length; i++)
		{
			this.properties[i].cacheStrings(ccbi);
		}
    },
    
    serialize: function(ccbi, outputFile)
    {
		JSFLBitWriter.writeUInt(ccbi.findSequenceId(this.parentSequence), outputFile);
		
        JSFLBitWriter.writeUInt(this.properties.length, outputFile);
		for(var i = 0; i < this.properties.length; i++)
		{
			this.properties[i].serialize(ccbi, outputFile);
		}
    }
};

NodeSequence = Class.extend(NodeSequence);
NodeSequence.toString = function()
{
    return '[class NodeSequence]';
}

xjsfl.classes.register('NodeSequence', NodeSequence);