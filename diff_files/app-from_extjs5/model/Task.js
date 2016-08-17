/*
 * File: app/model/Task.js
 *
 * This file was generated by Sencha Architect version 3.2.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 5.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 5.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('TaskList.model.Task', {
    extend: 'Ext.data.Model',
    alias: 'model.task',

    requires: [
        'Ext.data.field.Integer',
        'Ext.data.field.String',
        'Ext.data.field.Date'
    ],

    fields: [
        {
            type: 'int',
            name: 'id'
        },
        {
            type: 'string',
            name: 'description'
        },
        {
            type: 'date',
            name: 'dueDate'
        },
        {
            type: 'string',
            name: 'priority'
        },
        {
            type: 'string',
            name: 'details'
        },
        {
            type: 'date',
            name: 'createdAt'
        },
        {
            type: 'date',
            name: 'updatedAt'
        },
        {
            type: 'string',
            name: 'assignedTo'
        }
    ]
});