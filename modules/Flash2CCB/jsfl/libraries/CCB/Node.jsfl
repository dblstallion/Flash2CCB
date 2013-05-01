xjsfl.init(this, ['Class', 'CCBI']);

var Node =
{
    init: function(class)
    {
        if(arguments.count == 0)
            this.class = "CCNode";
        else
            this.class = class;
            
        this.nodeSequences = [];
        this.regularProperties = [];
        this.extraProperties = [];
        this.children = [];
    },
    
    class: null,
    jsController: null,
    memberVarAssignmentType: 0,
    memberVarAssignmentName: null,
    nodeSequences: null,
    regularProperties: null,
    extraProperties: null,
    children: null,
    
    cacheStrings: function(ccbi)
    {
        ccbi.addToStringCache(this.class, false);
        if(ccbi.jsControlled)
        {
            ccbi.addToStringCache(this.jsController, false);
        }
        
        if(this.memberVarAssignmentType != 0)
        {
            ccbi.addToStringCache(this.memberVarAssignmentName, false);
        }
        
        for(var i = 0; i < this.nodeSequences.length; i++)
        {
            this.nodeSequences[i].cacheStrings(ccbi);
        }
        
        for(var i = 0; i < this.regularProperties.length; i++)
        {
            this.regularProperties[i].cacheStrings(ccbi);
        }
        
        for(var i = 0; i < this.extraProperties.length; i++)
        {
            this.extraProperties[i].cacheStrings(ccbi);
        }
        
        for(var i = 0; i < this.children.length; i++)
        {
            this.children[i].cacheStrings(ccbi);
        }
    },
    
    serialize: function(ccbi, outputFile)
    {
        ccbi.writeString(this.class, false, outputFile);
        
        if(ccbi.jsControlled)
        {
            ccbi.writeString(this.jsController, false, outputFile);
        }
        
        JSFLBitWriter.writeUInt(this.memberVarAssignmentType, outputFile);
        if(this.memberVarAssignmentType != 0)
        {
            ccbi.writeString(this.memberVarAssignmentName, false, outputFile);
        }
        
        JSFLBitWriter.writeUInt(this.nodeSequences.length, outputFile);
        for(var i = 0; i < this.nodeSequences.length; i++)
        {
            this.nodeSequences[i].serialize(ccbi, outputFile);
        }
        
        JSFLBitWriter.writeUInt(this.regularProperties.length, outputFile);
        JSFLBitWriter.writeUInt(this.extraProperties.length, outputFile);
        
        for(var i = 0; i < this.regularProperties.length; i++)
        {
            this.regularProperties[i].serialize(ccbi, outputFile);
        }
        
        for(var i = 0; i < this.extraProperties.length; i++)
        {
            this.extraProperties[i].serialize(ccbi, outputFile);
        }
        
        JSFLBitWriter.writeUInt(this.children.length, outputFile);
        for(var i = 0; i < this.children.length; i++)
        {
            this.children[i].serialize(ccbi, outputFile);
        }
    }
};

Node = Class.extend(Node);
Node.toString = function()
{
    return '[class Node]';
}

xjsfl.classes.register('Node', Node);