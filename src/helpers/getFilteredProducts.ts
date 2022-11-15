import {IProduct} from "../store/_types";

const GetFilteredProducts = (
    products: IProduct[],
    numOfProducts: number,
    productsIDsToFilter?: number[],
): IProduct[]  => {
    let productsCopy = products;
    if (productsIDsToFilter) {
        productsCopy = products.filter(product => !productsIDsToFilter.includes(product.id));
    }
    return productsCopy.slice(0, numOfProducts);
};

export default GetFilteredProducts;