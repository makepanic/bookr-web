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
    textSnippet: '',

    largestThumbnail: function () {
        var thumb = this.get('thumbnail'),
            thumbUrl = '';

        if (thumb.normal.length) {
            thumbUrl = thumb.normal;
        } else if(thumb.small.length) {
            thumbUrl = thumb.small;
        } else {
            thumbUrl = 'http://placehold.it/128x200';
        }

        return thumbUrl;

    }.property('thumbnail.small', 'thumbnail.normal')
});

BOOKR.Book.reopenClass({
    find: function (id) {
        var promise = new Ember.RSVP.Promise(function (resolve, reject) {
            var foundBook,
                requestUrl;

            if (id.length) {
                foundBook = BOOKR.TemporaryStore.find('books', id);
                if (!foundBook) {
                    requestUrl = BOOKR.get('apiUrl');
                    requestUrl += 'book/' + id;

                    $.getJSON(requestUrl).then(function (books) {
                        return books.map(function (book) {
                            // check if book already in store
                            var storedBook = BOOKR.TemporaryStore.find('books', book._id),
                                bookrBook;

                            if (storedBook) {
                                bookrBook = storedBook;
                            } else {
                                bookrBook = BOOKR.Book.create(book);
                                BOOKR.TemporaryStore.store('books', book._id, bookrBook);
                            }
                            resolve(bookrBook);
                        });
                    });
                } else {
                    resolve(foundBook);
                }
            } else {
                reject(this);
            }
        });

        return promise;
    },
    /**
     * Uses the api to search for books via query
     * @param {{ query: String, more: Boolean }} options
     * @returns {Promise}
     */
    search: function (options) {
        var defaults = {
                query: '',
                more: false,
                _calledMore: false
            },
            cfg = $.extend({}, defaults, options),
            requestUrl;

        requestUrl = BOOKR.get('apiUrl');
        requestUrl += 'search/' + cfg.query + '/';

        if (cfg.more) {
            requestUrl += 'more';
        }

        return new Ember.RSVP.Promise(function (resolve, reject) {
            resolve($.getJSON(requestUrl));
        }).then(function (books) {
            return Ember.RSVP.Promise(function (resolve, reject) {
                resolve(books.map(function (book) {
                    // check if book already in store
                    var storedBook = BOOKR.TemporaryStore.find('books', book._id),
                        bookrBook;

                    if (storedBook) {
                        bookrBook = storedBook;
                    } else {
                        bookrBook = BOOKR.Book.create(book);
                        BOOKR.TemporaryStore.store('books', book._id, bookrBook);
                    }
                    return bookrBook;
                }));
            });
        }).then(function (books) {
            var booksPromise;

            booksPromise = new Ember.RSVP.Promise(function (resolve, reject) {
                if (books.length || cfg._calledMore) {
                    console.log('found results, resolving');
                    resolve(books);
                } else {
                    console.log('found no results, calling search with more');
                    BOOKR.Book.search({
                        more: true,
                        query: cfg.query,
                        _calledMore: true
                    }).then(function (books) {
                        resolve(books);
                    });
                }
            });

            return booksPromise;

        }).then(function (books) {
            return books;
        });
    }
});