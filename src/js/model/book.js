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
    find: function (id) {
        var promise = new Ember.RSVP.Promise(function (resolve, reject) {
            var foundBook;

            if (id.length) {
                foundBook = BOOKR.TemporaryStore.find('books', id);
                resolve(foundBook);
            } else {
                reject(this);
            }
        });

        return promise;
    },
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

        return $.getJSON(requestUrl).then(function (books) {
            return books.map(function (book) {
                // check if book already in store
                var storedBook = BOOKR.TemporaryStore.find('books', book._id),
                    bookrBook;

                if (storedBook) {
                    bookrBook = storedBook;
                } else {
                    bookrBook = BOOKR.Book.create(book);
                    BOOKR.TemporaryStore.store('books', book._id, book);
                }
                return bookrBook;
            });
        });
    }
});