const express = require('express');
const compression = require('compression')
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use(compression())

app.get('/runtime-config.js', function (req, res) {
  // Creates a runtime config from env vars
  // This will look something like:
  //    var condaStoreConfig = {
  //      REACT_APP_API_URL: "<provided url>",
  //      REACT_APP_AUTH_METHOD: "<provided auth method>",
  //      . . .
  //    }
  let js = 'var condaStoreConfig = {\n';
  for (const [ key, value ] of Object.entries(process.env)) {
    if (key.startsWith('REACT_APP_')) {
      // Reminder: every value in process.env is a string
      js += `  ${key}: "${value}",\n`;
    }
  }
  js += '};'
  
  res.set({
    'Content-Type': 'text/javascript',
  })

  res.send(js);
});

app.get('/status', function(req, res) {
  const data = {
    status: 'Ok',
  }
  res.status(200).send(data);
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

app.listen(process.env.PORT || 8000);
