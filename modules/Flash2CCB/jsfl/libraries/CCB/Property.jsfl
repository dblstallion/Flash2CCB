xjsfl.init(this, ['Class', 'CCBI']);

var Platform = 
{
	All : 0,
	iOS : 1,
	Mac : 2
}

var Property =
{
    Base:
    {
        init: function(name, typeID)
        {
            this.name = name;
            this.typeID = typeID;
			this.platform = Platform.All;
        },
        
        name: null,
        typeID: null,
        platform: null,
        
        cacheStrings: function(ccbi)
        {
            ccbi.addToStringCache(this.name, false);
        },
        
        serialize: function(ccbi, outputFile)
        {
            JSFLBitWriter.writeUInt(this.typeID, outputFile);
			ccbi.writeString(this.name, false, outputFile);
			JSFLBitWriter.writeByte(this.platform, outputFile);
        }
    },
	Position:
	{
        init: function(name, x, y, positionType)
        {
            this._super(name, 0);
            
            this.x = x;
            this.y = y;
            this.positionType = positionType;
        },
        
        x: null,
        y: null,
        positionType: null,
        
        serialize: function(ccbi, outputFile)
        {
            this._super(ccbi, outputFile);
            
            JSFLBitWriter.writeFloat(this.x, outputFile);
            JSFLBitWriter.writeFloat(this.y, outputFile);
            JSFLBitWriter.writeUInt(this.positionType, outputFile);
        }
	},
	Size:
	{
        init: function(name, width, height, sizeType)
        {
            this._super(name, 1);
            
            this.width = width;
            this.height = height;
            this.sizeType = sizeType;
        },
        
        width: null,
        height: null,
        sizeType: null,
        
        serialize: function(ccbi, outputFile)
        {
            this._super(ccbi, outputFile);
            
            JSFLBitWriter.writeFloat(this.width, outputFile);
            JSFLBitWriter.writeFloat(this.height, outputFile);
            JSFLBitWriter.writeUInt(this.sizeType, outputFile);
        }
	},
	Point:
	{
        init: function(name, x, y)
        {
            this._super(name, 2);
            
            this.x = x;
            this.y = y;
        },
        
        x: null,
        y: null,
        
        serialize: function(ccbi, outputFile)
        {
            this._super(ccbi, outputFile);
            
            JSFLBitWriter.writeFloat(this.x, outputFile);
            JSFLBitWriter.writeFloat(this.y, outputFile);
        }
	},
	PointLock:
	{
		init: function(name, x, y)
        {
            this._super(name, 3);
            
            this.x = x;
            this.y = y;
        },
        
        x: null,
        y: null,
        
        serialize: function(ccbi, outputFile)
        {
            this._super(ccbi, outputFile);
            
            JSFLBitWriter.writeFloat(this.x, outputFile);
            JSFLBitWriter.writeFloat(this.y, outputFile);
        }
	},
	ScaleLock:
	{
		init: function(name, x, y, scaleType)
        {
            this._super(name, 4);
            
            this.x = x;
            this.y = y;
            this.scaleType = scaleType;
        },
        
        x: null,
        y: null,
        scaleType: null,
        
        serialize: function(ccbi, outputFile)
        {
            this._super(ccbi, outputFile);
            
            JSFLBitWriter.writeFloat(this.x, outputFile);
            JSFLBitWriter.writeFloat(this.y, outputFile);
            JSFLBitWriter.writeUInt(this.scaleType, outputFile);
        }
	},
	Degrees:
	{
        init: function(name, value)
        {
            this._super(name, 5);
            
            this.value = value;
        },
        
        value: null,
        
        serialize: function(ccbi, outputFile)
        {
            this._super(ccbi, outputFile);
            
            JSFLBitWriter.writeFloat(this.value, outputFile);
        }
	},
	Integer:
	{
		init: function(name, value)
        {
            this._super(name, 6);
            
            this.value = value;
        },
        
        value: null,
        
        serialize: function(ccbi, outputFile)
        {
            this._super(ccbi, outputFile);
            
            JSFLBitWriter.writeInt(this.value, outputFile);
        }
	},
	Float:
	{
		init: function(name, value)
        {
            this._super(name, 7);
            
            this.value = value;
        },
        
        value: null,
        
        serialize: function(ccbi, outputFile)
        {
            this._super(ccbi, outputFile);
            
            JSFLBitWriter.writeFloat(this.value, outputFile);
        }
	},
	FloatVar:
	{
		init: function(name, value, valueVar)
        {
            this._super(name, 8);
            
            this.value = value;
            this.valueVar = valueVar;
        },
        
        value: null,
        valueVar: null,
        
        serialize: function(ccbi, outputFile)
        {
            this._super(ccbi, outputFile);
            
            JSFLBitWriter.writeFloat(this.value, outputFile);
            JSFLBitWriter.writeFloat(this.valueVar, outputFile);
        }
	},
	Check:
	{
		init: function(name, value)
        {
            this._super(name, 9);
            
            this.value = value;
        },
        
        value: null,
        
        serialize: function(ccbi, outputFile)
        {
            this._super(ccbi, outputFile);
            
            JSFLBitWriter.writeBool(this.value, outputFile);
        }
	},
	SpriteFrame:
	{
        init: function(name, spriteSheetFile, spriteFile)
        {
            this._super(name, 10);
            
            this.spriteSheetFile = spriteSheetFile;
            this.spriteFile = spriteFile;
        },
        
        spriteSheetFile: null,
        spriteFile: null,
        
        cacheStrings: function(ccbi)
        {
            this._super(ccbi);
            
            ccbi.addToStringCache(this.spriteSheetFile, true);
            ccbi.addToStringCache(this.spriteFile, false);
        },
            
        serialize: function(ccbi, outputFile)
        {
            this._super(ccbi, outputFile);
            
            ccbi.writeString(this.spriteSheetFile, true, outputFile);
			ccbi.writeString(this.spriteFile, false, outputFile);
        }
	},
	Texture:
	{
		init: function(name, spriteFile)
        {
            this._super(name, 11);
            
            this.spriteFile = spriteFile;
        },
        
        spriteFile: null,
        
        cacheStrings: function(ccbi)
        {
            this._super(ccbi);
            
            ccbi.addToStringCache(this.spriteFile, true);
        },
            
        serialize: function(ccbi, outputFile)
        {
            this._super(ccbi, outputFile);
            
			ccbi.writeString(this.spriteFile, true, outputFile);
        }
	},
	Byte:
	{
		init: function(name, value)
        {
            this._super(name, 12);
            
            this.value = value;
        },
        
        value: null,
            
        serialize: function(ccbi, outputFile)
        {
            this._super(ccbi, outputFile);
            
			JSFLBitWriter.writeByte(value, outputFile);
        }
	},
	Color3:
	{
		init: function(name, r, g, b)
        {
            this._super(name, 13);
            
            this.r = r;
            this.g = g;
            this.b = b;
        },
        
        r: null,
        g: null,
        b: null,
            
        serialize: function(ccbi, outputFile)
        {
            this._super(ccbi, outputFile);
            
			JSFLBitWriter.writeByte(this.r, outputFile);
            JSFLBitWriter.writeByte(this.g, outputFile);
            JSFLBitWriter.writeByte(this.b, outputFile);
        }
	},
	Color4FVar:
	{
        init: function(name, r, g, b, a, rVar, gVar, bVar, aVar)
        {
            this._super(name, 14);
            
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
            this.rVar = rVar;
            this.gVar = gVar;
            this.bVar = bVar;
            this.aVar = aVar;
        },
        
        r: null,
        g: null,
        b: null,
        a: null,
        rVar: null,
        gVar: null,
        bVar: null,
        aVar: null,
            
        serialize: function(ccbi, outputFile)
        {
            this._super(ccbi, outputFile);
            
			JSFLBitWriter.writeFloat(r, outputFile);
            JSFLBitWriter.writeFloat(g, outputFile);
            JSFLBitWriter.writeFloat(b, outputFile);
            JSFLBitWriter.writeFloat(a, outputFile);
            JSFLBitWriter.writeFloat(rVar, outputFile);
            JSFLBitWriter.writeFloat(gVar, outputFile);
            JSFLBitWriter.writeFloat(bVar, outputFile);
            JSFLBitWriter.writeFloat(aVar, outputFile);
        }
	},
	Flip:
	{
		init: function(name, x, y)
        {
            this._super(name, 15);
            
            this.x = x;
            this.y = y;
        },
        
        x: null,
        y: null,
        
        serialize: function(ccbi, outputFile)
        {
            this._super(ccbi, outputFile);
            
            JSFLBitWriter.writeBool(this.x, outputFile);
            JSFLBitWriter.writeBool(this.y, outputFile);
        }
	},
	Blendmode:
	{
        init: function(name, src, dst)
        {
            this._super(name, 16);
            
            this.src = src;
            this.dst = dst;
        },
        
        src: null,
        dst: null,
        
        serialize: function(ccbi, outputFile)
        {
            this._super(ccbi, outputFile);
            
            JSFLBitWriter.writeUInt(this.src, outputFile);
			JSFLBitWriter.writeUInt(this.dst, outputFile);
        }
	},
	FntFile:
	{
		init: function(name, fntFile)
        {
            this._super(name, 17);
            
            this.fntFile = fntFile;
        },
        
        fntFile: null,
        
        cacheStrings: function(ccbi)
        {
            this._super(ccbi);
            
            ccbi.addToStringCache(this.fntFile, true);
        },
            
        serialize: function(ccbi, outputFile)
        {
            this._super(ccbi, outputFile);
            
			ccbi.writeString(this.fntFile, true, outputFile);
        }
	},
	Text:
	{
		init: function(name, value)
        {
            this._super(name, 18);
            
            this.value = value;
        },
        
        value: null,
        
        cacheStrings: function(ccbi)
        {
            this._super(ccbi);
            
            ccbi.addToStringCache(this.value, false);
        },
            
        serialize: function(ccbi, outputFile)
        {
            this._super(ccbi, outputFile);
            
			ccbi.writeString(this.value, false, outputFile);
        }
	},
	FontTTF:
	{
		init: function(name, fontName)
        {
            this._super(name, 19);
            
            this.fontName = fontName;
        },
        
        fontName: null,
        
        cacheStrings: function(ccbi)
        {
            this._super(ccbi);
            
            ccbi.addToStringCache(this.fontName, false);
        },
            
        serialize: function(ccbi, outputFile)
        {
            this._super(ccbi, outputFile);
            
			ccbi.writeString(this.fontName, false, outputFile);
        }
	},
	IntegerLabeled:
	{
		init: function(name, value)
        {
            this._super(name, 20);
            
            this.value = value;
        },
        
        value: null,
        
        serialize: function(ccbi, outputFile)
        {
            this._super(ccbi, outputFile);
            
            JSFLBitWriter.writeInt(this.value, outputFile);
        }
	},
	Block:
	{
        init: function(name, selector, target)
        {
            this._super(name, 21);
            
            this.selector = selector;
            this.target = target;
        },
        
        selector: null,
        target: null,
        
        cacheStrings: function(ccbi)
        {
            this._super(ccbi);
            
            ccbi.addToStringCache(this.selector, false);
        },
            
        serialize: function(ccbi, outputFile)
        {
            this._super(ccbi, outputFile);
            
			ccbi.writeString(this.selector, false, outputFile);
            JSFLBitWriter.writeUInt(this.target, outputFile);
        }
	},
	Animation:
	{
        init: function(name, animationFile, animationName)
        {
            this._super(name, 22);
            
            this.animationFile = animationFile;
            this.animationName = animationName;
        },
        
        animationFile: null,
        animationName: null,
        
        cacheStrings: function(ccbi)
        {
            this._super(ccbi);
            
            ccbi.addToStringCache(this.animationFile, true);
            ccbi.addToStringCache(this.animationName, false);
        },
            
        serialize: function(ccbi, outputFile)
        {
            this._super(ccbi, outputFile);
            
            ccbi.writeString(this.animationFile, true, outputFile);
            ccbi.writeString(this.animationName, false, outputFile);
        }
	},
	CCBFile:
	{
        init: function(name, ccbFile)
        {
            this._super(name, 23);
            
            this.ccbFile = ccbFile;
        },
        
        ccbFile: null,
        
        cacheStrings: function(ccbi)
        {
            this._super(ccbi);
            
            ccbi.addToStringCache(this.ccbFile, true);
        },
            
        serialize: function(ccbi, outputFile)
        {
            this._super(ccbi, outputFile);
            
            ccbi.writeString(this.ccbFile, true, outputFile);
        }
	},
	String:
	{
        init: function(name, value)
        {
            this._super(name, 24);
            
            this.value = value;
        },
        
        value: null,
        
        cacheStrings: function(ccbi)
        {
            this._super(ccbi);
            
            ccbi.addToStringCache(this.value, false);
        },
            
        serialize: function(ccbi, outputFile)
        {
            this._super(ccbi, outputFile);
            
            ccbi.writeString(this.value, false, outputFile);
        }
	},
	BlockCCControl:
	{
        init: function(name, selector, target, controlEvents)
        {
            this._super(name, 25);
            
            this.selector = selector;
            this.target = target;
            this.controlEvents = controlEvents;
        },
        
        selector: null,
        target: null,
        controlEvents: null,
        
        cacheStrings: function(ccbi)
        {
            this._super(ccbi);
            
            ccbi.addToStringCache(this.selector, false);
        },
            
        serialize: function(ccbi, outputFile)
        {
            this._super(ccbi, outputFile);
            
            ccbi.writeString(this.selector, false, outputFile);
            JSFLBitWriter.writeUInt(this.target, outputFile);
			JSFLBitWriter.writeUInt(this.controlEvents, outputFile);
        }
	},
	FloatScale:
	{
        init: function(name, value, scaleType)
        {
            this._super(name, 26);
            
            this.value = value;
            this.scaleType = scaleType;
        },
        
        value: null,
        scaleType: null,
        
        serialize: function(ccbi, outputFile)
        {
            this._super(ccbi, outputFile);
            
            JSFLBitWriter.writeFloat(this.value, outputFile);
            JSFLBitWriter.writeUInt(this.scaleType, outputFile);
        }
	},
	FloatXY:
	{
        init: function(name, x, y)
        {
            this._super(name, 27);
            
            this.x = x;
            this.y = y;
        },
        
        x: null,
        y: null,
        
        serialize: function(ccbi, outputFile)
        {
            this._super(ccbi, outputFile);
            
            JSFLBitWriter.writeFloat(this.x, outputFile);
            JSFLBitWriter.writeFloat(this.y, outputFile);
        }
	}
};

// Define class hierarchy
Property.Base = Class.extend(Property.Base);
for(var className in Property)
{
    if(className != 'Base')
        Property[className] = Property.Base.extend(Property[className]);
    
    // Common static function
    Property[className].toString = function() { return '[class Property.'+className+']'}
}

// Static enums
Property.Platform = Platform;

Property.TargetType = 
{
	None : 0,
	DocumentRoot : 1,
	Owner : 2
};

Property.EasingType = 
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

Property.PositionType = 
{
	RelativeBottomLeft : 0,
    RelativeTopLeft : 1,
    RelativeTopRight : 2,
    RelativeBottomRight : 3,
    Percent : 4,
    MultiplyResolution : 5
};

Property.SizeType = 
{
	Absolute : 0,
    Percent : 1,
    RelativeContainer : 2,
    HorizontalPercent : 3,
    VerticalPercent : 4,
    MultiplyResolution : 5
};

Property.ScaleType = 
{
	Absolute : 0,
    MultiplyResolution : 1
};

xjsfl.classes.register('Property', Property);