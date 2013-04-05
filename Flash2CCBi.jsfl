var kCCBXVersion = 4;

function writeHeader(outputFile) {
    Flash2CCBi.writeByte("i".charCodeAt(0), outputFile);
    Flash2CCBi.writeByte("b".charCodeAt(0), outputFile);
    Flash2CCBi.writeByte("c".charCodeAt(0), outputFile);
    Flash2CCBi.writeByte("c".charCodeAt(0), outputFile);
    Flash2CCBi.writeUInt(kCCBXVersion, outputFile);
    Flash2CCBi.writeBool(false, outputFile);
}

function writeStringCache(outputFile) {
    // TODO: Implement this
}

function writeSequences(outputFile) {
    // TODO: Implement this
}

function writeNodeGraph(outputFile) {
    // TODO: Implement this
}

fl.trace("Working...");

var outputFile = Flash2CCBi.openFile("test.ccbi");
writeHeader(outputFile);
writeStringCache(outputFile);
writeSequences(outputFile);
writeNodeGraph(outputFile);
Flash2CCBi.closeFile(outputFile);

fl.trace("Done!");