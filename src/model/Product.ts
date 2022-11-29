export  interface Product {
    productId: string,
    productName: string,
    price: number,
    category: string[],
    quantity: number,
    imageURL: string,
    ratings: number,
    createdAt: number
}


export  interface ProductDetails {
    productId: string,
    description: string,
    benefits: string,
    imageURL: string,
    createdAt: number
}


export interface Reviews {
    productId: string,
    userId: string,
    userName: string,
    userRating: number,
    createdAt: Date
}