var BOOKR = Ember.Application.create({
    version: '0.1.0',

    // global loading state for ajax loader
    loading: false,

    // <title> content
    title: '',

    // api baseurl
    apiUrl: '//localhost:3000/',

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