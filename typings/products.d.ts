interface Product {
    id: number,
    name: string,
    slogan: string,
    description: string,
    category: string,
    default_price: string,
    features?: {feature: string, value: string}[]
}

interface Style {
    style_id: number,
    name: string,
    original_price: string,
    sale_price: string,
    default?: boolean
    photos: {thumbnail_url: string, url: string}[],
    skus: {quantity: number, size: string}[]
}
