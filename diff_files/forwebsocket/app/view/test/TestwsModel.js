/**
 * 
 */
Ext.define('Testing.view.test.TestwsModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.testws',

    data: {
        name: 'Testws',

        readstatus: '<span style="color:green; font-size:300%"> &#9899; </span>'
    },
    
    stores: {
//        mainStore: {
//            type: 'regnflagsstr'
//        }
    } 

    //TODO - add data, formulas and/or methods to support your view
});
