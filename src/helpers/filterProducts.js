const FilterProducts = (products, numOfProducts, productsIDsToFilter, setFilteredProducts) => {
    let productsCopy = products;
    if (productsIDsToFilter) {
        productsCopy = products.filter(product => !productsIDsToFilter.includes(product.id));
    }
    setFilteredProducts(productsCopy.slice(0, numOfProducts));
};

export default FilterProducts;