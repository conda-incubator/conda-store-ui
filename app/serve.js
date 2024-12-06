const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '..', 'dist')));

app.get('/runtime-config.js', function (req, res) {
  let js = 'var condaStoreConfig = {\n';
  for (const [ key, value ] of Object.entries(process.env)) {
    if (key.startsWith('REACT_APP_')) {
      js += `  ${key}: ${value},\n`;
    }
  }
  js += '};'
  
  res.set({
    'Content-Type': 'text/javascript',
  })

  res.send(js);
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

app.listen(process.env.PORT || 8000);