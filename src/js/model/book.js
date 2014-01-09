/*global BOOKR, Em */
BOOKR.Book = Em.Object.extend({
    id: '',
    title: '',
    subtitle: '',
    authors: [],
    isbns: [],
    versions: []
});

BOOKR.Book.reopenClass({
    version: function (isbnkey) {
        var requestUrl,
            foundVersion;

        foundVersion = BOOKR.TemporaryStore.find('bookVersions', isbnkey);

        if (!foundVersion) {
            // has version cached
            // TODO: simplify return
            requestUrl = 'book/version/' + isbnkey;

            return BOOKR.getJSON(requestUrl).then(function (version) {
                var bookrBookVersion;

                if (version.hasOwnProperty('superBook')){
                    // found version
                    bookrBookVersion = BOOKR.BookVersion.create(version);
                    BOOKR.TemporaryStore.store('bookVersions', isbnkey, bookrBookVersion);
                }

                return bookrBookVersion;
            });
        } else {
            return new Em.RSVP.Promise(function (resolve) {
                resolve(foundVersion);
            });
        }


    },
    find: function (id) {
        var promise = new Em.RSVP.Promise(function (resolve, reject) {
            var foundBook,
                requestUrl;

            if (id.length) {
                foundBook = BOOKR.TemporaryStore.find('books', id);
                if (!foundBook) {
                    requestUrl = 'book/' + id;

                    BOOKR.getJSON(requestUrl).then(function (book) {
                        var bookrBook;

                        if (book._id) {
                            // found book
                            var storedBook = BOOKR.TemporaryStore.find('books', book._id);

                            if (storedBook) {
                                bookrBook = storedBook;
                            } else {
                                bookrBook = BOOKR.Book.create(book);
                                BOOKR.TemporaryStore.store('books', book._id, bookrBook);
                            }
                        }

                        resolve(bookrBook);
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
            cfg = Em.$.extend({}, defaults, options),
            requestUrl;

        requestUrl = 'search/' + cfg.query + '/';

        if (cfg.more) {
            requestUrl += 'more';
        }

        return BOOKR.getJSON(requestUrl).then(function (books) {

            return new Em.RSVP.Promise(function (resolve) {
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

            booksPromise = new Em.RSVP.Promise(function (resolve) {

                if (books.length || cfg._calledMore) {

                    resolve({
                        books: books,
                        calledMore: cfg.more
                    });

                } else {

                    BOOKR.Book.search({
                        more: true,
                        query: cfg.query,
                        _calledMore: true
                    }).then(function (result) {
                        resolve(result);
                    });

                }
            });

            return booksPromise;

        }).then(function (result) {
            return result;
        });
    }
});