/**
 * Created with IntelliJ IDEA.
 * User: mkp
 * Date: 20.11.13
 * Time: 15:25
 * To change this template use File | Settings | File Templates.
 */

BOOKR.Book = Ember.Object.extend({
    id: '',
    title: '',
    subtitle: '',
    authors: [],
    year: '',
    publisher: '',
    isbn: {
        isbn10: [],
        isbn13: []
    },
    thumbnail: {
        small: '',
        normal: ''
    },
    textSnippet: ''
});

BOOKR.Book.reopenClass({
    search: function (options) {
        var defaults = {
                query: '',
                more: false
            },
            cfg = $.extend({}, defaults, options),
            requestUrl;

        requestUrl = BOOKR.get('apiUrl');
        requestUrl += 'search/' + cfg.query + '/';

        if (cfg.more) {
            requestUrl += 'more';
        }

        return $.getJSON(requestUrl).then(function (data) {
            console.log('data', data);
        });
    }
});