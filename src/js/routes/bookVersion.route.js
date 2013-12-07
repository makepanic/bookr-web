BOOKR.BookVersionRoute = Ember.Route.extend({
    activate: function () {
        BOOKR.set('title', 'Buch Version');
    },
    model: function(params){
        return params.isbnkey;
    },
    setupController: function(controller, isbnkey){
        BOOKR.Book.version(isbnkey).then(function (version) {

            console.log('version', version);
            controller.set('model', version);
        });
    }
});