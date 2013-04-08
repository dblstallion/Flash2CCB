var kCCBXVersion = 4;

var jsControlled = false;
var flattenPaths = false;

var stringCache = {};
var nextStringId = 0;

function count(obj)
{
	var count = 0;
	for (var i in obj)
	{
		count++;
	}
	return count;
}

function writeHeader(outputFile)
{
    JSFLBitWriter.writeByte("i".charCodeAt(0), outputFile);
    JSFLBitWriter.writeByte("b".charCodeAt(0), outputFile);
    JSFLBitWriter.writeByte("c".charCodeAt(0), outputFile);
    JSFLBitWriter.writeByte("c".charCodeAt(0), outputFile);
    JSFLBitWriter.writeUInt(kCCBXVersion, outputFile);
    JSFLBitWriter.writeBool(jsControlled, outputFile);
}

function addToStringCache(string, isPath)
{
	if (isPath && flattenPaths)
	{
		string = string.replace(/^.*[\\\/]/, '');
	}
	
	if (string in stringCache)
	{
		return stringCache[string];
	}
	else
	{
		var stringId = nextStringId;
		nextStringId = nextStringId + 1;
		
		stringCache[string] = stringId;
	
		return stringId;
	}
}

function writeString(string, isPath, outputFile)
{
	JSFLBitWriter.writeUInt(addToStringCache(string, isPath), outputFile);
}

function writeStringCache(outputFile)
{
	var size = count(stringCache);
	
	JSFLBitWriter.writeUInt(size, outputFile);
	
	for (var str in stringCache)
	{
		JSFLBitWriter.writeString(str, outputFile);
	}
}

function writeSequences(outputFile)
{
    // TODO: Implement this
	JSFLBitWriter.writeUInt(0, outputFile);
}

function writeNodeGraph(outputFile)
{
    // TODO: Implement this
}

fl.trace("Working...");

// Test
addToStringCache("TestString1");
addToStringCache("StringTest2");

var outputFile = JSFLBitWriter.openFile("test.ccbi"); // Set full filepath here.
writeHeader(outputFile);
writeStringCache(outputFile);
writeSequences(outputFile);
writeNodeGraph(outputFile);

// Test
writeString("TestString1", false, outputFile);
writeString("StringTest2", false, outputFile);
writeString("TestString1", false, outputFile);

JSFLBitWriter.closeFile(outputFile);

fl.trace("Done!");