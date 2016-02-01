**README**
===============================
**To Start App in Development:**

1. Open two CL tabs
2. In the first, run ``nodemon app.js``
(starts server on localhost:3000, per listener in app.js; nodemon auto-restarts server after changes as opposed to default manual server restart)
3. In the other, run ``grunt watch``
(Grunt monitors changes to SASS file and compiles into CSS, may take a second to complete, so refresh view in browser if expected changes don't appear immediately.
