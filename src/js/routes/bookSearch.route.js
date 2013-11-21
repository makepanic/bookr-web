
BOOKR.BookSearchRoute = Ember.Route.extend({
    activate: function () {
        BOOKR.set('title', 'Buchsuche');
    },

    model: function(params){
        return params.query;
    },
    setupController: function(controller, query){
        console.log('setupController', controller, query);

        // update application query
        controller.set('controllers.application.query', query);
        controller.set('controllers.application.searchedMore', false);

        BOOKR.Book.search({
            query: query,
            more: false
        }).then(function (data) {
            console.log('bookr search data', data);
            controller.set('controllers.application.searchedMore', data.calledMore);
            controller.set('model', data.books);
        });
    }
});