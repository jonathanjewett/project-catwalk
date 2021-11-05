/// <reference path="../typings/index.d.ts"/>
import axios from 'axios';

const getMetadata = () => Promise.resolve(null);

const getReviews = () => Promise.resolve([]);

const getProduct = () =>
  Promise.resolve({ product: null, metadata: null, styles: [] });

const getRelated = () => Promise.resolve([]);

export default {
  getProduct,
  getRelated,
  getMetadata,
  getReviews,
};
