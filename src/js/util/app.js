/*global Em, Strings */
var BOOKR = Em.Application.create({});
BOOKR = BOOKR.reopen({
    version: '0.1.0',

    // global loading state for ajax loader
    loading: false,

    // <title> content
    title: '',

    // api baseurl
    apiUrl: 'http://192.168.178.44:3000/',

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