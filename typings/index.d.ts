// `GET /cart` returns an array of `CartItem`s.
interface CartItem {
    sku_id: number,
    count: number,
}

// `GET /products` returns an array of `Product`s without `.feature`s.
// `GET /products/:product_id` returns a `Product` with `.feature`s.
interface Product {
    id: number,
    name: string,
    slogan: string,
    description: string,
    category: string,
    default_price: string,
    features?: {feature: string, value: string | null}[]
}

// `GET /products/:product_id/styles` returns an array of `Style`s.
interface Style {
    style_id: number,
    name: string,
    original_price: string,
    sale_price: string | null,
    default?: boolean
    photos: {thumbnail_url: string | null, url: string | null}[],
    skus: {quantity: number, size: string}[]
}

// `GET /qa/questions/:question_id/answers` returns an object whose `.results` property is an array
// of `Answer`s.
// i.e. it returns `{results: [question1, question2, ...], ...}`
interface Answer {
    id: number,
    body: string,
    date: Date,
    answerer_name: string,
    helpfulness: number,
    photos: string[]
}

// `GET /qa/questions` returns an object whose `.results` property is an array of `Question`s.
// i.e. it returns `{results: [question1, question2, ...], ...}`
interface Question {
    question_id: number,
    question_body: string,
    question_date: Date,
    asker_name: string,
    question_helpfulness: number,
    reported: boolean,
    answers: {[answer_id: number]: Answer}
}

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
    date: Date,
    reviewer_name: string,
    helpfulness: number,
    photos: {id: number, url: string}[]
}

// `GET /reviews/meta` returns a `Metadata`.
interface Metadata {
    product_id: number,
    ratings: {1: number, 2: number, 3: number, 4: number, 5: number}
    recommended: {true: number, false: number},
    characteristics: {[characteristic: string]: {id: number, value: number}},
    rating: number
}

// Union of database lookups
interface ProductInfo {
    product: Product,
    metadata: Metadata,
    styles: Style[],
}
