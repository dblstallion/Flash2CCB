exportList = [];

function exportItem(item)
{
	if(item == undefined)
		throw "exportItem: item must not be undefined";
		
	try
	{
		var fileName = item.name.replace(/^.*[\\\/]/, '');
		var filePath = FLfile.getSystemTempFolder()+fileName+".png";
		var fileURI = FLfile.platformPathToURI(filePath);
		
		fl.trace("Exporting " + filePath);
		item.exportToFile(fileURI);
		
		exportList.push('"' + filePath + '"');
	}
	catch(error)
	{
		fl.trace("Error exporting " + item.name);
	}
}

function packTextures(fileOutput)
{
	var sourceFiles = exportList.join(" ");
	var outputData = FLfile.uriToPlatformPath(fileOutput + ".plist");
	var outputSheet = FLfile.uriToPlatformPath(fileOutput + ".pvr");
	
	//get users temp folder& convert to URI
	var win_tempLamePath = FLfile.getSystemTempFolder()+'lame.bat';
	var win_tempLameURI = FLfile.platformPathToURI(win_tempLamePath);

	var command = '"C:\\Program Files (x86)\\CodeAndWeb\\TexturePacker\\bin\\TexturePacker.exe" --format cocos2d --data "' + outputData + '" --texture-format pvr2 --opt RGBA5551 --sheet "'+ outputSheet + '" ' + sourceFiles;
	command = command + "\r\npause";
	FLfile.write(win_tempLameURI, command);
	FLfile.runCommandLine(win_tempLamePath);
}

function layerToNode(layer, fileOutput)
{
	try
	{
		var node = CCBINode();
		
		node.class = "CCLayer";
		
		for(var elementIndex in layer.frames[0].elements)
		{
			var element = layer.frames[0].elements[elementIndex];
			
			// Export the bitmap
			try
			{
				exportItem(element.libraryItem);
			}
			catch(error)
			{
				error = error + "\nWhile exporting element " + element.name;
				throw error;
			}
			
			node.children.push(elementToNode(element, fileOutput));
		}
		
		return node;
	}
	catch(error)
	{
		error = error + "\nWhile creating CCLayer from " + layer.name;
		throw error;
	}
}

var fileOutput = fl.browseForFileURL("save", "Save CCBI");

// Strip extension if it exists
fileOutput = fileOutput.replace(/\.[^\.]+$/, '');

var ccbi = CCBI(false, false);

var root = CCBINode();
	
root.class = "CCLayer";

var layers = fl.getDocumentDOM().getTimeline().layers;
for(var layerIndex = layers.length - 1; layerIndex >= 0; layerIndex--)
{
	var layer = layers[layerIndex];
	
	if(layer.layerType == "normal")
	{
		var layerNode = layerToNode(layer, fileOutput);
	
		root.children.push(layerNode);
	}
}

packTextures(fileOutput);


ccbi.rootNode = root;

ccbi.write(fileOutput + ".ccbi");

fl.trace("Done!");