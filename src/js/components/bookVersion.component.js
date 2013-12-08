BOOKR.BookVersionComponent = Ember.Component.extend({
    classNames: ['book-version'],
    classNameBindings: ['loaded:version-ready'],
    loaded: false,
    key: '',
    types: [],
    version: undefined,

    didInsertElement: function () {
        var key = this.get('key'),
            that = this;

        BOOKR.Book.version(key).then(function (version) {
            if (version && version.hasOwnProperty('superBook')) {
                that.set('version', version);
            }
            that.set('loaded', true);
        });
    }
});