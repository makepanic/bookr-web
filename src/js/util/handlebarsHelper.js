Ember.Handlebars.helper('isbnPair', function(isbnPair) {
    return Handlebars.Utils.escapeExpression(isbnPair.join('-'));
});