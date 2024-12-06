const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '..', 'dist')));

app.get('/preferences.js', function (req, res) {
  api_url = process.env.REACT_APP_API_URL
  login_page = process.env.REACT_APP_LOGIN_PAGE_URL
  logout_page = process.env.REACT_APP_LOGOUT_PAGE_URL
  config = `var condaStoreConfig = {
    REACT_APP_AUTH_METHOD: "cookie",
    REACT_APP_AUTH_TOKEN: "",
    REACT_APP_STYLE_TYPE: "green-accent",
    REACT_APP_SHOW_LOGIN_ICON: "true",
    REACT_APP_API_URL: "${api_url}",
    REACT_APP_LOGIN_PAGE_URL: "${login_page}",
    REACT_APP_LOGOUT_PAGE_URL: "${login_page}",
  };`
  res.set({
    'Content-Type': 'text/javascript',
  })

  res.send(config);
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

app.listen(8001);