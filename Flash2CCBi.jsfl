fl.trace("Working...");

var outputFile = Flash2CCBi.openFile("test.ccbi");
Flash2CCBi.writeHeader(outputFile);
Flash2CCBi.closeFile(outputFile);

fl.trace ("Done!");