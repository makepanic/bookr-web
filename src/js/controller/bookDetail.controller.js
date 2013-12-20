/*global BOOKR, Em */
BOOKR.BookDetailController = Em.ObjectController.extend({
    bestVersion: null,
    versions: Em.ArrayController.create({
        sortProperties: ['year'],
        sortAscending: false
    }),

    isbnsChanged: function () {
        var that = this,
            isbns = this.get('isbns'),
            versionCtrl = this.get('versions'),
            promises = [],
            bestVersion;

        // reset fields that arent't created in the model
        this.set('bestVersion', null);
        this.set('versions.content', []);

        isbns.forEach(function (isbn) {
            var key = isbn.join('-');

            promises.push(BOOKR.Book.version(key).then(function (version) {
                if (version && version.hasOwnProperty('superBook')) {
                    versionCtrl.addObject(version);
                }
            }));
        });

        Em.RSVP.all(promises).then(function() {
            // all promises resolved
            // look for best version
            versionCtrl.forEach(function(version){
                if (!bestVersion) {
                    bestVersion = version;
                } else {
                    if (bestVersion.quality < version.quality) {
                        bestVersion = version;
                    }
                }
            });
            that.set('bestVersion', bestVersion);
        });
    }.observes('model')

});