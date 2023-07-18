const express = require('express');
const routes = require('./routes/sampleRoute');
const port = 8000;
const app = express();

app.use(routes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});