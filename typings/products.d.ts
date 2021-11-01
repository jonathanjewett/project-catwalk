// `GET /products` returns an array of `Product`s without `.feature`s.
// `GET /products/:product_id` returns a `Product` with `.feature`s.
interface Product {
    id: number,
    name: string,
    slogan: string,
    description: string,
    category: string,
    default_price: string,
    features?: {feature: string, value: string}[]
}

// `GET /products/:product_id/styles` returns an array of `Style`s.
interface Style {
    style_id: number,
    name: string,
    original_price: string,
    sale_price: string,
    default?: boolean
    photos: {thumbnail_url: string, url: string}[],
    skus: {quantity: number, size: string}[]
}
