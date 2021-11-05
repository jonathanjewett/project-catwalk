/// <reference path="../typings/index.d.ts"/>
import axios from 'axios';

/** An Axios instance that points to the Atelier API. */
const api = axios.create({
  baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/' +
    process.env.VITE_CAMPUS,
  headers: {'Authorization': process.env.VITE_API_TOKEN}
});

// POST

/**
 * Adds a product to the cart.
 * @param {number} skuId - ID for the product being added to the cart
 */
const addToCart = async (skuId) => {
  await api.post('/cart', { sku_id: skuId });
};

/**
 * Adds a review for a product.
 *
 * Routes used:
 * - [`POST /reviews`](https://learn-2.galvanize.com/cohorts/2967/blocks/94/content_files/Front%20End%20Capstone/project-atelier-catwalk/reviews.md#add-a-review)
 * @param {Object} review - review to post
 * @param {number} review.product_id - ID of the product to post the review for
 * @param {number} review.rating - integer (1-5) indicating the review rating
 * @param {string} review.summary - summary text of the review
 * @param {string} review.body - continued or full text of the review
 * @param {boolean} review.recommend - value indicating if the reviewer recommends the product
 * @param {string} review.name - username for question asker
 * @param {string} review.email - email address for question asker
 * @param {string[]} review.photos - array of text urls that link to images to be shown
 * @param {{[characteristic_id: string]: number}} review.characteristics - object of keys representing characteristic_id and values representing the review value for that characteristic. { "14": 5, "15": 5 //...}
 */
const createReview = async (review) => {
  await api.post('/reviews', review);
};

/**
 * Adds an answer for a question.
 *
 * Routes used:
 * - [`POST /qa/questions/:question_id/answers`](https://learn-2.galvanize.com/cohorts/2967/blocks/94/content_files/Front%20End%20Capstone/project-atelier-catwalk/qa.md#add-an-answer)
 * @param {number} questionId - ID of the question to post the answer for
 * @param {Object} answer - answer to post
 * @param {string} answer.body - text of question being asked
 * @param {string} answer.name - username for question asker
 * @param {string} answer.email - email address for question asker
 * @param {string[]} answer.photos - an array of urls corresponding to images to display
 */
const createAnswer = async (questionId, answer) => {
  await api.post(`/qa/questions/${questionId}/answers`, answer);
};

/**
 * Log an interaction to the database.
 * @param {string} element - selector for the element which was clicked
 * @param {string} widget - name of the module/widget in which the click occurred
 * @param {Date=} time - time the interaction occurred, or the current moment
 */
const logInteraction = async (element, widget, time = new Date()) => {
  api.post('/interactions', { element, widget, time: time.toISOString() });
};

// PUT

const endpoint = (type) => {
  switch (type) {
  case 'answer':
    return '/qa/answers';
  case 'question':
    return '/qa/questions';
  case 'review':
    return '/reviews';
  }
};

/**
 * Updates an answer, question, or review to show it was found helpful.
 * @param {'answer'|'question'|'review'} type
 * @param {number} id - answer_id, question_id, or review_id
 * Routes used:
 * - [`PUT /qa/answers/:answer_id/helpful`](https://learn-2.galvanize.com/cohorts/2967/blocks/94/content_files/Front%20End%20Capstone/project-atelier-catwalk/qa.md#mark-answer-as-helpful)
 * - [`PUT /qa/questions/:question_id/helpful`](https://learn-2.galvanize.com/cohorts/2967/blocks/94/content_files/Front%20End%20Capstone/project-atelier-catwalk/qa.md#mark-question-as-helpful)
 * - [`PUT /reviews/:review_id/helpful`](https://learn-2.galvanize.com/cohorts/2967/blocks/94/content_files/Front%20End%20Capstone/project-atelier-catwalk/reviews.md#mark-review-as-helpful)
 */
const markHelpful = async (type, id) => {
  await api.put(`${endpoint(type)}/${id}/helpful`);
};


/**
 * Updates an answer, question, or review to show it was reported.
 *
 * Note: this action does not delete the item, but the item will not be returned in GET requests.
 *
 * Routes used:
 * - [`PUT /qa/answers/:answer_id/report/`](https://learn-2.galvanize.com/cohorts/2967/blocks/94/content_files/Front%20End%20Capstone/project-atelier-catwalk/qa.md#report-answer)
 * - [`PUT /qa/questions/:review_id/report/`](https://learn-2.galvanize.com/cohorts/2967/blocks/94/content_files/Front%20End%20Capstone/project-atelier-catwalk/qa.md#report-question)
 * - [`PUT /reviews/:review_id/report/`](https://learn-2.galvanize.com/cohorts/2967/blocks/94/content_files/Front%20End%20Capstone/project-atelier-catwalk/reviews.md#report-review)
 * @param {'answer'|'question'|'review'} type
 * @param {number} id - answer_id, question_id, or review_id
 */
const report = async (type, id) => {
  await api.put(`${endpoint(type)}/${id}/report`);
};

// GET

/**
 * Retrieves list of products added to the cart by a user.
 * Routes used:
 * - [`GET /cart`](https://learn-2.galvanize.com/cohorts/2967/blocks/94/content_files/Front%20End%20Capstone/project-atelier-catwalk/cart.md#get-cart)
 * @returns {Promise<CartItem[]>}
 */
const getCart = async () => {
  const res = await api.get('/cart');
  return res.data;
};

/**
 * Retrieves review metadata for a product.
 *
 * Routes used: [`GET /reviews/meta`](https://learn-2.galvanize.com/cohorts/2967/blocks/94/content_files/Front%20End%20Capstone/project-atelier-catwalk/reviews.md#get-review-metadata)
 * @param {number} productId
 * @returns {Promise<Metadata>}
 */
const getMetadata = async (productId) => {
  const res = await api.get(`/reviews/meta/?product_id=${productId}`);
  const metadata = res.data;

  // Turn all those stringified numbers back into real numbers
  metadata.product_id = productId;
  for (const chara of Object.values(metadata.characteristics)) {
    chara.value = Number(chara.value);
  }
  for (const rec in metadata.recommended) {
    metadata.recommended[rec] = Number(metadata.recommended[rec]);
  }

  // Calculate average rating
  let sum = 0;
  let count = 0;
  const ratings = metadata.ratings;
  for (const rating in ratings) {
    const amount = Number(ratings[rating]);
    ratings[rating] = amount;
    count += amount;
    sum += rating * amount;
  }
  metadata.rating = sum / count;

  return metadata;
};

/**
 * Retrieves product details.
 *
 * Routes used:
 * - [`GET /products/:product_id`](https://learn-2.galvanize.com/cohorts/2967/blocks/94/content_files/Front%20End%20Capstone/project-atelier-catwalk/products.md#product-information)
 * @param {number} productId
 * @returns {Promise<Product>}
 */
const getProductDetail = async (productId) => {
  const res = await api.get(`/products/${productId}`);
  return res.data;
};

/**
 * Retrieves reviews for a product.
 *
 * Routes used:
 * - [`GET /reviews`](https://learn-2.galvanize.com/cohorts/2967/blocks/94/content_files/Front%20End%20Capstone/project-atelier-catwalk/reviews.md#list-reviews)
 * @param {number} productId
 * @param {number=} count - number of results to return, or all if unspecified
 * @returns {Promise<Review[]}>}
 */
const getReviews = async (productId, count = Number.MAX_SAFE_INTEGER) => {
  const res = await api.get(`reviews?product_id=${productId}&count=${count}`);
  return res.data.results;
};

/**
 * Retrieves styles for a product.
 *
 * Routes used:
 * - [`GET /products/:product_id/styles`](https://learn-2.galvanize.com/cohorts/2967/blocks/94/content_files/Front%20End%20Capstone/project-atelier-catwalk/products.md#product-styles)
 * @param {number} productId
 * @returns {Promise<Style[]>}
 */
const getStyles = async (productId) => {
  const res = await api.get(`/products/${productId}/styles`);
  return res.data.results;
};

/**
 * Retrieves the details, metadata, and styles of a product.
 *
 * Routes used:
 * - [`GET /products/:product_id`](https://learn-2.galvanize.com/cohorts/2967/blocks/94/content_files/Front%20End%20Capstone/project-atelier-catwalk/products.md#product-information)
 * - [`GET /reviews`](https://learn-2.galvanize.com/cohorts/2967/blocks/94/content_files/Front%20End%20Capstone/project-atelier-catwalk/reviews.md#list-reviews)
 * - [`GET /products/:product_id/styles`](https://learn-2.galvanize.com/cohorts/2967/blocks/94/content_files/Front%20End%20Capstone/project-atelier-catwalk/products.md#product-styles)
 * @param {number} productId
 * @returns {Promise<ProductInfo>}
 */
const getProduct = async (productId) => {
  const [product, metadata, styles] = await Promise.all([
    getProductDetail(productId),
    getMetadata(productId),
    getStyles(productId)
  ]);
  return { product, metadata, styles };
};

/**
 * Retrieves product information of items related to a product.
 *
 * Routes used:
 * - [`GET /products/:product_id/related`](https://learn-2.galvanize.com/cohorts/2967/blocks/94/content_files/Front%20End%20Capstone/project-atelier-catwalk/products.md#related-products)
 * - [`GET /products/:product_id`](https://learn-2.galvanize.com/cohorts/2967/blocks/94/content_files/Front%20End%20Capstone/project-atelier-catwalk/products.md#product-information) (per item)
 * - [`GET /reviews`](https://learn-2.galvanize.com/cohorts/2967/blocks/94/content_files/Front%20End%20Capstone/project-atelier-catwalk/reviews.md#list-reviews) (per item)
 * - [`GET /products/:product_id/styles`](https://learn-2.galvanize.com/cohorts/2967/blocks/94/content_files/Front%20End%20Capstone/project-atelier-catwalk/products.md#product-styles) (per item)
 * @param {number} productId
 * @returns {Promise<ProductInfo[]>}
 */
const getRelated = async (productId) => {
  const res = await api.get(`/products/${productId}/related`);
  return Promise.all(res.data.map(getProduct));
};

export default {
  // POST
  addToCart,
  createReview,
  createAnswer,
  logInteraction,
  // PUT
  markHelpful,
  report,
  // GET
  getCart,
  getProduct,
  getRelated,
  getReviews,
};
