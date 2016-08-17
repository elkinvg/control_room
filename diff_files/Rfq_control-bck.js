Ext.define('ControlRoom.view.rfq.Rfq_control', {
    xtype: 'rfq_control',
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.Display',
        'Ext.container.Container',
        'Ext.Button',
        'Ext.form.field.Number',
        'ControlRoom.store.RegnflagsStr',
        'ControlRoom.view.rfq.Rfq_controlController',
        'ControlRoom.view.rfq.Rfq_controlModel'
    ],
    title: 'Панель управления RFQ',
    alias: 'widget.rfq_control',
    width: '700px',
    viewModel: 'rfq_control',
    controller: 'rfq_control',
    layout: {
        type: 'vbox'
    },
    items: [
        {
//            xtype: 'panel',
            xtype: 'fieldset',
            title: 'Состояние элементов защиты <span style="color:red; font-size:150%"> &#9899; </span>',
            reference: 'connectStatus',
            width: '100%',
            layout: {
                type: 'vbox',
                align: 'stretch',
            },
            items: [
                {
                    defaultType: 'displayfield',
                    defaults: {margin: '10 0 10 0', labelStyle: 'width: 130px;'},
                    layout: {
                        type: 'table',
                        columns: 3,
                        tableAttrs: {
                            style: {
                                width: '100%'
                            }}
                    },
                    items: [
                        {
                            fieldLabel: '<b>Двери модулятора закрыты</b>',
                            reference: 'X0',
//                    bind : {
//                        value: '{readstatus}'
//                    } 
                            value: '<span style="color:red; font-size:300%"> &#9899; </span>'},
                        {
                            fieldLabel: '<b>Охлаждение накального трансформатора</b>',
                            reference: 'X1',
//                    labelStyle: 'color: red; width: 300px; font-weight: bold;',
                            value: '<span style="color:red; font-size:300%"> &#9899; </span>'},
                        {
                            fieldLabel: '<b>Штанга повешена</b>',
                            reference: 'M24',
                            value: '<span style="color:red; font-size:300%"> &#9899; </span>'},
                        {
                            fieldLabel: '<b>Охлаждение лампы</b>',
                            reference: 'X10',
                            value: '<span style="color:red; font-size:300%"> &#9899; </span>'},
                        {
                            fieldLabel: '<b>Внешнее управление</b>',
                            reference: 'X11',
                            value: '<span style="color:red; font-size:300%"> &#9899; </span>'},
                        {
                            fieldLabel: '<b>Вакуум</b>',
                            reference: 'M25',
                            value: '<span style="color:red; font-size:300%"> &#9899; </span>'}]
                }]
//            items : [{
//                    layout: {
//                type: 'table',
//                columns: 3,
//                tableAttrs: {
//                    style: {
//                        width: '100%'
//                    }}
////                align: 'middle'
//            },

        },
//            }],

        {
//            xtype: 'panel',
            xtype: 'fieldset',
            width: '100%',
//            flex: 1,
            title: 'Включение/выключение системы',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'container',
//                    width: '100%',
                    //flex: 1,
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                    },
                    defaults: {
                        margin: '20 0 20 0',
                        flex: 1,
                    },
                    items: [
                        {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'button',
                                    text: 'Включение вентилятора'
                                },
                                {
                                    xtype: 'label',
//                                    text: 'My Label'
                                    html: '<span style="color:red; font-size:300%"> &#9899; </span>'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'button',
                                    text: 'Включение накала'
                                },
                                {
                                    xtype: 'label',
                                    html: '<span style="color:red; font-size:300%"> &#9899; </span>'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'button',
                                    text: 'Включение ВНМ (RFQ)'
                                },
                                {
                                    xtype: 'label',
                                    html: '<span style="color:red; font-size:300%"> &#9899; </span>'
                                }
                            ]
                        }
                    ]
                },
//                {
//                    xtype: 'tagfield',
////                    width: 183,
//                    fieldLabel: 'Label'
//                }
            ]
        },
        {
//            xtype: 'panel',
            xtype: 'fieldset',
            title: 'Высокое напряжение модулятора (ВНМ) RFQ',
            width: '100%',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'My Label'
                        },
                        {
                            xtype: 'numberfield',
                            flex: 1,
                            fieldLabel: 'Label',
                            maxValue: 50000,
                            step: 10
                        },
                        {
                            xtype: 'numberfield',
                            flex: 1,
                            fieldLabel: 'Label',
                            maxValue: 50000,
                            minValue: 0,
                            step: 100
                        }
                    ]
                },
                {
                    xtype: 'container',
                    flex: 1,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'label',
                            flex: 1,
                            text: 'My Label'
                        },
                        {
                            xtype: 'label',
                            flex: 1,
                            text: 'My Label'
                        },
                        {
                            xtype: 'label',
                            flex: 1,
                            text: 'My Label'
                        },
                        {
                            xtype: 'label',
                            flex: 1,
                            text: 'My Label'
                        },
                        {
                            xtype: 'label',
                            flex: 1,
                            text: 'My Label'
                        },
                        {
                            xtype: 'button',
                            flex: 1,
                            text: 'MyButton'
                        }
                    ]
                }
            ]
        }],
//    renderTo: Ext.getBody()
});


