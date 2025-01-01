# conda store ui - server

This module provides a node server for running the conda store ui
in production as a standalone application. It provides 3 endpoints:

### /runtime-config.js

This endpoint will return a `text/javascript` file with runtime config
that has been provided as environment variables. For example, given
starting up the server with the environment variables

```
REACT_APP_API_URL=my.condastore.api.com REACT_APP_AUTH_METHOD=cookie node serve.js
```

It will produce the output

```
var condaStoreConfig = {
    REACT_APP_API_URL: "my.condastore.api.com",
    REACT_APP_AUTH_METHOD: "cookie",
}
```

### /status

This is a simple endpoint that returns a 200 OK if the server is running.

### /*

This route will catch all traffic (that is not caught by the other 2 routes) 
and serve the conda store ui application. This is a single page JavaScript 
application with its own router that runs in the browser. This frontend router 
handles any further routing needed by the UI application, including rendering 
a 404 not found page if the route doesn't match any known routes.
