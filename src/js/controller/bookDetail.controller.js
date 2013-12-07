BOOKR.BookDetailController = Ember.ObjectController.extend({

    preparedIsbns: [],

    isbnsChanged: function () {
        var isbns = this.get('isbns'),
            preparedIsbns = [];

        isbns.forEach(function (isbn) {
            preparedIsbns.push({
                key: isbn.join('-'),
                types: isbn
            });
        });

        this.set('preparedIsbns', preparedIsbns);
    }.observes('isbns')

});