
// vendor files
require('./vendor/jquery/jquery.min.js');
require('./vendor/handlebars/handlebars.runtime.js');
require('./vendor/ember/ember.js');


// utils
require('./util/strings');
require('./util/app');
require('./util/temporaryStore');

require('./templates.js');

// routes
require('./routes/router');

// model
require('./model/book.js');

// controller
require('./controller/ApplicationController.js');
require('./controller/bookSearch.controller');
require('./controller/bookDetail.controller');
require('./controller/bookVersion.controller');

// views
require('./view/index.view');

// components
require('./components/bookVersion.component');