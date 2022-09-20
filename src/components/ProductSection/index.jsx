import React, {useEffect, useState} from 'react';
import ProductCard from "../ProductCard";

const ProductSection = ({numOfProducts, category}) => {
    const [products, setProducts] = useState([]);

    useEffect( () => {
        if (products.length === 0) {
            fetch('https://dummyjson.com/products/')
                .then(response => response.json())
                .then(data => data.products)
                .then(allProducts => allProducts.filter(el => {
                    if (category === 'all') {
                        return el.category === 'smartphones' || el.category === 'laptops'
                    } else {
                        return el.category === category
                    }
                }))
                .then(filteredProducts => filteredProducts.sort((a, b) => a.rating < b.rating ? 1 : -1).splice(0, numOfProducts))
                .then(topProducts => setProducts(topProducts));
        }
    }, [products, numOfProducts, category]);
    return (
        <section className="py-5">
            <div className="container px-4 px-lg-5 mt-5">
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    {products.length !== 0 ? products.map(product => <ProductCard product={product} key={product.id}/>) :
                        <div className="d-flex justify-content-center mb-5">
                            <div className="spinner-border" role="status" style={{width: '3rem', height: '3rem'}}>
                                <span className="sr-only"></span>
                            </div>
                        </div>}
                </div>
            </div>
        </section>
    );
};

export default ProductSection;