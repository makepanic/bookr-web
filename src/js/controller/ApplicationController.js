/*global BOOKR, Em */
BOOKR.ApplicationController = Em.Controller.extend({
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