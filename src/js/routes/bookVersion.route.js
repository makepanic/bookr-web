/*global BOOKR, Em */
BOOKR.BookVersionRoute = Em.Route.extend({
    model: function(params){
        return params.isbnkey;
    },
    setupController: function(controller, isbnkey){
        BOOKR.Book.version(isbnkey).then(function (version) {
            BOOKR.set('title', version.title + ' | Buch Version');
            controller.set('model', version);
        });
    }
});