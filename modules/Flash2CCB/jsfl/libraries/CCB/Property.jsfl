xjsfl.init(this, ['Class', 'CCBI', 'Value']);

var Platform = 
{
	All : 0,
	iOS : 1,
	Mac : 2
}

var Property =
{
	init: function(name, value)
	{
		this.name = name;
		this.platform = Platform.All;
		this.value = value;
	},
	
	name: null,
	platform: null,
	value: null,
	
	cacheStrings: function(ccbi)
	{
		ccbi.addToStringCache(this.name, false);
		
		this.value.cacheStrings(ccbi);
	},
	
	serialize: function(ccbi, outputFile)
	{
		JSFLBitWriter.writeUInt(this.value.typeId, outputFile);
		ccbi.writeString(this.name, false, outputFile);
		JSFLBitWriter.writeByte(this.platform, outputFile);
		
		this.value.serialize(ccbi, outputFile);
	}
};

// Define class hierarchy
Property = Class.extend(Property);
Property.toString = function() { return '[class Property]' };

// Static enums
Property.Platform = Platform;

xjsfl.classes.register('Property', Property);