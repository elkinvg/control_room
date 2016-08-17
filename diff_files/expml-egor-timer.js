Ext.define('ThermoApp.store.ThermoConfig', {
        extend: 'Ext.data.Store',
        alias: 'store.config',
        model: 'ThermoApp.model.ThermoConfig',
        storeId: 'configStore',
        proxy: {    
                type: 'ajax',
                url: 'tango/thermo217/saver/1/ConfigJSON',
                username: localStorage.getItem("Login"),
                password: localStorage.getItem("Passwd"),
                reader: {
                        type: 'json',
                        rootProperty: 'data'
                },
        },
        //autoLoad: true,
        listeners: {
                exception: function(store, response, op) {
                        console.log('Exception !');
                        op.records = [];
                },
                load: function(store, records, success){ 
                        store.sort('name', 'ASC');
                        Ext.create('store.properties');
                        Ext.create('store.deviceServer');
                        Ext.create('store.timescale');
                        Ext.create('store.chartmode');
                        Ext.create('store.tsensors');
                        Ext.create('store.tsensors-histo');
                        Ext.create('store.tsensors-table1');
                        Ext.create('store.tsensors-table2');
                        
                        var sensorsStore = Ext.data.StoreManager.lookup('sensorsStore');
                        var sensorsStoreHisto = Ext.data.StoreManager.lookup('sensorsStoreHisto');
                        var sensorsStoreTable1 = Ext.data.StoreManager.lookup('sensorsStoreTable1');
                        var sensorsStoreTable2 = Ext.data.StoreManager.lookup('sensorsStoreTable2');
                        var dataFields = ['time'];
                        
                        store.each(function(record,idx){
                                dataFields.push(record.get('name'));
                                var sensor = Ext.create('ThermoApp.model.ThermoSensor', {
                                        name: record.get('name'),
                                        temp: 0,
                                        x: record.get('x'),
                                        y: record.get('y'),
                                        color: record.get('color'),
                                        type: record.get('type'),
                                        range: record.get('range'),
                                        unit: record.get('unit'),
                                        description: record.get('description')
                                });
                                sensorsStore.add(sensor);
                                sensorsStoreHisto.add(sensor);
                                sensorsStoreTable1.add(sensor);
                                sensorsStoreTable2.add(sensor);
                        });
        
                        // charts model
                        Ext.define('DataModel', {
                                extend: 'Ext.data.Model',
                                fields: dataFields
                        });

                        // Logbook polling
                        var logbookTask = {
                                run: function() {

                                        var session = Ext.data.StoreManager.lookup('sessionStore').first().get('name');
                                        var args = '{\"argin\": \"' + session + '\"}';
                                        Ext.data.StoreManager.lookup('logbookStore').load({params:{argin: args}});
                                },
                                interval: 60000
                        };
                        
                        var dbSaverTask = {
                                run: function() {
                                        Ext.data.StoreManager.lookup('dbSaverStore').load(
                                        {
                                                callback: function(records, operation, success) {
                                                        if (!success) {
                                                                Ext.toast({
                                                                         html: 'ThermoDBSaver is unavailable..',
                                                                         title: 'Exception',
                                                                         width: 200,
                                                                         align: 'tr'
                                                                });     
                                                        }
                                                        else {
                                                                var state = records[0].get('state');
                                                                var status = records[0].get('status');
                                                                if ( state != 'ON'){
                                                                        Ext.toast({
                                                                         html: 'ThermoDBSaver state: ' + state + ', status: ' + status,
                                                                         title: 'Warning',
                                                                         width: 200,
                                                                         align: 'tr'
                                                                });     
                                                                }
                                                        }
                                                },
                                                scope: this
                                        }
                                        );
                                },
                                interval: 5000
                        };
                        
                        // New temperature values polling
                        var task = {
                                run: function() {
                                        var dStore = Ext.data.StoreManager.lookup('dataStore');
                                        dStore.load(
                                        {
                                                callback: function(records, operation, success) {
                                                        if (!success) {
                                                                Ext.toast({
                                                                         html: 'ThermoDBSaver is unavailable..',
                                                                         title: 'Exception',
                                                                         width: 200,
                                                                         align: 'tr'
                                                                });     
                                                        }
                                                        else {                                                  
                                                                var time = records[0].get('time') * 1000;
                                                                records[0].set('time', time);

                                                                // Update sensors store (for grid and mnemo)
                                                                var sensorsStore = Ext.data.StoreManager.lookup('sensorsStore');
                                                                var sensorsStoreHisto = Ext.data.StoreManager.lookup('sensorsStoreHisto');
                                                                var sensorsStoreTable1 = Ext.data.StoreManager.lookup('sensorsStoreTable1');
                                                                var sensorsStoreTable2 = Ext.data.StoreManager.lookup('sensorsStoreTable2');
                                                                Ext.each(records[0].getFields(), function(field, index) {
                                                                        var name = field.getName();
                                                                        if (name != 'id' && name != 'time')
                                                                        {
                                                                                sensorsStore.getById(name).set('temp', records[0].get(name));
                                                                                sensorsStoreHisto.getById(name).set('temp', records[0].get(name));
                                                                                sensorsStoreTable1.getById(name).set('temp', records[0].get(name));
                                                                                sensorsStoreTable2.getById(name).set('temp', records[0].get(name));
                                                                        }
                                                                });
                                                                
                                                                // Update charts cache store
                                                                var cacheStore = Ext.data.StoreManager.lookup('cacheStore');
                                                                Ext.each(cacheStore.first().getFields(), function(field, index) {
                                                                        var name = field.getName();
                                                                        if (name == 'time')
                                                                        {
                                                                                cacheStore.first().set(name, records[0].get(name));
                                                                        }
                                                                        else
                                                                        {
                                                                                var oldTemp = cacheStore.first().get(name),
                                                                                        newTemp = records[0].get(name);
                                                                                cacheStore.first().set(name, (oldTemp > newTemp ? oldTemp : newTemp));
                                                                        }
                                                                });
                                                        }
                                                },
                                                scope: this
                                        }
                                        );
                                },
                                interval: 1000
                        };
                        
                        // Add data from cache to chart polling
                        var cacheTask = {
                                run: function() {
                                        var cacheStore = Ext.data.StoreManager.lookup('cacheStore');
                                        var chartStore = Ext.data.StoreManager.lookup('chartStore');
                                        var data = cacheStore.first();
                                        //console.log(chartStore.getCount());
                                        chartStore.add(cacheStore.first());
                                        cacheStore.removeAt(0);
                                        var cacheData = Ext.create('DataModel');
                                        cacheStore.add(cacheData);
                                        if (chartStore.counter > 0) 
                                                chartStore.counter--
                                        else
                                        chartStore.removeAt(0);
                                },
                                interval: 1000
                        };

                        // Store for sensor charts. Loads with ajax request when initialisation or time scale range changes performs. 
                        // Then actual data will be periodically added from cache store in cache task.                          
                        Ext.define('ChartsData', {
                                extend: 'Ext.data.ArrayStore',
                                storeId: 'chartStore',
                                alias: 'store.charts',
                                model: 'DataModel',
                                counter: Ext.data.StoreManager.lookup('properties').first().get('numPoints'),
                                task: task,
                                proxy: {
                                        type: 'ajax',
                                        url: 'tango/thermo217/tool/1/GetDataJSON()',
                                        username: localStorage.getItem("Login"),
                                        password: localStorage.getItem("Passwd"),
                                        actionMethods : {
                                                create  : 'POST',
                                                read    : 'POST',
                                                update  : 'PUT',
                                                destroy : 'DELETE'
                                        },
                                        reader: {
                                                type: 'json',
                                                rootProperty: 'data'
                                        }
                                },
                                updateData : function() {
                                        // Update all TimeScale Combos
                                        var numPoints = Ext.data.StoreManager.lookup('properties').first().get('numPoints');
                                        var timeScaleStore = Ext.data.StoreManager.lookup('timeScale');
                                        var rec = timeScaleStore.findRecord('active', true);
                                        var combos = Ext.ComponentQuery.query('combo[cls~=timeScaleCombo]');
                                        Ext.Array.each(combos, function(combo, index, countriesItSelf) {
                                                combo.setValue(rec);
                                        });
                                        
                                        // Load Charts store
                                        var interval = rec.get('interval');
                                        var endTime = Math.floor(new Date().getTime()/1000);
                                        var startTime = endTime - interval;
                                        var session = Ext.data.StoreManager.lookup('sessionStore').first().get('name');
                                        var args = "{\"argin\": [\"" + session + "\", \""+ startTime + "\", \"" + endTime + "\", \"" + numPoints + "\"]}";
                                        this.load({
                                                params:{argin: args},
                                                callback: function(records, operation, success) {
                                                        if (!success) {
                                                                Ext.toast({
                                                                         html: 'ThermoDBTool is unavailable..',
                                                                         title: 'Exception',
                                                                         width: 200,
                                                                         align: 'tr'
                                                                });     
                                                        }
                                                        else {
                                                                this.counter = numPoints - this.getCount();
                                                        }
                                                },
                                                scope: this
                                        });
                                        
                                        // Update Cache store polling period
                                        var cacheStore = Ext.data.StoreManager.lookup('cacheStore');
                                        Ext.TaskManager.stop(cacheStore.task);
                                        cacheStore.task.interval = (interval / numPoints) * 1000;
                                        Ext.TaskManager.start(cacheStore.task);
                                },
                                listeners: {
                                        beforeload: function( store, operation, eOpts ) {
                                                // Show loadmasks
                                                store.removeAll();
                                                var charts = Ext.ComponentQuery.query('chart[cls~=ThermoSensorsChart]');
                                                Ext.Array.each(charts, function(chart, index, countriesItSelf) {
                                                        chart.showLoading();
                                                });
                                        },
                                        load: function( store, operation, eOpts ) {
                                                // Hide loadmasks
                                                var charts = Ext.ComponentQuery.query('chart[cls~=ThermoSensorsChart]');
                                                Ext.Array.each(charts, function(chart, index, countriesItSelf) {
                                                        chart.hideLoading();
                                                });
                                        }
                                }
                        });
                
                        var dataStore = Ext.create('Ext.data.Store', {
                                model: 'DataModel',
                                storeId: 'dataStore',
                                proxy: {
                                        type: 'ajax',
                                        url: 'tango/thermo217/saver/1/DataJSON',
                                        username: localStorage.getItem("Login"),
                                        password: localStorage.getItem("Passwd"),
                                        reader: {
                                                type: 'json',
                                                rootProperty: 'data'
                                        }
                                }
                        });

                        var cacheStore = Ext.create('Ext.data.Store', {
                                model: 'DataModel',
                                storeId: 'cacheStore',
                                alias: 'store.cache',
                                task: cacheTask
                        });
                        
                        var cacheData = Ext.create('DataModel');
                        cacheStore.add(cacheData);
                        
                        var chartStore = Ext.create('store.charts');
                                
                        // Start polling
                        Ext.TaskManager.start(logbookTask);
                        Ext.TaskManager.start(dbSaverTask);
                        Ext.TaskManager.start(task);
                        Ext.TaskManager.start(cacheTask);
                        
                        // Update charts data
                        chartStore.updateData();
                }
        }
});