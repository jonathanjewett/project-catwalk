import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.scss';
import './common/details/details.scss';
import App from './App';
import api from './api';

if (import.meta.env.PROD) {
  if (!import.meta.env.SSR) {
    api.initialize(axios.create({
      baseURL: `${location.protocol}//${location.hostname}:${location.port}/api/`
    }));
  }
  ReactDOM.hydrate(
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
} else {
  api.initialize(axios.create({
    baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/' +
      import.meta.env.VITE_CAMPUS,
    headers: {'Authorization': import.meta.env.VITE_API_TOKEN}
  }));
  // Get product ID from URL
  let idString = window.location.pathname;
  if (idString.startsWith('/')) {
    idString = idString.substring(1);
  }
  let productId;
  // For testing purposes only, default to product #40344
  if (idString === '') {
    productId = 40344;
  } else {
    productId = Number(idString);
  }


  Promise.all([
    api.getProduct(productId),
    api.getQuestions(productId),
    api.getRelated(productId),
    api.getReviews(productId, 'relevant'),
  ]).then(([info, questions, related, reviews]) => {
    questions.sort((x, y) => y.question_helpfulness - x.question_helpfulness);
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
