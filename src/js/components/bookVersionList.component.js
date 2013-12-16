BOOKR.BookVersionListComponent = Ember.Component.extend({
    isbns: [],
    bestVersion: null,
    versions: Em.ArrayController.create({
        sortProperties: ['year'],
        sortAscending: true
    }),

    bestVersionChanged: function(){
        this.sendAction('action', this.get('bestVersion'));
    }.observes('bestVersion'),

    versionsChanged: function(){
        // has all versions
        var versions = this.get('versions'),
            bestVersion;

        versions.forEach(function(version){
            if (!bestVersion) {
                bestVersion = version;
            } else {
                if (bestVersion.quality < version.quality) {
                    bestVersion = version;
                }
            }
        });
        this.set('bestVersion', bestVersion);
    }.observes('loaded'),

    isbnsChanged: function(){
        console.log('isbns', this.get('isbns'));
        var isbns = this.get('isbns'),
            versions = this.get('versions'),
            loaded = 0,
            that = this;

        isbns.forEach(function(isbn, index){
            BOOKR.Book.version(isbn.key).then(function (version) {
                if (version && version.hasOwnProperty('superBook')) {
                    versions.addObject(version);
                }
                loaded += 1;
                if (loaded === isbns.length) {
                    that.set('loaded', true);
                }
            });
        });

    }.observes('isbns')
});