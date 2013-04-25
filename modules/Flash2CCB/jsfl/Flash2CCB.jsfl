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
        
        // Create output CCBI file
        var ccbi = new CCBI(false, false);
        
        // Convert the scene
        document = document || fl.getDocumentDOM();
        
        ccbi.rootNode = CCBConverter.timelineToNode(document.getTimeline(), packer);
        
        // Output the ccbi
        ccbi.write(outputFolder + outputName + ".ccbi");
        
        // Output the library
        packer.exportLibrary(outputFolder);
    }
};

Flash2CCB = xjsfl.modules.create('Flash2CCB', Flash2CCB, this);