
BOOKR.BookSearchRoute = Ember.Route.extend({
    activate: function () {
        BOOKR.set('title', 'Buchsuche');
    },

    model: function(params){
        return params.query;
    },
    setupController: function(controller, query){
        console.log('setupController', controller, query);

        BOOKR.Book.search({
            query: query,
            more: false
        }).then(function (data) {
                console.log('bookr search data', data);
            controller.set('model', data);
        });
    }
});