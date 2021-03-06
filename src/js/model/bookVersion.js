/*global BOOKR, Em */
BOOKR.BookVersion = Em.Object.extend({
    title: '',
    subtitle: '',
    authors: [],
    year: '',
    isbn: {},
    textSnippet: '',
    thumbnail: {},
    publisher: '',
    largestThumbnail: function () {
        var thumb = this.get('thumbnail'),
            thumbUrl = '';

        if (thumb.hasOwnProperty('normal') && thumb.normal.length) {
            thumbUrl = thumb.normal;
        } else if(thumb.hasOwnProperty('small') && thumb.small.length) {
            thumbUrl = thumb.small;
        } else {
            thumbUrl = 'http://placehold.it/128x200';
        }

        return thumbUrl;

    }.property('thumbnail.small', 'thumbnail.normal')
});