/*global BOOKR, Em */
BOOKR.IndexView = Em.View.extend({

    didInsertElement: function () {
        var height = Em.$(window).height();
        Em.$('.head-bar').css({
            marginTop: (height / 2 - 40) + 'px'
        });
    },

    willDestroyElement: function () {
        Em.$('.head-bar').css({
            marginTop: ''
        });
    }
});