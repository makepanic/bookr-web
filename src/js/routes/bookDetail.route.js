
BOOKR.BookDetailRoute = Ember.Route.extend({
    activate: function () {
        BOOKR.set('title', 'Buch Details');
    },

    model: function(params){
        return params.hash;
    },
    setupController: function(controller, id){
        console.log('setupController', controller, id);

        BOOKR.Book.find(id).then(function (book) {
            controller.set('model', book);
        });
    }
});