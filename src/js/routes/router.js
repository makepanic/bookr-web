/*global GLOBE */


BOOKR.Router.map(function() {
    this.route('index', { path: '/' });
    this.route('bookSearch', { path: '/search/:query'});
    this.route('bookDetail', { path: '/book/:hash'});
    this.route('bookVersion', { path: '/book/version/:isbnkey'});
});
BOOKR.Router.reopen({
    location: 'hash'
});
BOOKR.IndexRoute = Ember.Route.extend({
    activate: function(){
        BOOKR.set('title', '');
    }
});

require('./bookSearch.route.js');
require('./bookDetail.route.js');
require('./bookVersion.route.js');