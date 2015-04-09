/**
The Mount Sinai customization was developed to customize the BBNC donation form part.

    BBI.customization.MountSinai({
    
    });

<strong><a href="#tab-configuration">View a complete list of settings</a></strong>

@author Blackbaud - Bobby Earl - 2013-09-20
@namespace BBI.customization
@class MountSinai
@static

@requires jQuery
@requires BBI.bbUtilities
@requires sessvars
**/

// Verify global namespace
var BBI = window.BBI || {};
BBI.customization = BBI.customization || {};

// Self executing
+function ($) {

    // Module definition
    BBI.customization.MountSinai = (function() {

        var _settings,
        _defaults = {

            /**
            Message character limit.
            @property {Number} limit
            @default 180
            **/
            'limit': 180,

            /**
            Default message.
            @property {String} message
            @default ""
            **/
            'message': '',

            /**
            Placeholder text for the name field to use in a message.
            @property {String} placeholder
            @default "__NAME__"
            **/
            'placeholder': '__NAME__',

            /**
            Default text to replace the placeholder with.
            @property {String} placeholderText
            @default "Your Name"
            **/
            'placeholderDefault': 'Your Name',

            /**
            Unique key for which form the customization is running on.
            @property {String} form
            @default "mountsinai"
            **/
            'form': 'mountsinai',

            /**
            UI elements used in the customization.
            @property {Object} ui
            **/
            'ui': {

                /**
                Validation summary element.
                @property {Object} ui.validation
                **/
                'validation': {

                    /**
                    jQuery selector for the validation summary element.
                    @property {String} ui.validation.selector
                    @default "div[id$="_ValidationSummary1"] ul"
                    **/
                    selector: 'div[id$="_ValidationSummary1"] ul',

                    /**
                    Label text for the validation element.
                    @property {String} ui.validation.label
                    @default "Greeting: Required"
                    **/
                    label: 'Greeting: Required'
                },

                /**
                Comments element.
                @property {Object} ui.comments
                **/
                'comments': {

                    /**
                    jQuery selector for the comments element.
                    @property {String} ui.comments.selector
                    @default "input[id$="_434"]"
                    **/
                    selector: 'input[id$="_434"]'
                },

                /**
                Select element.
                @property {Object} ui.select
                **/
                'select': {

                    /**
                    Label text for the select element.
                    @property {String} ui.select.label
                    @default "Choose your greeting type"
                    **/
                    label: 'Choose your greeting type'
                },

                /**
                Greeting type element.
                @property {Object} ui.type
                **/
                'type': {

                    /**
                    jQuery ID for the greeting type element.
                    @property {String} ui.type.id
                    @default "greeting-type"
                    **/
                    id: 'greeting-type',

                    /**
                    Label text for the greeting type element.
                    @property {String} ui.type.label
                    @default "Greeting Type:"
                    **/
                    label: 'Greeting Type:',

                    /**
                    jQuery selector for the greeting type element's corresponding gift attribute.
                    @property {String} ui.type.attribute
                    @default "select[id$="_433"]"
                    **/
                    attribute: 'select[id$="_433"]'
                },

                /**
                Name element.
                @property {Object} ui.name
                **/
                'name': {

                    /**
                    jQuery ID for the name element.
                    @property {String} ui.name.id
                    @default "greeting-name"
                    **/
                    id: 'greeting-name',

                    /**
                    Label text for the name element.
                    @property {String} ui.name.label
                    @default "First, Last or Family Name:"
                    **/
                    label: 'First, Last or Family Name:'
                },

                /**
                Message element.
                @property {Object} ui.message
                **/
                'message': {

                    /**
                    jQuery ID for the message element.
                    @property {String} ui.message.id
                    @default "greeting-message"
                    **/
                    id: 'greeting-message',

                    /**
                    Label text for the message element.
                    @property {String} ui.message.label
                    @default "Custom Message:"
                    **/
                    label: 'Custom Message:'
                },

                /**
                Preview element.
                @property {Object} ui.preview
                **/
                'preview': {

                    /**
                    jQuery ID for the preview element.
                    @property {String} ui.preview.id
                    @default "greeting-preview"
                    **/
                    id: 'greeting-preview',

                    /**
                    Label text for the preview element.
                    @property {String} ui.preview.label
                    @default "Preview:"
                    **/
                    label: 'Preview:'
                },

                /**
                Count element.
                @property {Object} ui.count
                **/
                'count': {

                    /**
                    jQuery ID for the count element.
                    @property {String} ui.count.id
                    @default "greeting-count"
                    **/
                    id: 'greeting-count'
                }
            }
        },

        _public = {

            /**
            Initializes the customization, only if not in editor mode.
            @protected
            @method init
            @param {Object} [options] {{#crossLink "BBI.customization.MountSinai/_defaults:property"}}View a complete list of settings{{/crossLink}}
            **/
            init: function(options) {

                // Merge defaults
                _settings = $.extend(true, {}, _defaults, options);

                // Fix scoping
                var module = this;

                // Wait for the DOM
                $(function() {

                    // Display editor message or execute customization
                    if (BBI.utilities.isEditor) {
                        $('.part-name').show().css('padding-left', '40px');
                    } else {

                        // Clear any previous responses
                        sessvars['mountsinai-' + _settings.form] = {};

                        // Bind to events
                        module.bind();
                    }

                });

                // Wait for NetCommunity PageLoad
                Sys.WebForms.PageRequestManager.getInstance().add_pageLoaded(function() {

                    // This doesn't run in editor mode
                    if (!BBI.utilities.isEditor) {

                        module.setup();

                        // Make sure we've saved in the sessvars before
                        if (sessvars['mountsinai-' + _settings.form] !== undefined) {

                            // Type
                            if (sessvars['mountsinai-' + _settings.form].type !== undefined) {
                                $('#' + _settings.ui.type.id).prop('selectedIndex', sessvars['mountsinai-' + _settings.form].type);
                            }

                            // Name
                            if (sessvars['mountsinai-' + _settings.form].name !== undefined) {
                                $('#' + _settings.ui.name.id).val(sessvars['mountsinai-' + _settings.form].name);
                            }

                            // Message
                            if (sessvars['mountsinai-' + _settings.form].message !== undefined) {
                                $('#' + _settings.ui.message.id).val(sessvars['mountsinai-' + _settings.form].message);
                            }

                            // Show correct rows
                            module.toggle();

                            // Sync preview & count with messages
                            module.update();
                        }

                        // Add greeting type error
                        if ($(_settings.ui.validation.selector).length && $('#' + _settings.ui.name.id).val() == '' && $('#' + _settings.ui.message.id).val() == '') {
                            $(_settings.ui.validation.selector).prepend('<li>' + _settings.ui.validation.label + '</li>');
                        }
                    }

                });
            },

            /**
            Create custom UI.
            @protected
            @method setup
            **/
            setup: function() {
                var html = ''
                    + '<tr>'
                    + ' <td class="BBFieldCaption DonationCaptureFieldCaption">'
                    + '     <label for="' + _settings.ui.type.id + '">' + _settings.ui.type.label + '</label>'
                    + ' </td>'
                    + ' <td class="BBFieldControlCell DonationCaptureFieldControlCell">'
                    + '     <select id="' + _settings.ui.type.id + '" class="BBFormSelectList DonationCaptureSelectList">'
                    + '         <option>' + _settings.ui.select.label + '</option>'
                    + '         <option>Standard</option>'
                    + '         <option>Personalized</option>'
                    + '     </select>'
                    + ' </td>'
                    + ' <td class="BBFormRequiredFieldMarker DonationCaptureRequiredFieldMarker">*</td>'
                    + '</tr>'
                    + '<tr style="display: none">'
                    + ' <td class="BBFieldCaption DonationCaptureFieldCaption">'
                    + '     <label for="' + _settings.ui.name.id + '">' + _settings.ui.name.label + '</label>'
                    + ' </td>'
                    + ' <td class="BBFieldControlCell DonationCaptureFieldControlCell">'
                    + '     <textarea id="' + _settings.ui.name.id + '" class="BBFormTextArea DonationCaptureTextArea"></textarea>'
                    + ' </td>'
                    + ' <td class="BBFormRequiredFieldMarker DonationCaptureRequiredFieldMarker">*</td>'
                    + '</tr>'
                    + '<tr style="display: none">'
                    + ' <td class="BBFieldCaption DonationCaptureFieldCaption">'
                    + '     <label for="' + _settings.ui.message.id + '">' + _settings.ui.message.label + '</label>'
                    + ' </td>'
                    + ' <td class="BBFieldControlCell DonationCaptureFieldControlCell">'
                    + '     <textarea id="' + _settings.ui.message.id + '" class="BBFormTextArea DonationCaptureTextArea"></textarea>'
                    + ' </td>'
                    + ' <td class="BBFormRequiredFieldMarker DonationCaptureRequiredFieldMarker">*</td>'
                    + '</tr>'
                    + '<tr style="display: none">'
                    + ' <td class="BBFieldCaption DonationCaptureFieldCaption">'
                    + '     Preview:'
                    + ' </td>'
                    + ' <td class="BBFieldControlCell DonationCaptureFieldControlCell">'
                    + '     <div id="' + _settings.ui.preview.id + '"></div>'
                    + ' </td>'
                    + ' <td></td>'
                    + '</tr>'
                    + '<tr style="display: none">'
                    + ' <td class="BBFieldCaption DonationCaptureFieldCaption">'
                    + ' </td>'
                    + ' <td class="BBFieldControlCell DonationCaptureFieldControlCell">'
                    + '     <div id="' + _settings.ui.count.id + '" style="color: #CCC">'
                    + ' </td>'
                    + ' <td></td>'
                    + '</tr>';

                // Hide comments field
                $(_settings.ui.comments.selector)
                    .closest('tr')
                    .hide()
                    .before(html);

                // Hide attribute field
                $(_settings.ui.type.attribute).closest('tr').hide();
            },

            /**
            Update the preview and count.
            @protected
            @method update
            **/
            update: function() {
                var type = $('#' + _settings.ui.type.id).prop('selectedIndex'),
                    name = $('#' + _settings.ui.name.id).val(),
                    message = $('#' + _settings.ui.message.id).val(),
                    html, text;

                switch (type) {
                    case 0:
                        html = '';
                    break;
                    case 1:
                        html = _settings.message.replace(_settings.placeholder, name.length > 0 ? name : _settings.placeholderDefault);
                    break;
                    case 2:
                        html = message;
                    break;
                }

                // Save message
                sessvars['mountsinai-' + _settings.form] = {
                    type: type,
                    name: name,
                    message: message
                };

                // Set message
                $('#' + _settings.ui.preview.id).html(html);
                text = $('#' + _settings.ui.preview.id).text();

                $(_settings.ui.comments.selector).val(text);
                $('#' + _settings.ui.count.id).html(_settings.limit - text.length + ' characters remaining');
            },

            /**
            Display the correct fields
            @protected
            @method toggle
            */
            toggle: function() {
                var type = $('#' + _settings.ui.type.id).prop('selectedIndex'),
                    name = $('#' + _settings.ui.name.id).closest('tr'),
                    message = $('#' + _settings.ui.message.id).closest('tr'),
                    preview = $('#' + _settings.ui.preview.id).closest('tr'),
                    count = $('#' + _settings.ui.count.id).closest('tr'),
                    typeAttribute = $(_settings.ui.type.attribute);

                switch(type) {
                    case 0:
                        name.toggle(false);
                        message.toggle(false);
                        preview.toggle(false);
                        count.toggle(false);
                    break;
                    case 1:
                        name.toggle(true);
                        message.toggle(false);
                        preview.toggle(true);
                        count.toggle(true);
                        typeAttribute.prop('selectedIndex', 0);
                    break;
                    case 2:
                        name.toggle(false);
                        message.toggle(true);
                        preview.toggle(true);
                        count.toggle(true);
                        typeAttribute.prop('selectedIndex', 1);
                    break;
                }
            },

            /**
            Reset the fields to their default values
            @protected
            @method reset
            **/
            clear: function() {
                $('#' + _settings.ui.name.id).val('');
                $('#' + _settings.ui.message.id).val('');
            },

            /**
            Bind to keyup event for name and message fields.
            Bind to change event for type select, clearing name and messages fields.
            @protected
            @method bind
            */
            bind: function() {
                var module = this;
                $(document).on('keyup', '#' + _settings.ui.name.id, function() {
                    module.update();
                });
                $(document).on('keyup', '#' + _settings.ui.message.id, function() {
                    module.update();
                });
                $(document).on('change', '#' + _settings.ui.type.id, function() {
                    module.clear();
                    module.toggle();
                    module.update();
                });
            }

        };

        // Expose public
        return _public;

    }()); // module

}(jQuery);

/*
sessvars ver 1.01
- JavaScript based session object
copyright 2008 Thomas Frank

This EULA grants you the following rights:

Installation and Use. You may install and use an unlimited number of copies of the SOFTWARE PRODUCT.

Reproduction and Distribution. You may reproduce and distribute an unlimited number of copies of the SOFTWARE PRODUCT either in whole or in part; each copy should include all copyright and trademark notices, and shall be accompanied by a copy of this EULA. Copies of the SOFTWARE PRODUCT may be distributed as a standalone product or included with your own product.

Commercial Use. You may sell for profit and freely distribute scripts and/or compiled scripts that were created with the SOFTWARE PRODUCT.

v 1.0 --> 1.01
sanitizer added to toObject-method & includeFunctions flag now defaults to false

*/

sessvars=function(){

    var x={};
    
    x.$={
        prefs:{
            memLimit:2000,
            autoFlush:true,
            crossDomain:false,
            includeProtos:false,
            includeFunctions:false
        },
        parent:x,
        clearMem:function(){
            for(var i in this.parent){if(i!="$"){this.parent[i]=undefined}};
            this.flush();
        },
        usedMem:function(){
            x={};
            return Math.round(this.flush(x)/1024);
        },
        usedMemPercent:function(){
            return Math.round(this.usedMem()/this.prefs.memLimit);
        },
        flush:function(x){
            var y,o={},j=this.$$;
            x=x||top;
            for(var i in this.parent){o[i]=this.parent[i]};
            o.$=this.prefs;
            j.includeProtos=this.prefs.includeProtos;
            j.includeFunctions=this.prefs.includeFunctions;
            y=this.$$.make(o);
            if(x!=top){return y.length};
            if(y.length/1024>this.prefs.memLimit){return false}
            x.name=y;
            return true;
        },
        getDomain:function(){
                var l=location.href
                l=l.split("///").join("//");
                l=l.substring(l.indexOf("://")+3).split("/")[0];
                while(l.split(".").length>2){l=l.substring(l.indexOf(".")+1)};
                return l
        },
        debug:function(t){
            var t=t||this,a=arguments.callee;
            if(!document.body){setTimeout(function(){a(t)},200);return};
            t.flush();
            var d=document.getElementById("sessvarsDebugDiv");
            if(!d){d=document.createElement("div");document.body.insertBefore(d,document.body.firstChild)};
            d.id="sessvarsDebugDiv";
            d.innerHTML='<div style="line-height:20px;padding:5px;font-size:11px;font-family:Verdana,Arial,Helvetica;'+
                        'z-index:10000;background:#FFFFCC;border: 1px solid #333;margin-bottom:12px">'+
                        '<b style="font-family:Trebuchet MS;font-size:20px">sessvars.js - debug info:</b><br/><br/>'+
                        'Memory usage: '+t.usedMem()+' Kb ('+t.usedMemPercent()+'%)&nbsp;&nbsp;&nbsp;'+
                        '<span style="cursor:pointer"><b>[Clear memory]</b></span><br/>'+
                        top.name.split('\n').join('<br/>')+'</div>';
            d.getElementsByTagName('span')[0].onclick=function(){t.clearMem();location.reload()}
        },
        init:function(){
            var o={}, t=this;
            try {o=this.$$.toObject(top.name)} catch(e){o={}};
            this.prefs=o.$||t.prefs;
            if(this.prefs.crossDomain || this.prefs.currentDomain==this.getDomain()){
                for(var i in o){this.parent[i]=o[i]};
            }
            else {
                this.prefs.currentDomain=this.getDomain();
            };
            this.parent.$=t;
            t.flush();
            var f=function(){if(t.prefs.autoFlush){t.flush()}};
            if(window["addEventListener"]){addEventListener("unload",f,false)}
            else if(window["attachEvent"]){window.attachEvent("onunload",f)}
            else {this.prefs.autoFlush=false};
        }
    };
    
    x.$.$$={
        compactOutput:false,        
        includeProtos:false,    
        includeFunctions: false,
        detectCirculars:true,
        restoreCirculars:true,
        make:function(arg,restore) {
            this.restore=restore;
            this.mem=[];this.pathMem=[];
            return this.toJsonStringArray(arg).join('');
        },
        toObject:function(x){
            if(!this.cleaner){
                try{this.cleaner=new RegExp('^("(\\\\.|[^"\\\\\\n\\r])*?"|[,:{}\\[\\]0-9.\\-+Eaeflnr-u \\n\\r\\t])+?$')}
                catch(a){this.cleaner=/^(true|false|null|\[.*\]|\{.*\}|".*"|\d+|\d+\.\d+)$/}
            };
            if(!this.cleaner.test(x)){return {}};
            eval("this.myObj="+x);
            if(!this.restoreCirculars || !alert){return this.myObj};
            if(this.includeFunctions){
                var x=this.myObj;
                for(var i in x){if(typeof x[i]=="string" && !x[i].indexOf("JSONincludedFunc:")){
                    x[i]=x[i].substring(17);
                    eval("x[i]="+x[i])
                }}
            };
            this.restoreCode=[];
            this.make(this.myObj,true);
            var r=this.restoreCode.join(";")+";";
            eval('r=r.replace(/\\W([0-9]{1,})(\\W)/g,"[$1]$2").replace(/\\.\\;/g,";")');
            eval(r);
            return this.myObj
        },
        toJsonStringArray:function(arg, out) {
            if(!out){this.path=[]};
            out = out || [];
            var u; // undefined
            switch (typeof arg) {
            case 'object':
                this.lastObj=arg;
                if(this.detectCirculars){
                    var m=this.mem; var n=this.pathMem;
                    for(var i=0;i<m.length;i++){
                        if(arg===m[i]){
                            out.push('"JSONcircRef:'+n[i]+'"');return out
                        }
                    };
                    m.push(arg); n.push(this.path.join("."));
                };
                if (arg) {
                    if (arg.constructor == Array) {
                        out.push('[');
                        for (var i = 0; i < arg.length; ++i) {
                            this.path.push(i);
                            if (i > 0)
                                out.push(',\n');
                            this.toJsonStringArray(arg[i], out);
                            this.path.pop();
                        }
                        out.push(']');
                        return out;
                    } else if (typeof arg.toString != 'undefined') {
                        out.push('{');
                        var first = true;
                        for (var i in arg) {
                            if(!this.includeProtos && arg[i]===arg.constructor.prototype[i]){continue};
                            this.path.push(i);
                            var curr = out.length; 
                            if (!first)
                                out.push(this.compactOutput?',':',\n');
                            this.toJsonStringArray(i, out);
                            out.push(':');                    
                            this.toJsonStringArray(arg[i], out);
                            if (out[out.length - 1] == u)
                                out.splice(curr, out.length - curr);
                            else
                                first = false;
                            this.path.pop();
                        }
                        out.push('}');
                        return out;
                    }
                    return out;
                }
                out.push('null');
                return out;
            case 'unknown':
            case 'undefined':
            case 'function':
                if(!this.includeFunctions){out.push(u);return out};
                arg="JSONincludedFunc:"+arg;
                out.push('"');
                var a=['\n','\\n','\r','\\r','"','\\"'];
                arg+=""; for(var i=0;i<6;i+=2){arg=arg.split(a[i]).join(a[i+1])};
                out.push(arg);
                out.push('"');
                return out;
            case 'string':
                if(this.restore && arg.indexOf("JSONcircRef:")==0){
                    this.restoreCode.push('this.myObj.'+this.path.join(".")+"="+arg.split("JSONcircRef:").join("this.myObj."));
                };
                out.push('"');
                var a=['\n','\\n','\r','\\r','"','\\"'];
                arg+=""; for(var i=0;i<6;i+=2){arg=arg.split(a[i]).join(a[i+1])};
                out.push(arg);
                out.push('"');
                return out;
            default:
                out.push(String(arg));
                return out;
            }
        }
    };
    
    x.$.init();
    return x;
}()