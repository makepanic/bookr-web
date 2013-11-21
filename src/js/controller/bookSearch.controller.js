BOOKR.BookSearchController = Ember.ArrayController.extend({

    // inject dependency to application
    needs: ['application'],

    actions: {
        searchMore: function (where) {
            var AppCtrl = this.get('controllers.application'),
                query = AppCtrl.get('query'),
                that = this;

            if (query.length) {
                BOOKR.Book.search({
                    query: query,
                    more: true
                }).then(function (data) {
                    console.log('bookr search data', data);
                    AppCtrl.set('searchedMore', data.calledMore);
                    that.addObjects(data.books);
                });
            }
        }
    }

});