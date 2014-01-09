
// vendor files
require('./vendor/jquery/jquery-2.0.3.min');
require('./vendor/handlebars/handlebars.runtime-v1.3.0');


// @if NODE_ENV == 'PRODUCTION'
require('./vendor/ember/ember.min.js');
// @endif

// @if NODE_ENV == 'DEVELOPMENT'
require('./vendor/ember/ember.js');
// @endif

// @if NODE_ENV == 'TESTING'
// TODO: evtl != PRODUCTION aber so ist übersichtlicher was was required
require('./vendor/ember/ember.js');
// @endif


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