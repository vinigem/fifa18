const path = require('path');
const express = require('express');
const app = express();
const api = require("./mongo/api");
    
app.use(express.static(__dirname + '/dist/fifa18'));
app.set('port', process.env.PORT || 5000);
   
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

const forceSSL = function() {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
       ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
}

// Instruct the app to use the forceSSL middleware
app.use(forceSSL());

app.use('/api',  api);
