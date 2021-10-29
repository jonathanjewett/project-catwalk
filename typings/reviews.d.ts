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

interface ReviewMetadata {
    product_id: string,
    ratings: {1: number, 2: number, 3: number, 4: number, 5: number}
    recommended: {[recommendation: number]: number},
    characteristics: {[characteristic: string]: {id: number, value: string}}
}
