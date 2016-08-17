function columnWrap(val){
    return '<div style="white-space:normal !important;">'+ val +'</div>';
}

Ext.define('ControlRoom.view.rfq.Regnflags', {
    xtype: 'regnflags',
    extend: 'Ext.form.Panel',
    title: 'Значение Флагов и регистров',
    alias: 'widget.regnflags', 
    requires: [
        'ControlRoom.store.RegnflagsStr',
    ],
    items: [
    {
        xtype: 'gridpanel',
        collapsible: true,
        split: true,
//        resizable: true,
//        scrollable: true,
//        store: Ext.data.StoreManager.lookup('regnflagStore'),
        store : {
            type: 'regnflagsstr'
        },
        columns: [
            {text: 'Регистр/Флаг',flex: 0.3, dataIndex: 'name'},
            {text: 'Значение',flex: 0.3, dataIndex: 'value'},
            {text: 'Описание',flex: 1, dataIndex: 'description', renderer: columnWrap}
        ]
    }    
    ],
    renderTo: Ext.getBody()
});


