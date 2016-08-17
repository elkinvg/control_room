/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Login.view.login.LoginCheckController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.logincheck',

    onLoginClick: function() {

        // This would be the ideal location to verify the user's credentials via
        // a server-side lookup. We'll just move forward for the sake of this example.

        // Set the localStorage value to true
        //localStorage.setItem("TutorialLoggedIn", true);
        var loginIn = this.login();
        
        if (loginIn) {

            // Remove Login Window
            this.getView().destroy();

            // Add the main view to the viewport
            Ext.widget('app-main');
        } else {
            var view = this.getView();
            var me = this.lookupReference('loginform');
            me.getForm().findField('username').setValue('');
            me.getForm().findField('password').setValue('');
        }

    },
    
    login: function() {        
        var me = this.lookupReference('loginform');
        var uname = me.getForm().findField('username').value;
        var passw = me.getForm().findField('password').value;
        this.checkUser(uname,passw);
        return false;
    },
    
    checkUser: function(username,password) {
        //var aaa = [username,password];
        //var auth = this.make_base_auth(username,password);
        Ext.Ajax.request({
            //url: 'http://localhost/tango/test/webauth/my1/check_user()',
            url: '/tango/test/mb/con/ReadAllRegistersAndFlagsFromCacheInJson()',
            //async: false,
            method: 'GET',
//            method: 'POST',
            timeout: 2000,
            disableCaching: false,
            //headers : { Authorization : auth },
            username: username,
            password: password,
            //params: {
            //    argin: aaa
            //},
            success: function (response, opts) {
                var obj = Ext.decode(response.responseText);
                //console.dir(obj);
                console.log(obj);
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            },
            callback: function (options,success,response) {
                var resp = Ext.decode(response.responseText);
                var otv = resp.argoutbla;
            }
        });
        
    },
    
    make_base_auth: function (user, pass) {
          var tok = user + ':' + pass;
          var hash = Base64.encode(tok);
          return "Basic " + hash;
    }
});

var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};
