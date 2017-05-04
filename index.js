let ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
let database = require('./app/database');
database.connect();
let express = require('express');
let app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use("/", require('./app/login').router);
app.use('/', ensureLoggedIn('/login'), require('./app/content').router);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


