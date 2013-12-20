/*global BOOKR, Em */
BOOKR.BookDetailRoute = Em.Route.extend({
    model: function(params){
        return params.hash;
    },
    setupController: function(controller, id){
        BOOKR.Book.find(id).then(function (book) {
            BOOKR.set('title', book.title + ' | Buch Details');
            controller.set('model', book);
        });
    }
});