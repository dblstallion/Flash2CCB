xjsfl.init(this, ['Class', 'URI', 'SpriteSheetGroup']);

// Packs a library into a bunch of sprite sheets
// Folders containing files are sprite sheets
// Higher level folders are treated as real folders for the export
// eg. Folder/Sheet/Bitmap.png
var LibraryPacker =
{
    init: function(rootName)
    {
        this.spriteGroups = {};
        this.rootName = rootName;
    },
    
    spriteGroups: null,
    rootName: null,
    
    addItem: function(item)
    {
        var nameWithRoot = this.rootName + "/" + item.name;
        var outputFolder = URI.getParent(nameWithRoot);
        var outputFileName = URI.getName(outputFolder);
        var spriteSheetFile = outputFolder + outputFileName;
        
        if(!(spriteSheetFile in this.spriteGroups))
        {
            this.spriteGroups[spriteSheetFile] = new SpriteSheetGroup(spriteSheetFile);
        }
        
        this.spriteGroups[spriteSheetFile].addItem(item);
    },
    
    exportLibrary: function(folderURI)
    {
        for(var i in this.spriteGroups)
        {
            this.spriteGroups[i].exportSpriteSheets(folderURI);
        }
    }
};

LibraryPacker = Class.extend(LibraryPacker);
LibraryPacker.toString = function()
{
    return '[class LibraryPacker]';
}

xjsfl.classes.register('LibraryPacker', LibraryPacker);