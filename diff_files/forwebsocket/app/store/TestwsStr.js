Ext.define('Testing.store.TestwsStr', {
    extend: 'Ext.data.Store',
    storeId: 'testwsStore',
    alias: 'store.testwsstr',
//    model: 'model.rfq.regnflags',
    fields: [
        'name', 'value', 'description'
    ],
//    proxy: proxyVar,
    proxy: {
        type: 'websocket',
        storeId: 'testwsStore',
        url: 'ws://127.0.0.1:7779',
        reader: {
            type: 'json',
        }
//        rootProperty: 'argout',
//        successProperty: 'readStatus',
    },
    autoLoad: true,
    listeners: {
        load: function (records, store, success) {
            if (success) {
                console.log("success!!!");
            } else {
                console.log("not success!!!");
            }
        },
        beforeload: function () {
            //console.log('BEFORE LOAD');
        },
        update: function (store, record, op, modifiedFieldNames) {
        }
    },
    generateNewStore: function (store) {
        if (typeof dbg !== 'undefined')
            console.log("generateNewStore");
        var dataFrom = store[0].data['argout'];
        // чтение статуса RFQ. true - если нет ошибок modbus
        var readStatus = store[0].data['readStatus'];

        var toStore = this;
        toStore.removeAt(0);

        Ext.Object.each(dataFrom[0], function (key, value) {
            toStore.add({
                name: key,
                value: value,
                description: 'описание регистров при необходимости может быть добавлено',
                readStatus: readStatus,
                id: key
            });  // посмотреть про использование id
        });
    }
});

//console.log("TangoUrl " + proxyVar.getUrl());
//var proxyVar = new Ext.data.proxy.Ajax({
//    type: 'ajax',
//    rootProperty: 'argout',
//    successProperty: 'readStatus'
//});
//
//var dbg = false;
//var person = Ext.create('ControlRoom.oth.Property');
//proxyVar.setUrl(person.getUrltan());