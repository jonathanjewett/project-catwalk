// `GET /products/:product_id/styles` returns an object whose `.results` property is an array of
// `Review`s.
// i.e. it returns `{results: [review1, review2, ...], ...}`
interface Review {
    review_id: number,
    rating: number,
    summary: string,
    recommend: boolean,
    response: string | null,
    body: string,
    date: string,
    reviewer_name: string,
    helpfulness: number,
    photos: {id: number, url: string}[]
}

// `GET /reviews/meta` returns a `ReviewMetadata`.
interface ReviewMetadata {
    product_id: string,
    ratings: {1: number, 2: number, 3: number, 4: number, 5: number}
    recommended: {true: number, false: number},
    characteristics: {[characteristic: string]: {id: number, value: string}}
}
