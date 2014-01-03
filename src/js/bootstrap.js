
// vendor files
require('./vendor/jquery/jquery.min.js');
require('./vendor/handlebars/handlebars.runtime.js');
require('./vendor/ember/ember.min.js');


// utils
require('./util/app');
require('./util/ajax');
require('./util/temporaryStore');

require('./templates.js');

// routes
require('./routes/router');

// model
require('./model/bookVersion.js');
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