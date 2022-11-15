export interface IProduct {
    id: number
    title: string
    description: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    brand: string
    category: string
    thumbnail: string
    images: string[]
    quantity: number
    discountPrice: number
}

export interface ICart {
    products: IProduct[]
    totalQuantity: number
    totalPrice: string
}

export interface ICartState {
    cart: ICart
}

export interface IProductsState {
    products: IProduct[]
    chosenProduct: IProduct
}

export interface IUpdateCartBody {
    id: number
    quantity: number
}

export interface IUpdateCartResponse {
    discountedTotal: number
    id: number
    products: IProduct[]
    total: number
    totalProducts: number
    totalQuantity: number
    userId: number
}