xjsfl.init(this, ['Class', 'CCBI']);

var Sequence =
{
    init: function(name, duration)
    {
        this.name = name;
        this.duration = duration;
        this.chained = null;
    },
    
    duration: null,
    name: null,
    chained: null,
    
    cacheStrings: function(ccbi)
    {
        ccbi.addToStringCache(this.name, false);
    },
    
    serialize: function(ccbi, outputFile)
    {
        JSFLBitWriter.writeFloat(this.duration, outputFile);
        ccbi.writeString(this.name, false, outputFile);
        
        var myId = ccbi.findSequenceId(this);
        if( myId == -1 )
            throw new Error("Attempting to serialize sequence which isn't in ccbi");
        
        JSFLBitWriter.writeUInt(myId, outputFile);
		JSFLBitWriter.writeInt(ccbi.findSequenceId(this.chained), outputFile);
        
        // Num callbacks and sound keyframes
        JSFLBitWriter.writeUInt(0, outputFile);
        JSFLBitWriter.writeUInt(0, outputFile);
    }
};

Sequence = Class.extend(Sequence);
Sequence.toString = function()
{
    return '[class Sequence]';
}

xjsfl.classes.register('Sequence', Sequence);