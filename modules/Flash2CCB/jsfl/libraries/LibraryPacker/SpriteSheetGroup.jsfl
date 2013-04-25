xjsfl.init(this, ['Class', 'URI', 'Utils']);

var NUMBER_PADDING = 2;
var IMAGE_FORMAT = "png";
var META_FORMAT = "plist";

var SpriteSheetGroup =
{
    init: function(name)
    {
        this.name = name;
        this.spriteSheets = [];
        this.addSpriteSheet();
    },
    
    name: null,
    maxWidth: 2048,
    maxHeight: 2048,
    spriteSheets: null,
    
    get currentSpriteSheet()
    {
        return this.spriteSheets[this.spriteSheets.length - 1];
    },
    
    getSpriteSheetFile: function(index)
    {
        return this.name + Utils.pad(index, NUMBER_PADDING);
    },
    
    addSpriteSheet: function()
    {
        var spriteSheet = new SpriteSheetExporter();
        
        spriteSheet.algorithm = "maxRects";
        spriteSheet.allowRotate = true;
        spriteSheet.allowTrimming = true;
        spriteSheet.autoSize = true;
        spriteSheet.layoutFormat = "cocos2Dv3";
        spriteSheet.stackDuplicateFrames = true;
        
        this.spriteSheets.push(spriteSheet);
        
        return spriteSheet;
    },
    
    isSpriteSheetFull: function(spriteSheet)
    {
        if(spriteSheet.autoSize)
        {
            if(spriteSheet.sheetWidth > this.maxWidth || spriteSheet.sheetHeight > this.maxHeight)
            {
                spriteSheet.autoSize = false;
                spriteSheet.sheetWidth = this.maxWidth;
                spriteSheet.sheetHeight = this.maxHeight;
            }
        }
        
        return spriteSheet.overflowed;
    },
    
    addItem: function(item)
    {
        switch(item.itemType)
        {
            case 'graphic':
            case 'movie clip':
                this.addSymbol(item);
                break;
            case 'bitmap':
                this.addBitmap(item);
                break;
            default:
                return;
        }
        
        // Set the metadata
        item.addData("spriteSheet", "string", this.getSpriteSheetFile(this.spriteSheets.length))
    },
    
    addBitmap: function(bitmap)
    {
        var addable =
        {
            type: "Bitmap",
            name: bitmap.name,
            addToSheet: function(sheet) { sheet.addBitmap(bitmap); },
            removeFromSheet: function(sheet) { sheet.removeBitmap(bitmap); }
        };
        
        this.tryAdd(addable);
    },
    
    addSymbol: function(symbol)
    {
        var addable =
        {
            type: "Symbol",
            name: symbol.name,
            addToSheet: function(sheet) { sheet.addSymbol(symbol); },
            removeFromSheet: function(sheet) { sheet.removeSymbol(symbol); }
        };
        
        this.tryAdd(addable);
    },
    
    tryAdd: function(addable)
    {
        var spriteSheet = this.currentSpriteSheet;
        
        addable.addToSheet(spriteSheet);
        
        if(this.isSpriteSheetFull(spriteSheet))
        {
            addable.removeFromSheet(spriteSheet);
            
            spriteSheet = this.addSpriteSheet();
            
            addable.addToSheet(spriteSheet);
            
            if(this.isSpriteSheetFull(spriteSheet))
            {
                this.spriteSheets = this.spriteSheets.slice(0, -1);
                throw new Error(addable.type + " '" + addable.name + "' is too big to fit in a sprite sheet of size " + this.maxWidth + "x" + this.maxHeight);
            }
        }
    },
    
    exportSpriteSheets: function(baseURI)
    {
        baseURI = URI.toURI(baseURI, 1);
        baseURI = URI.getFolder(baseURI);
        
        for(var i = 0; i < this.spriteSheets.length; i++)
        {
            var uri = baseURI + this.getSpriteSheetFile(i + 1);
            
            this.spriteSheets[i].exportSpriteSheet(uri, { format: IMAGE_FORMAT, bitDepth: 32, backgroundColor: "#00000000"});
        }
    }
};

SpriteSheetGroup = Class.extend(SpriteSheetGroup);
SpriteSheetGroup.toString = function()
{
    return '[class SpriteSheetGroup]';
}

xjsfl.classes.register('SpriteSheetGroup', SpriteSheetGroup);