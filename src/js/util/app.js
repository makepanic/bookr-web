/*global Em, prepareForTesting */
var BOOKR = Em.Application.create({});

// @if NODE_ENV == 'TESTING'
if(Em.$.isFunction(window.prepareForTesting)){
    prepareForTesting(BOOKR);
}
// @endif

BOOKR = BOOKR.reopen({
    version: '/* @echo VERSION */',

    // global loading state for ajax loader
    loading: false,

    // <title> content
    title: '',

    // api baseurl
    apiUrl: '/* @echo API_URL */',

    // Event that observes BOOKR.title and changes the document title
    titleChanged: function(){
        var title = this.get('title');
        var suffix = BOOKR.strings.titleSuffix + ' ' + BOOKR.version;

        if(title.length){
            Em.$(document).attr('title', title + ' | ' + suffix);
        }else{
            Em.$(document).attr('title', suffix);
        }

    }.observes('title'),

    strings: {
        titleSuffix: ' Bookr'
    }
});