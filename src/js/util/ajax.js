/*global GLOBE, Em */

/**
 * $.ajax wrapper that uses Ember.run to run async code.
 * Necessary for async Ember testing.
 * Inspired by globe ajax wrapper.
 *
 * @see {@link https://github.com/makepanic/globe/blob/master/src/js/helpers/ajax.js}
 * @param {Object} settings
 * @returns {Promise}
 */
BOOKR.ajax = function (settings) {
    console.log('BOOKR.ajax', settings);

    return new Ember.RSVP.Promise(function(resolve, reject) {
        // prefix url
        settings.url = BOOKR.get('apiUrl') + settings.url;

        settings.success = function(response) {
            Em.run(null, resolve, response);
        };
        settings.error = function(jqXHR, textStatus) {
            Em.run(null, reject, textStatus);
        };
        Em.$.ajax(settings);

    });
};
/**
 * Calls GLOBE.ajax with parameters to imitate $.getJSON
 * @see {@link GLOBE.ajax}
 * @param {String} url
 * @param {Object} [data]
 * @returns {Promise}
 */
BOOKR.getJSON = function (url, data) {
    return BOOKR.ajax({
        dataType: 'json',
        data: data || {},
        url: url
    });
};