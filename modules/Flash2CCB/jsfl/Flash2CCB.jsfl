xjsfl.init(this);

var Flash2CCB =
{
    init: function()
    {
        trace("Flash2CCB Module initialized");
    },
    
    exportCCBI: function(uri)
    {
        uri = new URI(uri, 1);
    }
};

Flash2CCB = xjsfl.modules.create('Flash2CCB', Flash2CCB, this);