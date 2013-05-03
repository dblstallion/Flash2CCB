xjsfl.init(this, ['Class', 'CCBI', 'Value']);

var EasingType = 
{
	Instant : 0,
    
    Linear : 1,
    
    CubicIn : 2,
    CubicOut : 3,
    CubicInOut : 4,
    
    ElasticIn : 5,
    ElasticOut : 6,
    ElasticInOut : 7,
    
    BounceIn : 8,
    BounceOut : 9,
    BounceInOut : 10,
    
    BackIn : 11,
    BackOut : 12,
    BackInOut : 13
};

var Keyframe =
{
    init: function(time, value)
    {
        this.time = time;
        this.value = value;
        this.easingType = EasingType.Linear;
        this.easingOpt = 0.0;
    },
    
    time: null,
    easingType: null,
    easingOpt: null,
    value: null,
    
    cacheStrings: function(ccbi)
    {
        this.value.cacheStrings(ccbi);
    },
    
    serialize: function(ccbi, outputFile)
    {
        JSFLBitWriter.writeFloat(this.time, outputFile);
        JSFLBitWriter.writeUInt(this.easingType, outputFile);
        
        if(this.easingType >= EasingType.CubicIn && this.easingType <= EasingType.ElasticInOut)
            JSFLBitWriter.writeFloat(this.easingOpt, outputFile);
        
        this.value.serialize(ccbi, outputFile);
    }
};

Keyframe = Class.extend(Keyframe);
Keyframe.toString = function()
{
    return '[class Keyframe]';
}

Keyframe.EasingType = EasingType;

xjsfl.classes.register('Keyframe', Keyframe);