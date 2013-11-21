BOOKR.ApplicationController = Ember.Controller.extend({
    query: '',
    searchedMore: false,

    actions: {
        search: function(){
            var query = this.get('query');
            if (query.length) {
                this.transitionToRoute('bookSearch', query);
            }
        }
    }
});