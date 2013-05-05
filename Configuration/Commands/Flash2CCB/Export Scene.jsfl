xjsfl.init(this);
xjsfl.modules.load('Flash2CCB');

var outputFile = fl.browseForFileURL("save", "Save CCBI");

if(outputFile)
	Flash2CCB.exportCCBI(outputFile);