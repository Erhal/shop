const FilterProducts = (products, numOfProducts, category, productsIDsToFilter, setFilteredProducts) => {
    let productsCopy = products;
    if (productsIDsToFilter) {
        productsCopy = products.filter(product => !productsIDsToFilter.includes(product.id));
    }
    if (category === 'all') {
        setFilteredProducts(productsCopy.slice(0, numOfProducts));
    } else if (category === 'smartphones') {
        setFilteredProducts(productsCopy.filter(product => product.category === 'smartphones').slice(0, numOfProducts));
    } else if (category === 'laptops') {
        setFilteredProducts(productsCopy.filter(product => product.category === 'laptops').slice(0, numOfProducts));
    }
};

export default FilterProducts;