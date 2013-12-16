
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
        controller.set('content', []);
        BOOKR.set('loading', true);

        BOOKR.Book.search({
            query: query,
            more: false
        }).then(function (data) {
            BOOKR.set('loading', false);
            console.log('bookr search data', data);
            controller.set('controllers.application.searchedMore', data.calledMore);
            controller.set('model', data.books);
        });
    }
});