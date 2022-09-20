import React, {useEffect, useState} from 'react';
import ProductCard from "../ProductCard";
import SpinnerBorder from "../Spinners/SpinnerBorder";

const ProductsSection = ({numOfProducts, category, chosenProductID}) => {
    const [products, setProducts] = useState([]);

    useEffect( () => {
        setProducts([]);
            fetch('https://dummyjson.com/products')
                .then(response => response.json())
                .then(data => data.products)
                .then(allProducts => allProducts.filter(el => {
                    if (category === 'all') {
                        return el.category === 'smartphones' || el.category === 'laptops'
                    } else {
                        return el.category === category
                    }
                }))
                .then(filteredProducts => filteredProducts.sort((a, b) => a.rating < b.rating ? 1 : -1))
                .then(topProducts => {
                    if (!chosenProductID) {
                        setProducts(topProducts.splice(0, numOfProducts))
                    } else {
                        const filteredProducts = topProducts.filter(el => el.id !== chosenProductID);
                        setProducts(filteredProducts.splice(0, numOfProducts))
                    }
                });
    }, [numOfProducts, category, chosenProductID]);

    return (
        <section className="py-5">
            <div className="container px-4 px-lg-5 mt-5">
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">

                    {products.length !== 0 ? products.map(product => <ProductCard product={product} key={product.id}/>) :
                        <div className='mb-5'><SpinnerBorder/></div>}

                </div>
            </div>
        </section>
    );
};

export default ProductsSection;