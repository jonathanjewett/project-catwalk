/// <reference path="../typings/index.d.ts"/>
import axios from 'axios';

/** An Axios instance that points to the Atelier API. */
const api = axios.create({
  baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/' +
    import.meta.env.VITE_CAMPUS,
  headers: {'Authorization': import.meta.env.VITE_API_TOKEN}
});

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
  metadata['product_id'] = productId;
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
  getProduct,
  getRelated,
  getMetadata,
  getReviews,
};
