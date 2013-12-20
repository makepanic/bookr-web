module('book version tests');

test('book version thumbnail test', function(){
    var v = BOOKR.BookVersion.create({});

    equal(v.get('largestThumbnail'), 'http://placehold.it/128x200', 'uses placeholder thumbnail');
});