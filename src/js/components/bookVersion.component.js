/*global BOOKR, Em */
BOOKR.BookVersionComponent = Em.Component.extend({
    classNames: ['book-version'],
    classNameBindings: ['loaded:version-ready'],
    loaded: false,
    key: function(){
        var version = this.get('version');
        return version.isbn.isbn10 + '-' + version.isbn.isbn13;
    }.property('version.isbn.isbn10', 'version.isbn.isbn13'),

    didInsertElement: function () {
        Em.run.later(this, function() {
            this.set('loaded', true);
        });
    }
});