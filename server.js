const axios = require('axios').default;
const compression = require('compression');
const dotenv = require('dotenv');
const express = require('express');
const path = require('path');

dotenv.config();

const app = express();
app.use(compression());
app.use(express.json());

const api = axios.create({
  baseURL: process.env.API,
  headers: {'Authorization': process.env.API_TOKEN}
});

const apiRoutes = {
  post: [
    'cart',
    'reviews',
    'qa/questions/:question_id/answers',
    'interactions'
  ],

  put: [
    'qa/answers',
    'qa/questions',
    'reviews'
  ].flatMap(endpoint => [`${endpoint}/:id/helpful`, `${endpoint}/:id/report`]),

  get: [
    'cart',
    'reviews/meta',
    'products/:product_id',
    'reviews',
    'qa/questions',
    'products/:product_id/styles',
    'products/:product_id/related'
  ],
};

for (const method in apiRoutes) {
  /** @type {express.IRouterMatcher} */
  const passthrough = app[method].bind(app);
  for (const route of apiRoutes[method]) {
    passthrough('/api/' + route, async (req, res) => {
      try {
        const serverResponse = await api({
          method,
          url: req.url.slice(4),
          data: req.body
        });
        res.status(serverResponse.status).send(serverResponse.data);
      } catch (error) {
        if (error.response) { // out of range of 2xx
          res.status(error.response.status).send(error.response.data);
        } else if (error.request) { // no response received
          console.log(error.request);
        } else { // something went wrong with setting up the request
          res.status(500).send(error.message);
        }
      }
    });
  }
}

app.use(express.static(path.join(__dirname, 'dist')));

app.put('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(3000);
