
Ext.define('Testing.view.test.TestwsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.testws',
    requires: ['Common_d.Property'],
    
    arrayProtection: ['X0', 'X1', 'M24', 'X10', 'X11', 'M25'], // элементы защиты
    arraySystem: ['M45', 'X3', 'X13'], // элементы системы
    arrayOfRegisters: ['D46', 'D9', 'D98'], // элементы с выводом значений
    arrayOfSetReg: ['D68', 'D66'], // заданные значения тока и напряжения
    
    
    init: function () {
        var thisOut = this;
        var vm = this.getViewModel();
        console.log('TestwsController');
        vm.set('html', "<br><br><b>Testing HTML</b>");
        var prop = Ext.create('Common_d.Property');
        var ws = Ext.create('Ext.ux.WebSocket', {
            //url: "ws://elkin-jinr.ddns.net/wsj",
            url: prop.getUrlwstest(),
            listeners: {
                open: function (ws) {
                    var ento = Ext.get("ws://127.0.0.1:7779");
                    if (Ext.get(ws.url))
                        console.log('websocet Open');
                },
                message: function (ws, data) {
                    console.log('getting data');                    
                },
                close: function (ws) {
//                    var panel = Ext.getCmp('panel' + ws.url);
//
//                    if ((panel != null) || (panel != undefined)) {
//                        panel.destroy();
//                    }
                }
            }
        });
    }
});


