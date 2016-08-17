Ext.define('Common_d.Property', {
    config : {
        urltan : '/tango/test/mb/con/ReadAllRegistersAndFlagsFromCacheInJson()',
        urlwrite: '/tango/test/mb/con/WriteRegisterOrFlag()'
    },
    constructor: function(config) {
        this.initConfig(config);
        this.self;
    }
}
);

