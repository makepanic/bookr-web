BOOKR.IndexView = Ember.View.extend({

    didInsertElement: function () {
        console.log('index inserted', $('.head-bar'));

        var height = $(window).height();
        $('.head-bar').css({
            marginTop: (height / 2 - 40) + 'px'
        })
    },

    willDestroyElement: function () {
        $('.head-bar').css({
            marginTop: ''
        })
    }
});