const axios = require('axios').default;
const compression = require('compression');
const dotenv = require('dotenv');
const express = require('express');
const fs = require('fs');
const LRU = require('lru-cache');
const path = require('path');
const { api, render } = require('./dist/server/ssr.js');

dotenv.config();

api.initialize(axios.create({
  baseURL: process.env.API,
  headers: {'Authorization': process.env.API_TOKEN}
}));

let template = fs.readFileSync(
  path.resolve('dist', 'client', 'index.html'),
  'utf-8'
);

const cache = new LRU({
  max: Number(process.env.PRODUCT_CACHE_SIZE),
  maxAge: 1000 * Number(process.env.PRODUCT_CACHE_SECONDS),
});

const app = express();
app.use(compression());
app.use(express.json());

api.initialize(axios.create({
  baseURL: process.env.API,
  headers: {'Authorization': process.env.API_TOKEN}
}));

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

app.use(express.static(path.resolve('dist', 'client'), { index: false }));

app.use('/:product_id?', async (req, res) => {
  let productId = req.params.product_id;
  if (productId === undefined) {
    productId = 40344;
  }

  try {
    let cached = cache.get(productId);
    if (cached === undefined) {
      const [info, questions, reviews, related] = await Promise.all([
        api.getProduct(productId),
        api.getQuestions(productId),
        api.getReviews(productId, 'relevant'),
        api.getRelated(productId),
      ]);
      questions.sort((x, y) => y.question_helpfulness - x.question_helpfulness);
      cached = { info, questions, reviews, related };
      cache.set(productId, cached);
    }
    const component = await render(cached);

    const html = template
      .replace('<!--ssr-outlet-->', component)
      .replace('/*ssr-outlet*/', `
        const info = ${JSON.stringify(cached.info)};
        const questions = ${JSON.stringify(cached.questions)};
        const reviews = ${JSON.stringify(cached.reviews)};
        const related = ${JSON.stringify(cached.related)};
      `);

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  } catch (e) {
    if (e.response) { // out of range of 2xx
      res.status(e.response.status).send(e.response.data);
      return;
    }
    console.error(e.stack);
    res.status(500).end(e.message);
  }
});

app.listen(Number(process.env.PORT), () => {
  console.log(`listening on http://localhost:${process.env.PORT}`);
});
