/*jslint nomen: true, white: true, plusplus: true */
/*global window, jQuery, sessvars */

/**
* # Usage
* The Mount Sinai Cards customization was developed to customize the BBNC eCard part.  The ultimate goal was to use the eCard part, but for tranditional cards.
* 
* Listed below is an example of what you would include in an <strong>unformatted text part</strong>, and some example settings.
* <strong><a href="#tab-configuration" class="bb-tab-link">View a complete list of configuration options</a>.</strong>
* 
*     BBI.customization.MountSinaiCards({
*       email: 'new-employee@your-domain.com',
*       titles: [
*           'Custom Image Title 1',
*           'Custom Image Title 2'
*       ],
*       language: {
*           'preview-message': 'Custom preview message.',
*           'greeting-standard': [
*               'Custom Greeting 1',
*               'Custom Greeting 2'
*           ]
*       }
*     });
* 
* # Revisions
* 
* ## Version 1.0.0 (December 1, 2013) Bobby Earl
* + Initial development.
*
* ## Version 1.0.1 (December 6, 2013) Bobby Earl
* + Added documentation.
*
* @namespace BBI.customization
* @class MountSinaiCards 
* @static
*
* @author Blackbaud - Bobby Earl
* @requires jQuery
* @requires sessvars
**/

// Verify our namespace
var BBI = window.BBI || {};
BBI.customization = BBI.customization || {};

// Self executing
(function ($) { "use strict";

    // Module definition
    BBI.customization.MountSinaiCards = (function () {
        var _settings, _defaults = {

            /**
            * If recipient addresses provided, send them to this address.
            * @property {String} email
            * @default bobby.earl@blackbaud.com
            **/
            'email': 'bobby.earl@blackbaud.com',

            /**
            * This key <strong>should</strong> be unique for each implementation of the customization.  Must use alphanumeric characters, hyphens and underscores.
            * @property {String} sessvarsKey
            * @default mount-sinai-holiday-cards-2013
            **/
            'sessvars-key': 'unique-sesssvars-key',

            /**
            * Array of available prices.  Each item in the array should be an object with the following properties:
            * @property {Object} prices
            *     @property {Number} prices.min
            *     @property {Number} prices.max
            *     @property {Number} prices.price
            **/
            'prices': [
                {
                    'min': 1,
                    'max': 25,
                    'price': 10
                },
                {
                    'min': 26,
                    'max': 100,
                    'price': 8
                },
                {
                    'min': 100,
                    'max': 1000,
                    'price': 7
                }
            ],

            /**
            * Title to prepend to each card displayed in {{#crossLink "BBI.customization.MountSinaiCards:step1:method"}}step1{{/crossLink}}.
            * @property {Array} titles
            * @default []
            **/
            'titles': [],

            /**
            * Any language used in the customization that's <strong>not</strong> accessible via the eCard part's language tab.
            * @property {Object} language
            **/
            'language': {

                /**
                * @property {String} language.quantity-label
                * @default Quantity:
                **/
                'quantity-label': 'Quantity:',

                /**
                * @property {String} language.quantity-error
                * @default Please enter a valid quantity.
                **/
                'quantity-error': 'Please enter a valid quantity.',

                /**
                * @property {String} language.quantity-max
                * @default To place a larger order, please contact Holly Laws at <a href="mailto:hlaws@mtsinai.on.ca">hlaws@mtsinai.on.ca</a> or 416-586-8203 ext. 3936.
                **/
                'quantity-max': 'To place a larger order, please contact Holly Laws at <a href="mailto:hlaws@mtsinai.on.ca">hlaws@mtsinai.on.ca</a> or 416-586-8203 ext. 3936.',

                /**
                * @property {String} language.address-label
                * @default Address(es):
                **/
                'address-label': 'Address(es):',

                /**
                * @property {String} language.address-error
                * @default Please enter an address.
                **/
                'address-error': 'Please enter an address.',

                /**
                * @property {String} language.recipient-label
                * @default Recipients:
                **/
                'recipient-label': 'Recipients:',

                /**
                * @property {String} language.recipeint-error
                * @default Please select a recipient.
                **/
                'recipient-error': 'Please select a recipient.',

                /**
                * @property {String} language.recipient-myself
                * @default Please ship the unaddressed cards to me. I will include my address below.
                **/
                'recipient-myself': 'Please ship the unaddressed cards to me. I will include my address below.',

                /**
                * @property {String} language.recipient-recipients
                * @default Please ship the cards to my recipients on my behalf. I will include the recipient names and complete address below (this information can be pasted from a Word or Excel document).
                **/
                'recipient-recipients': 'Please ship the cards to my recipients on my behalf. I will include the recipient names and complete address below (this information can be pasted from a Word or Excel document).',

                /**
                * @property {String} language.recipient-email
                * @default Please ship the cards to my recipients on my behalf. I will send a document with complete names and address to <a href="mailto:hlaws@mtsinai.on.ca">hlaws@mtsinai.on.ca</a>.
                **/
                'recipient-email': 'Please ship the cards to my recipients on my behalf. I will send a document with complete names and address to <a href="mailto:hlaws@mtsinai.on.ca">hlaws@mtsinai.on.ca</a>.',

                /**
                * @property {String} language.sender-label
                * @default Sender Name:
                **/
                'sender-label': 'Sender Name:',

                /**
                * @property {String} language.sender-error
                * @default Please enter a sender name.
                **/
                'sender-error': 'Please enter a sender name.',

                /**
                * @property {String} language.sender-help
                * @default If you enter your sender name as "John", that is how your card(s) will be signed. If you prefer additional text such as, "Love, John", "Your friend, John" or "Best wishes, John", please enter the appropriate parting remark above.
                **/
                'sender-help': 'If you enter your sender name as "John", that is how your card(s) will be signed. If you prefer additional text such as, "Love, John", "Your friend, John" or "Best wishes, John", please enter the appropriate parting remark above.',

                /**
                * @property {String} language.greeting-label
                * @default Greeting Type:
                **/
                'greeting-label': 'Greeting Type:',

                /**
                * @property {String} language.greeting-error
                * @default Please select a greeting type.
                **/
                'greeting-error': 'Please select a greeting type.',

                /**
                * @property {String} language.greeting-standard-label
                * @default Standard Greeting:
                **/
                'greeting-standard-label': 'Standard Greeting:',

                /**
                * @property {Array} language.greeting-standard
                * @default []
                **/
                'greeting-standard': [],

                /**
                * @property {String} language.greeting-standard-error
                * @default Please select a standard greeting.
                **/
                'greeting-standard-error': 'Please select a standard greeting.',

                /**
                * @property {String} language.greeting-custom-label
                * @default Custom Greeting:
                **/
                'greeting-custom-label': 'Custom Greeting:',

                /**
                * @property {String} language.greeting-custom-error
                * @default Please enter a custom greeting.
                **/
                'greeting-custom-error': 'Please enter a custom greeting.',

                /**
                * @property {String} language.next
                * @default Next
                **/
                'next': 'Next',

                /**
                * @property {String} language.preview-message
                * @default In celebration of the holidays, <br />a donation has been made in your honour <br />to support the purchase of life-saving <br />infant ventilators in Mount Sinai Hospital's <br /> Neonatal Intensive Care Unit
                **/
                'preview-message': 'In celebration of the holidays, <br />a donation has been made in your honour <br />to support the purchase of life-saving <br />infant ventilators in Mount Sinai Hospital\'s <br /> Neonatal Intensive Care Unit.'
            }
        }, 
        _public = {

            /**
            * Initializes the customization.
            * @protected
            * @method init
            * @param {Object} [options] Any options passed in are merged with the {{#crossLink "BBI.customization.MountSinaiCards/_defaults:property"}}defaults{{/crossLink}}.
            **/
            init: function(options) {

                // Merge settings
                _settings = $.extend(true, {}, _defaults, options);

                // Verify sessvars
                if (sessvars[_settings['sessvars-key']] === undefined) {
                    sessvars[_settings['sessvars-key']] = {};
                }

                // Wait for the DOM
                $($.proxy(function() {
                    this.step1();   // Choose
                    this.step2();   // Quantity
                    this.step3();   // Personalize
                    this.step4();   // Preview
                    this.step5();   // Donate
                }, this));
            },

            /**
            * Alters BBNC eCard Part Step 1 (Choose).
            * 
            * If titles are specified in the {{#crossLink "BBI.customization.MountSinaiCards/init:method"}}constructor{{/crossLink}}, adds the to the selected cards based on index.
            * 
            * @protected
            * @method step1
            **/
            step1: function() {
                var images = $('img[id*="_lvECardTemplates_"]');
                if (images.length && images.length === _settings.titles.length) {
                    images.each(function(i) {
                        $(this).after('<p class="cards-title">' + _settings.titles[i] + '</p>');
                    });
                }
            },

            /**
            * Alters BBNC eCard Part Step 2 (Confirm).
            * 
            * Hides the selected card preview with quantity, recipient type, and addresses.
            * 
            * @protected
            * @method step2
            **/
            step2: function() {
                var subject = $('span[id$="_lblSubjectCaption"]'),
                    placeholder = subject.closest('.ECardPreviewBlock'),
                    html;

                if (subject.length) {   
                    
                    // Hide placeholder
                    placeholder.toggle(false);

                    // Hide image (we show it on the preview step)
                    placeholder.next('.ECardPreviewBlock').toggle(false);

                    // Build new html
                    html = [
                        '<p id="cards-quantity-error" class="BBFormValidatorSummary CardsValidationSummary" style="display: none">',
                        _settings.language['quantity-error'],
                        '</p>',
                        '<p id="cards-quantity-max" class="BBFormValidatorSummary CardsValidationSummary" style="display: none">',
                        _settings.language['quantity-max'],
                        '</p>',
                        '<p id="cards-recipient-error" class="BBFormValidatorSummary CardsValidationSummary" style="display: none">',
                        _settings.language['recipient-error'],
                        '</p>',
                        '<p id="cards-address-error" class="BBFormValidatorSummary CardsValidationSummary" style="display: none">',
                        _settings.language['address-error'],
                        '</p>',
                        '<table class="BBFormTable CardsFormTable">',
                        '   <tr>',
                        '       <td class="BBFieldCaption CardsFieldCaption">',
                        '           <label for="cards-quantity">' + _settings.language['quantity-label'] + '</label>',
                        '       </td>',
                        '       <td class="BBFieldControlCell CardsCaptureFieldControlCell">',
                        '           <input id="cards-quantity" value="' + this.get('quantity') + '" size="3" />',
                        '       </td>',
                        '       <td class="BBFormRequiredFieldMarker CardsCaptureRequiredFieldMarker">*</td>',
                        '   </tr>',
                        '   <tr>',
                        '       <td class="BBFieldCaption CardsFieldCaption">' + _settings.language['recipient-label'] + '</td>',
                        '       <td class="BBFieldControlCell CardsCaptureFieldControlCell">',
                        '           <table class="BBFormTable CardsFormTable">',
                        '               <tr>',
                        '                   <td>',
                        '                       <input type="radio" class="cards-recipient" name="cards-recipient" id="cards-recipient-myself" value="myself" ' + (this.get('recipient') === 'myself' ? 'checked' : '') + ' />',
                        '                   </td>',
                        '                   <td>',
                        '                       <label for="cards-recipient-myself">' + _settings.language['recipient-myself'] + '</label><br />',
                        '                   </td>',
                        '               </tr>',
                        '               <tr>',
                        '                   <td>',
                        '                       <input type="radio" class="cards-recipient" name="cards-recipient" id="cards-recipient-recipients" value="recipients" ' + (this.get('recipient') === 'recipients' ? 'checked' : '') + ' />',
                        '                   </td>',
                        '                   <td>',
                        '                       <label for="cards-recipient-recipients">' + _settings.language['recipient-recipients'] + '</label>',
                        '                   </td>',
                        '               </tr>',
                        '               <tr>',
                        '                   <td>',
                        '                       <input type="radio" class="cards-recipient" name="cards-recipient" id="cards-recipient-email" value="email" ' + (this.get('recipient') === 'email' ? 'checked' : '') + ' />',
                        '                   </td>',
                        '                   <td>',
                        '                       <label for="cards-recipient-email">' + _settings.language['recipient-email'] + '</label>',
                        '                   </td>',
                        '               </tr>',
                        '           </table>',
                        '       </td>',
                        '       <td class="BBFormRequiredFieldMarker CardsCaptureRequiredFieldMarker">*</td>',
                        '   </tr>', 
                        '   <tr class="cards-addresses-row" style="display: none">',
                        '       <td class="BBFieldCaption CardsFieldCaption">',
                        '           <label for="cards-addresses">' + _settings.language['address-label'] + '</label>',
                        '       </td>',
                        '       <td class="BBFieldControlCell CardsCaptureFieldControlCell">',
                        '           <textarea class="cards-addresses" id="cards-addresses">' + this.get('addresses') + '</textarea>',
                        '       </td>',
                        '       <td class="BBFormRequiredFieldMarker CardsCaptureRequiredFieldMarker">*</td>',
                        '   </tr>',
                        '</table>'
                    ];

                    // Append new html
                    placeholder.before(html.join(''));

                    // Toggle the addresses row
                    $('.cards-addresses-row').toggle(this.get('recipient') !== '' && this.get('recipient') !== 'email');

                    // Bind to changing the recipient
                    $('.cards-recipient').change($.proxy(function(e) {
                        $('.cards-addresses-row').toggle(e.target.value !== 'email');
                    },this));

                    // Replace next button
                    this.customNext(function() {

                        // Read quantity
                        var quantity = parseInt($('#cards-quantity').val(), 10),
                            recipient = $('input[name="cards-recipient"]:checked'),
                            addresses = $('#cards-addresses'),
                            proceed = false,
                            max = 0, 
                            j = _settings.prices.length,
                            i = 0;

                        // Hide error messages
                        $('.CardsValidationSummary').hide();

                        // Validate quantity
                        if (typeof quantity !== 'number' || quantity % 1 !== 0  || quantity <= 0) {

                            this.showError('#cards-quantity-error');

                        // Quantity is valid
                        } else {

                            // Determine max
                            for (i; i < j; i++) {
                                if (_settings.prices[i].max > max) {
                                    max = _settings.prices[i].max;
                                }
                            }

                            // Validate quantity max
                            if (quantity > max) {

                                this.showError('#cards-quantity-max');

                            // Quantity is under the maximum
                            } else {

                                // Validate recipient type
                                if (recipient.length === 0) {

                                    this.showError('#cards-recipient-error');

                                // Recipient type is valid
                                } else {

                                    // Validate addresses (if not emailing)
                                    if (recipient.val() !== 'email' && addresses.val() === '') {

                                        this.showError('#cards-address-error');

                                    // Great success
                                    } else {
                                        this.set('quantity', quantity);
                                        this.set('selected', placeholder.next('.ECardPreviewBlock').find('img').attr('alt'));
                                        this.set('recipient', recipient.val());
                                        this.set('addresses', addresses.val());
                                        proceed = true;
                                    }
                                }

                            }
                            
                        }

                        return proceed;
                    });
                }
            },

            /**
            * Alters BBNC eCard Part Step 3 (Personalize).
            * 
            * Hides the default email recipient information with sender name and greeting.
            
            * @protected
            * @method step3
            **/
            step3: function() {

                var recipient = $('input[id$="_gvRecipientInfo_txtEmail_0"]'),
                    placeholder = recipient.closest('.ECardSection'),
                    message = $('textarea[id$="_txtMessage"]'),
                    greetings = '',
                    html = '',
                    j = _settings.language['greeting-standard'].length,
                    i = 0;

                // Only on the personalize screen
                if (recipient.length) {

                    // Hide placeholder
                    placeholder.toggle(false);

                    // Hide the "From:" section
                    $('span[id$="_lblFrom"]').closest('div').toggle(false);
                    $('table[id$="_gvSenderInfo"]').closest('div').toggle(false);
                    
                    // Hide the "Send options" section
                    $('span[id$="_lblOptions"]').closest('div').toggle(false);
                    $('input[id$="_rbSend"]').closest('div').toggle(false);

                    // Hide the "To:" section
                    $('span[id$="_lblTo"]').closest('.ECardSectionSeparator').toggle(false);

                    // Hide the "Message:" section
                    message.closest('div[id$="_divMessage"]').toggle(false);

                    // Add the addresses from the previous screen into the message section
                    message.val(this.get('addresses'));

                    // Add the sender name from the previous screen
                    $('input[id$="_gvSenderInfo_txtName_0"]').val(this.get('sender'));

                    // Enter a "dummy" email address AND hide section
                    recipient.val(_settings.email);

                    // Build greetings first
                    for (i; i < j; i++) {
                        greetings += ''
                            + '<option ' 
                            + (this.get('greeting') === _settings.language['greeting-standard'][i] ? 'selected' : '') 
                            + '>' 
                            + _settings.language['greeting-standard'][i] 
                            + '</option>';
                    }

                    // Only add option if more than one greeting available
                    if (j > 1) {
                        greetings = '<option></option>' + greetings;
                    }

                    // Build our custom fields
                    html = [
                        '<p id="cards-sender-error" class="BBFormValidatorSummary CardsValidationSummary" style="display: none">',
                        _settings.language['sender-error'],
                        '</p>', 
                        '<p id="cards-greeting-error" class="BBFormValidatorSummary CardsValidationSummary error-personlize" style="display: none">',
                        _settings.language['greeting-error'],
                        '</p>',
                        '<p id="cards-greeting-standard-error" class="BBFormValidatorSummary CardsValidationSummary error-personlize" style="display: none">',
                        _settings.language['greeting-standard-error'],
                        '</p>',
                        '<p id="cards-greeting-custom-error" class="BBFormValidatorSummary CardsValidationSummary error-personlize" style="display: none">',
                        _settings.language['greeting-custom-error'],
                        '</p>',
                        '<table class="BBFormTable CardsFormTable">',
                        '   <tr>',
                        '       <td class="BBFieldCaption CardsFieldCaption">',
                        '           <label for="cards-sender">' + _settings.language['sender-label'] + '</label>',
                        '       </td>',
                        '       <td class="BBFieldControlCell CardsCaptureFieldControlCell">',
                        '           <input id="cards-sender" value="' + this.get('sender') + '" />',
                        '           <p class="cards-help">' + _settings.language['sender-help'] + '</p>',
                        '       </td>',
                        '       <td class="BBFormRequiredFieldMarker CardsCaptureRequiredFieldMarker">*</td>',
                        '   </tr>',
                        '   <tr>',
                        '       <td class="BBFieldCaption CardsFieldCaption">',
                        '           <label for="card-greeting-type">' + _settings.language['greeting-label'] + '</label>',
                        '       </td>',
                        '       <td class="BBFieldControlCell CardsCaptureFieldControlCell">',
                        '           <select id="card-greeting-type">',
                        '               <option></option>',
                        '               <option value="standard" ' + (this.get('greeting-type') === 'standard' ? 'selected' : '') + '>Standard</option>',
                        '               <option value="custom" ' + (this.get('greeting-type') === 'custom' ? 'selected' : '') + '>Custom</option>',
                        '           </select>',
                        '       </td>',
                        '       <td class="BBFormRequiredFieldMarker CardsCaptureRequiredFieldMarker">*</td>',
                        '   </tr>',
                        '   <tr class="card-greeting-standard-row" ' + (this.get('greeting-type') === 'standard' ? '' : 'style="display: none"') + '>',
                        '       <td class="BBFieldCaption CardsFieldCaption">',
                        '           <label for="card-greeting-standard">' + _settings.language['greeting-standard-label'] + '</label>',
                        '       </td>',
                        '       <td class="BBFieldControlCell CardsCaptureFieldControlCell">',
                        '           <select id="card-greeting-standard">',
                        '               ' + greetings,
                        '           </select>',
                        '       </td>',
                        '       <td class="BBFormRequiredFieldMarker CardsCaptureRequiredFieldMarker">*</td>',
                        '   </tr>',
                        '   <tr class="card-greeting-custom-row" ' + (this.get('greeting-type') === 'custom' ? '' : 'style="display: none"') + '>',
                        '       <td class="BBFieldCaption CardsFieldCaption">',
                        '           <label for="card-greeting-custom">' + _settings.language['greeting-custom-label'] + '</label>',
                        '       </td>',
                        '       <td class="BBFieldControlCell CardsCaptureFieldControlCell">',
                        '           <textarea id="card-greeting-custom">' + this.get('greeting') + '</textarea>',
                        '       </td>',
                        '       <td class="BBFormRequiredFieldMarker CardsCaptureRequiredFieldMarker">*</td>',
                        '   </tr>',
                        '</table>'
                    ];

                    // Display our custom fields
                    placeholder.before(html.join(''));

                    // Bind to greeting type select
                    $('#card-greeting-type').change($.proxy(function(e) {
                        $('.card-validation').html('');
                        $('.card-greeting-standard-row').toggle(e.target.value === 'standard');
                        $('.card-greeting-custom-row').toggle(e.target.value === 'custom');
                    }, this));

                    // Display custom next button
                    this.customNext(function() {
                        var type = $('#card-greeting-type').val(),
                            standard = $('#card-greeting-standard').val(),
                            custom = $('#card-greeting-custom').val(),
                            sender = $('#cards-sender').val(),
                            proceed = true;

                        // Hide errors
                        $('.CardsValidationSummary').hide();

                        // Validate sender
                        if (sender === '') {
                            
                            proceed = false;
                            this.showError('#cards-sender-error');

                        // Sender is valid
                        } else {

                            // Validate greeting
                            switch (type) {
                                case '':
                                    proceed = false;
                                    this.showError('#cards-greeting-error');
                                break;
                                case 'standard':
                                    switch (standard) {
                                        case '':
                                            proceed = false;
                                            this.showError('#cards-greeting-standard-error');
                                        break;
                                    }
                                break;
                                case 'custom':
                                    switch (custom) {
                                        case '':
                                            proceed = false;
                                            this.showError('#cards-greeting-custom-error');
                                        break;
                                    }   
                                break;
                            }
                        }

                        // Store selection
                        this.set('sender', sender);
                        this.set('greeting-type', type);
                        switch (type) {
                            case 'standard':
                                this.set('greeting', standard);
                            break;
                            case 'custom':
                                this.set('greeting', custom);
                            break;
                            default:
                                this.set('greeting', '');
                            break;
                        }

                        // Proceed
                        return proceed;
                    });
                }
            },

            /**
            * Alters BBNC eCard Part Step 4 (Preview).
            * 
            * Hides the email preview fields and download links and replaces them with a custom preview message.
            * 
            * @protected
            * @method step4
            **/
            step4: function() {
                var from = $('span[id$="_lblPreviewFromCaption"]'),
                    preview = '';

                if (from.length) {

                    // Hide email from/to/subject table
                    from.closest('table').toggle(false);

                    // Hide preview + PDF links
                    $('.ECardPrintableLink').hide();

                    // Build preview message
                    preview = [
                        '<p class="cards-preview-greeting">',
                        this.get('greeting'),
                        '</p>',
                        '<p class="cards-preview-message">',
                        _settings.language['preview-message'],
                        '</p>',
                        '<p class="cards-preview-sender">',
                        this.get('sender'),
                        '</p>'
                    ];

                    // Add class to image div so we can center message
                    $('.ECardPreviewBlock img').closest('.ECardPreviewBlock').addClass('cards-preview').prepend(preview.join(''));
                }
            },

            /**
            * Alters BBNC eCard Part Step 5 (Donate).
            * 
            * Calculates the donation amount field based on the card quantity.  Updates the gift attributes.
            * 
            * @protected
            * @method step5
            **/
            step5: function() {

                var donation = $('span[id$="_lblPersonal"]'),
                    quantity = this.get('quantity'),
                    price = 0,
                    total = 0,
                    html = '',
                    j = _settings.prices.length,
                    i = 0;

                if (donation.length) {

                    // Hide gift attributes
                    $('tr[id$="_trAdditInformation"]').closest('tbody').toggle(false);

                    // Enter gift attributes
                    $('input[id$="_443"]').val(this.get('selected'));
                    $('input[id$="_444"]').val(this.get('quantity'));
                    $('input[id$="_445"]').val(this.get('greeting'));
                    $('input[id$="_446"]').val(this.get('sender'));
                    $('select[id$="_447"]').val(this.get('recipient') === 'myself' ? 'Yes' : 'No');
                    $('select[id$="_448"]').val(this.get('recipient') === 'recipients' ? 'Yes' : 'No');

                    // Determine price per card
                    for (i; i < j; i++) {
                        if (quantity >= _settings.prices[i].min && quantity <= _settings.prices[i].max) {
                            price = _settings.prices[i].price;
                            total = quantity * price;
                            break;
                        }
                    }

                    // Build html
                    html = quantity + ' card' + (quantity > 1 ? 's' : '') + ' x $' + price + ' per card = $' + total + ' total donation';

                    // Display total
                    $('input[id$="_txtAmount"]').val(total).closest('table').toggle(false).before(html);
                }
            },

            /**
            * The next button gets overwritten several times.  This simplifies that.
            * 
            * @protected
            * @method customNext
            * @param {Function} callback Specified callback should return true or false.  If true, original next button is clicked.
            **/
            customNext: function(callback) {

                var next = $('input[id$="_btnNext"]'),
                    html = '<input type="button" class="cards-next" value="' + _settings.language.next + '" />';

                // Verify next button exists
                if (next.length) {
                    
                    // Replace next button
                    next.hide().after($(html).click($.proxy(function(e) {

                        // Stop form submission
                        e.preventDefault();

                        // Trigger original click
                        var proxiedCallback = $.proxy(callback,this);
                        if (proxiedCallback()) {
                            $(e.target).prop('disabled', true);
                            next.get(0).click();
                        }

                    }, this)));
                }
            },

            /**
            * Displays the requested error and scrolls to top of the eCard part.
            * 
            * @protected
            * @method showError
            * @param [String] selector jQuery selector for the error to display.
            */
            showError: function(selector) {
                 $(selector).show();
                 $('body').animate({ scrollTop: $('div[id$="_pnlWizard"]').offset().top });
            },

            /**
            * Reads sessvars by the specified key.  Does return '' (instead of undefined) for undefined properties.
            * 
            * @protected            
            * @method get
            * @param {String} key
            * @return {Mixed}
            **/
            get: function(key) {
                return sessvars[_settings['sessvars-key']][key] === undefined ? '' : sessvars[_settings['sessvars-key']][key];
            },

            /**
            * Stores the value using the key specified.
            * 
            * @protected
            * @method set
            * @param {String} key
            * @param {Mixed} value
            **/
            set: function(key, value) {
                sessvars[_settings['sessvars-key']][key] = value;
            }
        };

        // Expose public
        return _public;

    }()); // module

}(jQuery));

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
/*jsl:ignore*/
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
/*jsl:end*/