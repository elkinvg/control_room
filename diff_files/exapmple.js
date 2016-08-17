// Dynamic grid store update & render columns
Ext.onReady(function () {
  Ext.require([
    'Ext.data.*',
    'Ext.grid.*',
    'Ext.selection.RowModel' 
]);
    
    // sample static data for the store
    Ext.define('Company', {
        extend: 'Ext.data.Model',
        fields: ['name', 'price', 'change', 'rate', 'lastUpdated' ]
    }); 
   

 var TOTAL = 100; // random
 var PAGE = 1;
 var LIMIT = 30;
 
 var fetchedData = function(){
    this.data = null;
    this.total = 0;
}
 
    // create the data store
    var store = Ext.create('Ext.data.ArrayStore', {
        model: 'Company',        
        proxy: {
            type: 'memory',
            reader: {type: 'array', root : 'data', totalProperty : 'total'}
        },
    listeners: 
    {
    	update: function(store, record, op, modifiedFieldNames) {
    		// modifiedFieldNames array should not be empty, but it is.
    		
    		console.log('Stores Update method was called...');
    	},
    	load: function(store, record, op, modifiedFieldNames) {
    		
    		console.log('Stores Load method was called...');
    	},
        beforeload : function(store, operation, eOpts){
                console.log('beforeload called'); 
                var page = PAGE;
                var limit = LIMIT;  
                fetchedData.data = createFakeData(page, limit);
                fetchedData.total = TOTAL;
                store.proxy.data = fetchedData;        	                
            }
    }   
    });
    
    // create the Grid
   var  grid = Ext.create('Ext.grid.Panel', {
       id: 'gridId',
        store: store,
                
        columns: [
            {
                text     : 'Company',
                flex     : 1,
                sortable : false,
                dataIndex: 'name',
                renderer : fnCompany
                //renderer: function (value, meta, record) {                  
                    //meta.tdCls = record.get('online') ? 'user-online' : 'user-offline';
                   // return value;
                //}
            },
            {
                text     : 'Price',
                width    : 60,
                sortable : true,
                renderer : 'usMoney',
                dataIndex: 'price'
            },
            {
                text     : 'Change',               
                sortable : true,
                dataIndex: 'change',
                renderer: fnChange,
                width: 80
            },
            {
                text     : '% Rate',
                width    : 100,
                sortable : true,
                dataIndex: 'rate',
                renderer:  fnChange
            },
            {
                text     : 'Last Updated',
                width    : 85,
                sortable : true,
                renderer : Ext.util.Format.dateRenderer('m/d/Y'),
                dataIndex: 'lastUpdated'
            }
        ],
        height: 600,
        width: 600,
        title: 'Simulate Live Grid with Data Refresh Example',
        renderTo: 'output',
        selModel: Ext.create('Ext.selection.RowModel', {
        	singleSelect : true
        }),       
        viewConfig: {
            stripeRows: true,
             getRowClass: function (record, rowIndex, rowParams, store) {
               // return record.get('online') ? 'user-online' : 'user-offline';
            },
            listener: {
           'cellclick' : function( grid, td, cellIndex, record, tr, rowIndex, e, eOpts){
             console.log('cellIndex:'+cellIndex +'; rowIndex:' +rowIndex);
             Ext.MessageBox.alert(record.get('company'), 'Selected Rate for '+ record.get('rate'));        
                 }
            } //listener
        }
    });
    
    function fnChange(val, meta, record) {
        if (val > 10) {
            return '<span style="color:green;">' + val + '</span>';
        } else if (val < 1) {
            return '<span style="color:red;">' + val + '</span>';
        }else{
            return '<span style="color:black;">' + val + '</span>';
        }
        return val;
    }
    
    // renderer not used 
    function fnCompany(val, meta, record) {
        if (record.get('online') =='g') {
            return '<span style="color:green;">' + val + '</span>';
        } else if (record.get('online') == 'r') {
            return '<span style="color:red;">' + val + '</span>';
        }else if (record.get('online') == 'b') {
            return '<span style="color:blue;">' + val + '</span>';
        }
        return val;
    }
    
        
    
 // Task Runner - Start a simple clock task that updates a div once per second
var task = {
    run: function(){
        console.log('Task Runner Clock:'+ Ext.Date.format(new Date(), 'g:i:s A' ));
       
        //console.log(myData.length);
       store.load();
       //console.log('count:'+store.getCount());
       
    },
    interval: 1000 // 1 second
}
var runner = new Ext.util.TaskRunner();
runner.start(task); 
  
    
 function createFakeData(page, count) {
     console.log('createFakedata page & count::'+page+'='+count);
        var firstNames   = ['Ed', 'Tommy', 'Aaron', 'Abe', 'Mary', 'Joe'];
        var lastNames    = ['Spencer', 'Maintz', 'Conran', 'Elias', 'Google', 'Jack'];
  
        var data = [];
        for (var i = 0; i < count ; i++) {
            var dob = getRandomDate();           
            var firstNameId = Math.floor(Math.random() * firstNames.length);
            var lastNameId  = Math.floor(Math.random() * lastNames.length);
            var name = Ext.String.format("{0} {1}", firstNames[firstNameId], lastNames[lastNameId]);
            var price = getRandomArbitary(1,100);
            var change = getRandomInt(1, 25);
            var rate = getRandomArbitary(1,50);
            var online = false;
            if(i % 2 == 0){
              online = 'g';  
            }else if(Math.abs(i) % 2 == 1){                
                online = 'r';
            }else{
                online = 'b';
            }
            var id = 1 + (page-1) * count + i;
            if ( id > TOTAL ) break;
            
            data.push([name, price, change, rate, dob, online]);
        }
        return data;
    }
    
 function getRandomDate() {
    var from = new Date(1900, 0, 1).getTime();
    var to = new Date().getTime();
    var date = new Date(from + Math.random() * (to - from));
    return Ext.Date.clearTime(date);
}
    
 function getRandomArbitary (min, max) {
    return Math.random() * (max - min) + min;
}   
 
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}    

});