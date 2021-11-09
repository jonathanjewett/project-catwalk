import ReactDOMServer from 'react-dom/server';
import App from './App';
import api from './api';

const cache = new Map();

export const render = async (url, productId = 40344) => {
  const [info, questions, reviews, related] = await Promise.all([
    api.getProduct(productId),
    api.getQuestions(productId, 5),
    api.getReviews(productId, 'relevant'),
    api.getRelated(productId, 4),
  ]);
  const component = ReactDOMServer.renderToString(
    <App info={info} related={related} reviews={reviews} questions={questions}/>
  );
  return { info, questions, reviews, related, component };
};
