xjsfl.init(this, ['Class', 'CCBI', 'Keyframe']);

var SequenceProperty =
{
    init: function(name)
    {
        this.name = name;
        this.keyframes = [];
    },
    
    name: null,
    keyframes: null,
    
    cacheStrings: function(ccbi)
    {
        ccbi.addToStringCache(this.name, false);
        
        for(var i = 0; i < this.keyframes.length; i++)
        {
            this.keyframes[i].cacheStrings(ccbi);
        }
    },
    
    serialize: function(ccbi, outputFile)
    {
        ccbi.writeString(this.name, false, outputFile);
        
        var typeId = 0;
        if(this.keyframes.length != 0)
            typeId = this.keyframes[0].value.typeId;
        
        for(var i = 0; i < this.keyframes.length; i++)
        {
            if(this.keyframes[i].value.typeId != typeId)
                throw new Error("Not all keyframes have the same typeId in property " +  this.name);
        }
        
        JSFLBitWriter.writeUInt(typeId, outputFile);
        
        JSFLBitWriter.writeUInt(this.keyframes.length, outputFile);
        for(var i = 0; i < this.keyframes.length; i++)
        {
            this.keyframes[i].serialize(ccbi, outputFile);
        }
    }
};

SequenceProperty = Class.extend(SequenceProperty);
SequenceProperty.toString = function()
{
    return '[class SequenceProperty]';
}

xjsfl.classes.register('SequenceProperty', SequenceProperty);