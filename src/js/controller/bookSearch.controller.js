BOOKR.BookSearchController = Ember.ArrayController.extend({
    sortProperties: ['year'],
    sortAscending: false,

    // inject dependency to application
    needs: ['application'],

    actions: {
        searchMore: function () {
            var AppCtrl = this.get('controllers.application'),
                query = AppCtrl.get('query'),
                that = this;

            if (query.length) {
                BOOKR.Book.search({
                    query: query,
                    more: true
                }).then(function (data) {
                    AppCtrl.set('searchedMore', data.calledMore);
                    that.addObjects(data.books);
                });
            }
        }
    }

});