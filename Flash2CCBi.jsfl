var a = 5;
var b = 10;
var sum = Flash2CCBi.computeSum(a, b);
fl.trace("The sum of " + a + " and " + b + " is " + sum );

var outputFile = Flash2CCBi.openFile("test.ccbi");
Flash2CCBi.writeHeader(outputFile);
Flash2CCBi.closeFile(outputFile);