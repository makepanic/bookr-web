/*global BOOKR, Em */
BOOKR.BookSearchRoute = Em.Route.extend({
    model: function(params){
        return params.query;
    },
    setupController: function(controller, query){
        BOOKR.set('title', query + ' | Buchsuche');

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
            controller.set('controllers.application.searchedMore', data.calledMore);
            controller.set('model', data.books);
        });
    }
});