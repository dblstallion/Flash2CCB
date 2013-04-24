xjsfl.init(this, ['Class']);

var Node =
{
    init: function(class)
    {
        if(arguments.count == 0)
            this.class = "CCNode";
        else
            this.class = class;
    },
    
    class: null,
    jsController: null,
    memberVarAssignmentType: 0,
    memberVarAssignmentName: null,
    sequences: [],
    regularProperties: [],
    extraProperties: [],
    children: [],
    
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
        
        // TODO: Sequences
        JSFLBitWriter.writeUInt(0, outputFile);
        
        JSFLBitWriter.writeUInt(this.regularProperties.length, outputFile);
        JSFLBitWriter.writeUInt(this.extraProperties.length, outputFile);
        
        for(var i = 0; i < this.regularProperties.length; i++)
        {
            this.regularProperties[i].serialize(this, outputFile);
        }
        
        for(var i = 0; i < this.extraProperties.length; i++)
        {
            this.extraProperties[i].serialize(this, outputFile);
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