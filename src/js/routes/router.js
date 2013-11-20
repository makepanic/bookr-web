/*global GLOBE */


BOOKR.Router.map(function() {
    this.route('index', { path: '/' });
    this.route('bookSearch', { path: '/search/:query'});
    this.route('bookDetail', { path: '/search/:hash'});
});
BOOKR.Router.reopen({
    location: 'hash'
});
BOOKR.IndexRoute = Ember.Route.extend({
    activate: function(){
        BOOKR.set('title', '');
    }
});

require('./bookSearch.model.js');