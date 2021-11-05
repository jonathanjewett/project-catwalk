const mock = (item) => () => Promise.resolve(item);

export default {
  // POST
  addToCart: mock(),
  createReview: mock(),
  createAnswer: mock(),
  logInteraction: mock(),
  // PUT
  markHelpful: mock(),
  report: mock(),
  // GET
  getCart: mock([]),
  getProduct: mock(),
  getRelated: mock([]),
  getReviews: mock([]),
};
