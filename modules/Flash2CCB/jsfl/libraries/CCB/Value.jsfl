xjsfl.init(this, ['Class', 'CCBI']);

var Value =
{
	Position:
	{
        init: function(x, y, positionType)
        {
            this.x = x;
            this.y = y;
            this.positionType = positionType;
        },
        
		typeId: 0,
		
        x: null,
        y: null,
        positionType: null,
		
		cacheStrings: function(ccbi) {},
        
        serialize: function(ccbi, outputFile)
        {
            JSFLBitWriter.writeFloat(this.x, outputFile);
            JSFLBitWriter.writeFloat(this.y, outputFile);
            JSFLBitWriter.writeUInt(this.positionType, outputFile);
        }
	},
	Size:
	{
        init: function(width, height, sizeType)
        {
            this.width = width;
            this.height = height;
            this.sizeType = sizeType;
        },
		
		typeId: 1,
        
        width: null,
        height: null,
        sizeType: null,
		
		cacheStrings: function(ccbi) {},
        
        serialize: function(ccbi, outputFile)
        {
            JSFLBitWriter.writeFloat(this.width, outputFile);
            JSFLBitWriter.writeFloat(this.height, outputFile);
            JSFLBitWriter.writeUInt(this.sizeType, outputFile);
        }
	},
	Point:
	{
        init: function(x, y)
        {
            this.x = x;
            this.y = y;
        },
		
		typeId: 2,
        
        x: null,
        y: null,
		
		cacheStrings: function(ccbi) {},
        
        serialize: function(ccbi, outputFile)
        {
            JSFLBitWriter.writeFloat(this.x, outputFile);
            JSFLBitWriter.writeFloat(this.y, outputFile);
        }
	},
	PointLock:
	{
		init: function(x, y)
        {
            this.x = x;
            this.y = y;
        },
        
		typeId: 3,
		
        x: null,
        y: null,
		
		cacheStrings: function(ccbi) {},
        
        serialize: function(ccbi, outputFile)
        {
            JSFLBitWriter.writeFloat(this.x, outputFile);
            JSFLBitWriter.writeFloat(this.y, outputFile);
        }
	},
	ScaleLock:
	{
		init: function(x, y, scaleType)
        {
            this.x = x;
            this.y = y;
            this.scaleType = scaleType;
        },
		
		typeId: 4,
        
        x: null,
        y: null,
        scaleType: null,
		
		cacheStrings: function(ccbi) {},
        
        serialize: function(ccbi, outputFile)
        {
            JSFLBitWriter.writeFloat(this.x, outputFile);
            JSFLBitWriter.writeFloat(this.y, outputFile);
            JSFLBitWriter.writeUInt(this.scaleType, outputFile);
        }
	},
	Degrees:
	{
        init: function(value)
        {
            this.value = value;
        },
		
		typeId: 5,
        
        value: null,
		
		cacheStrings: function(ccbi) {},
        
        serialize: function(ccbi, outputFile)
        {
            JSFLBitWriter.writeFloat(this.value, outputFile);
        }
	},
	Integer:
	{
		init: function(value)
        {
            this.value = value;
        },
		
		typeId: 6,
        
        value: null,
		
		cacheStrings: function(ccbi) {},
        
        serialize: function(ccbi, outputFile)
        {
            JSFLBitWriter.writeInt(this.value, outputFile);
        }
	},
	Float:
	{
		init: function(value)
        {
            this.value = value;
        },
		
		typeId: 7,
        
        value: null,
		
		cacheStrings: function(ccbi) {},
        
        serialize: function(ccbi, outputFile)
        {
            JSFLBitWriter.writeFloat(this.value, outputFile);
        }
	},
	FloatVar:
	{
		init: function(value, valueVar)
        {
            this.value = value;
            this.valueVar = valueVar;
        },
        
		typeId: 8,
		
        value: null,
        valueVar: null,
		
		cacheStrings: function(ccbi) {},
        
        serialize: function(ccbi, outputFile)
        {
            JSFLBitWriter.writeFloat(this.value, outputFile);
            JSFLBitWriter.writeFloat(this.valueVar, outputFile);
        }
	},
	Check:
	{
		init: function(value)
        {
            this.value = value;
        },
        
		typeId: 9,
		
        value: null,
		
		cacheStrings: function(ccbi) {},
        
        serialize: function(ccbi, outputFile)
        {
            JSFLBitWriter.writeBool(this.value, outputFile);
        }
	},
	SpriteFrame:
	{
        init: function(spriteSheetFile, spriteFile)
        {
            this.spriteSheetFile = spriteSheetFile;
            this.spriteFile = spriteFile;
        },
		
		typeId: 10,
        
        spriteSheetFile: null,
        spriteFile: null,
        
        cacheStrings: function(ccbi)
        {
            ccbi.addToStringCache(this.spriteSheetFile, true);
            ccbi.addToStringCache(this.spriteFile, false);
        },
            
        serialize: function(ccbi, outputFile)
        {
            ccbi.writeString(this.spriteSheetFile, true, outputFile);
			ccbi.writeString(this.spriteFile, false, outputFile);
        }
	},
	Texture:
	{
		init: function(spriteFile)
        {
            this.spriteFile = spriteFile;
        },
		
		typeId: 11,
        
        spriteFile: null,
        
        cacheStrings: function(ccbi)
        {
            ccbi.addToStringCache(this.spriteFile, true);
        },
            
        serialize: function(ccbi, outputFile)
        {
			ccbi.writeString(this.spriteFile, true, outputFile);
        }
	},
	Byte:
	{
		init: function(value)
        {
            this.value = value;
        },
		
		typeId: 12,
        
        value: null,
		
		cacheStrings: function(ccbi) {},
            
        serialize: function(ccbi, outputFile)
        {
			JSFLBitWriter.writeByte(value, outputFile);
        }
	},
	Color3:
	{
		init: function(r, g, b)
        {
            this.r = r;
            this.g = g;
            this.b = b;
        },
		
		typeId: 13,
        
        r: null,
        g: null,
        b: null,
		
		cacheStrings: function(ccbi) {},
            
        serialize: function(ccbi, outputFile)
        {
			JSFLBitWriter.writeByte(this.r, outputFile);
            JSFLBitWriter.writeByte(this.g, outputFile);
            JSFLBitWriter.writeByte(this.b, outputFile);
        }
	},
	Color4FVar:
	{
        init: function(r, g, b, a, rVar, gVar, bVar, aVar)
        {
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
            this.rVar = rVar;
            this.gVar = gVar;
            this.bVar = bVar;
            this.aVar = aVar;
        },
		
		typeId: 14,
        
        r: null,
        g: null,
        b: null,
        a: null,
        rVar: null,
        gVar: null,
        bVar: null,
        aVar: null,
		
		cacheStrings: function(ccbi) {},
            
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
	},
	Flip:
	{
		init: function(x, y)
        {
            this.x = x;
            this.y = y;
        },
		
		typeId: 15,
        
        x: null,
        y: null,
		
		cacheStrings: function(ccbi) {},
        
        serialize: function(ccbi, outputFile)
        {
            JSFLBitWriter.writeBool(this.x, outputFile);
            JSFLBitWriter.writeBool(this.y, outputFile);
        }
	},
	Blendmode:
	{
        init: function(src, dst)
        {
            this.src = src;
            this.dst = dst;
        },
		
		typeId: 16,
        
        src: null,
        dst: null,
		
		cacheStrings: function(ccbi) {},
        
        serialize: function(ccbi, outputFile)
        {
            JSFLBitWriter.writeUInt(this.src, outputFile);
			JSFLBitWriter.writeUInt(this.dst, outputFile);
        }
	},
	FntFile:
	{
		init: function(fntFile)
        {
            this.fntFile = fntFile;
        },
		
		typeId: 17,
        
        fntFile: null,
        
        cacheStrings: function(ccbi)
        {
            ccbi.addToStringCache(this.fntFile, true);
        },
            
        serialize: function(ccbi, outputFile)
        {
			ccbi.writeString(this.fntFile, true, outputFile);
        }
	},
	Text:
	{
		init: function(value)
        {
            this.value = value;
        },
        
		typeId: 18,
		
        value: null,
        
        cacheStrings: function(ccbi)
        {
            ccbi.addToStringCache(this.value, false);
        },
            
        serialize: function(ccbi, outputFile)
        {
			ccbi.writeString(this.value, false, outputFile);
        }
	},
	FontTTF:
	{
		init: function(fontName)
        {
            this.fontName = fontName;
        },
		
		typeId: 19,
        
        fontName: null,
        
        cacheStrings: function(ccbi)
        {
            ccbi.addToStringCache(this.fontName, false);
        },
            
        serialize: function(ccbi, outputFile)
        {
			ccbi.writeString(this.fontName, false, outputFile);
        }
	},
	IntegerLabeled:
	{
		init: function(value)
        {
            this.value = value;
        },
        
		typeId: 20,
		
        value: null,
		
		cacheStrings: function(ccbi) {},
        
        serialize: function(ccbi, outputFile)
        {
            JSFLBitWriter.writeInt(this.value, outputFile);
        }
	},
	Block:
	{
        init: function(selector, target)
        {
            this.selector = selector;
            this.target = target;
        },
		
		typeId: 21,
        
        selector: null,
        target: null,
        
        cacheStrings: function(ccbi)
        {
            ccbi.addToStringCache(this.selector, false);
        },
            
        serialize: function(ccbi, outputFile)
        {
			ccbi.writeString(this.selector, false, outputFile);
            JSFLBitWriter.writeUInt(this.target, outputFile);
        }
	},
	Animation:
	{
        init: function(animationFile, animationName)
        {
            this.animationFile = animationFile;
            this.animationName = animationName;
        },
		
		typeId: 22,
        
        animationFile: null,
        animationName: null,
        
        cacheStrings: function(ccbi)
        {
            ccbi.addToStringCache(this.animationFile, true);
            ccbi.addToStringCache(this.animationName, false);
        },
            
        serialize: function(ccbi, outputFile)
        {
            ccbi.writeString(this.animationFile, true, outputFile);
            ccbi.writeString(this.animationName, false, outputFile);
        }
	},
	CCBFile:
	{
        init: function(ccbFile)
        {
            this.ccbFile = ccbFile;
        },
		
		typeId: 23,
        
        ccbFile: null,
        
        cacheStrings: function(ccbi)
        {
            ccbi.addToStringCache(this.ccbFile, true);
        },
            
        serialize: function(ccbi, outputFile)
        {
            ccbi.writeString(this.ccbFile, true, outputFile);
        }
	},
	String:
	{
        init: function(name, value)
        {
            this.value = value;
        },
		
		typeId: 24,
        
        value: null,
        
        cacheStrings: function(ccbi)
        {
            ccbi.addToStringCache(this.value, false);
        },
            
        serialize: function(ccbi, outputFile)
        {
            ccbi.writeString(this.value, false, outputFile);
        }
	},
	BlockCCControl:
	{
        init: function(name, selector, target, controlEvents)
        {
            this.selector = selector;
            this.target = target;
            this.controlEvents = controlEvents;
        },
		
		typeId: 25,
        
        selector: null,
        target: null,
        controlEvents: null,
        
        cacheStrings: function(ccbi)
        {
            ccbi.addToStringCache(this.selector, false);
        },
            
        serialize: function(ccbi, outputFile)
        {
            ccbi.writeString(this.selector, false, outputFile);
            JSFLBitWriter.writeUInt(this.target, outputFile);
			JSFLBitWriter.writeUInt(this.controlEvents, outputFile);
        }
	},
	FloatScale:
	{
        init: function(name, value, scaleType)
        {
            this.value = value;
            this.scaleType = scaleType;
        },
		
		typeId: 26,
        
        value: null,
        scaleType: null,
		
		cacheStrings: function(ccbi) {},
        
        serialize: function(ccbi, outputFile)
        {
            JSFLBitWriter.writeFloat(this.value, outputFile);
            JSFLBitWriter.writeUInt(this.scaleType, outputFile);
        }
	},
	FloatXY:
	{
        init: function(name, x, y)
        {
            this.x = x;
            this.y = y;
        },
		
		typeId: 27,
        
        x: null,
        y: null,
		
		cacheStrings: function(ccbi) {},
        
        serialize: function(ccbi, outputFile)
        {
            JSFLBitWriter.writeFloat(this.x, outputFile);
            JSFLBitWriter.writeFloat(this.y, outputFile);
        }
	}
};

var Platform = 
{
	All : 0,
	iOS : 1,
	Mac : 2
}

var Property =
{
	init: function(name, value)
	{
		this.name = name;
		this.platform = Platform.All;
		this.value = value;
	},
	
	name: null,
	platform: null,
	value: null,
	
	cacheStrings: function(ccbi)
	{
		ccbi.addToStringCache(this.name, false);
		
		this.value.cacheStrings(ccbi);
	},
	
	serialize: function(ccbi, outputFile)
	{
		JSFLBitWriter.writeUInt(this.value.typeId, outputFile);
		ccbi.writeString(this.name, false, outputFile);
		JSFLBitWriter.writeByte(this.platform, outputFile);
		
		this.value.serialize(ccbi, outputFile);
	}
};

// Define class hierarchy
for(var className in Value)
{
    Value[className] = Class.extend(Value[className]);
    
    // Common static function
    Value[className].toString = function() { return '[class Value.'+className+']'};
}

// Enums
Value.TargetType = 
{
	None : 0,
	DocumentRoot : 1,
	Owner : 2
};

Value.PositionType = 
{
	RelativeBottomLeft : 0,
    RelativeTopLeft : 1,
    RelativeTopRight : 2,
    RelativeBottomRight : 3,
    Percent : 4,
    MultiplyResolution : 5
};

Value.SizeType = 
{
	Absolute : 0,
    Percent : 1,
    RelativeContainer : 2,
    HorizontalPercent : 3,
    VerticalPercent : 4,
    MultiplyResolution : 5
};

Value.ScaleType = 
{
	Absolute : 0,
    MultiplyResolution : 1
};

xjsfl.classes.register('Value', Value);