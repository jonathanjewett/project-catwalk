import ReactDOMServer from 'react-dom/server';
import LRU from 'lru-cache';
import App from './App';
import apiModule from './api';

export const api = apiModule;

// Render the App component to a string for the server
export const render = ({ info, questions, reviews, related }) =>
  ReactDOMServer.renderToString(
    <App info={info} related={related} reviews={reviews} questions={questions}/>
  );
