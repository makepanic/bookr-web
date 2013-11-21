var BOOKR = Ember.Application.create({
    version: '0.1.0',

    // <title> content
    title: '',

    // api baseurl
    apiUrl: '//localhost:1337/',

    // Event that observes GLOBE.title and changes the document title
    titleChanged: function(){

        var title = this.get('title');
        var suffix = Strings.titleSuffix + ' ' + BOOKR.version;

        if(title.length){
            $(document).attr('title', title + ' | ' + suffix);
        }else{
            $(document).attr('title', suffix);
        }

    }.observes('title')

});