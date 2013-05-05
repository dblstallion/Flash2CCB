xjsfl.init(this);
xjsfl.modules.load('Flash2CCB');

var outputFolder = fl.browseForFolderURL("Library export folder");

if(outputFolder)
    Flash2CCB.exportLibrary(outputFolder + "/");