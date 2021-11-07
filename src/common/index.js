import Helpful from './Helpful';
import ListView from './list-view';
import Modal from './modal';
import Report from './Report';
import StarRating from './star-rating';

/**
 * Validates a user-submitted string as an email address.
 * @param {string} email
 */
const validateEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);

export { Helpful, ListView, Modal, Report, StarRating, validateEmail };
