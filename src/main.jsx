import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.scss';
import './common/details/details.scss';
import App from './App';
import api from './api';
import sampleInfo from './overview/sampleData';

/* global info:writable, related:writable, reviews:writable, questions:writable */
if (import.meta.env.PROD) {
  if (!import.meta.env.SSR) { // we are in client-side production code
    // forward all API requests to the hosting server
    const { protocol, hostname, port } = window.location;
    api.initialize(axios.create({
      baseURL: `${protocol}//${hostname}:${port}/api/`
    }));
  }
  ReactDOM.hydrate( // attach event handlers rather than creating from scratch
    <React.StrictMode>
      <App
        info={info}
        related={related}
        reviews={reviews}
        questions={questions}
      />
    </React.StrictMode>,
    document.getElementById('root')
  );
} else { // we are inclient-side development code
  // send API requests directly to Atelier API
  api.initialize(axios.create({
    baseURL: import.meta.env.VITE_API,
    headers: { 'Authorization': import.meta.env.VITE_API_TOKEN }
  }));

  // Figure out which product to display by getting a product ID from the URL
  let idString = window.location.pathname;
  if (idString.startsWith('/')) {
    idString = idString.substring(1);
  }
  let productId;
  // For testing purposes only, default to product #40344
  if (idString === '') {
    productId = 40344; // default to product #40344, "Camo Onesie"
  } else {
    productId = Number(idString);
  }

  Promise.allSettled([
    api.getProduct(productId),
    api.getQuestions(productId),
    api.getRelated(productId),
    api.getReviews(productId, 'relevant'),
  ]).then(resultsOrErrors => {
    const [info, questions, related, reviews] = resultsOrErrors.map((res, i) =>
      res.value || (i === 0 ? sampleInfo : [])
    );
    ReactDOM.render(
      <React.StrictMode>
        <App
          info={info}
          related={related}
          reviews={reviews}
          questions={questions}
        />
      </React.StrictMode>,
      document.getElementById('root')
    );
  }).catch(console.error);
}
