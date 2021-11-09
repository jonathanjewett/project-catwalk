import Helpful from './details/Helpful';
import ListView from './list-view';
import Modal from './modal';
import Price from './price';
import Report from './details/Report';
import StarRating from './star-rating';

/**
 * Validates a user-submitted string as an email address.
 * @param {string} email
 */
const validateEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);

export { Helpful, ListView, Modal, Report, Price, StarRating, validateEmail };
