import ReactDOMServer from 'react-dom/server';
import LRU from 'lru-cache';
import App from './App';
import apiModule from './api';

export const api = apiModule;

export const render = ({ info, questions, reviews, related }) =>
  ReactDOMServer.renderToString(
    <App info={info} related={related} reviews={reviews} questions={questions}/>
  );
