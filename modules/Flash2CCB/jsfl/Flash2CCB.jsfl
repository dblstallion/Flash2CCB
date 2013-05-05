xjsfl.init(this, ['URI', 'LibraryPacker', 'CCBConverter', 'CCBI']);

var Flash2CCB =
{
    init: function()
    {
        trace("Flash2CCB Module initialized");
    },
    
    exportCCBI: function(outputFileURI, document)
    {
        if(!outputFileURI)
        {
            throw new Error ("No output file provided to exportCCBI");
        }
        
        outputFileURI = URI.toURI(outputFileURI, 1);
        
        if(!URI.isFile(outputFileURI))
        {
            throw new Error ("exportCCBI output path must be a file");
        }
        
        var outputName = URI.getName(outputFileURI, true);
        var outputFolder = URI.getFolder(outputFileURI);
        
        // Create a library packer to store our sprite sheets
        var packer = new LibraryPacker(outputName);
        
        // Convert the scene
        document = document || fl.getDocumentDOM();
        
        var ccbi = CCBConverter.timelineToCCBI(document.getTimeline(), packer);
        
        // Output the ccbi
        ccbi.write(outputFolder + outputName + ".ccbi");
        
        // Output the library
        packer.exportLibrary(outputFolder);
    },
    
    exportLibrary: function(outputFolderURI, library)
    {
        if(!outputFolderURI)
        {
            throw new Error ("No output folder provided to exportLibrary");
        }
        
        outputFolderURI = URI.toURI(outputFolderURI, 1);
        
        if(!URI.isFolder(outputFolderURI))
        {
            throw new Error ("exportLibrary output path must be a folder");
        }
        
        library = library || fl.getDocumentDOM().library;
        
        var outputFolder = URI.getParent(outputFolderURI);
        var libraryName = URI.getName(outputFolderURI);
        
        var packer = new LibraryPacker(libraryName);
        
        for(var i = 0; i < library.items.length; i++)
        {
            packer.addItem(library.items[i]);
        }
        
        packer.exportLibrary(outputFolder);
    }
};

Flash2CCB = xjsfl.modules.create('Flash2CCB', Flash2CCB, this);