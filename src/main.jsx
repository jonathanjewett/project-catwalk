import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import './common/details/details.scss';
import App from './App';
import api from './api';

if (import.meta.env.PROD) {
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

  // Asynchronously retrieve product info and then re-render
  api.getProduct(productId).then(info => {
    ReactDOM.render(
      <React.StrictMode>
        <App
          info={info}
          related={[]}
          reviews={[]}
          questions={[]}
        />
      </React.StrictMode>,
      document.getElementById('root')
    );
  }).catch(console.error);
}
