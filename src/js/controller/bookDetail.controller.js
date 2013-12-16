BOOKR.BookDetailController = Ember.ObjectController.extend({

    preparedIsbns: [],
    bestVersion: null,

    actions: {
        bestVersionAvailable: function(version){
            this.set('bestVersion', version)

        }
    },

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