import React, {useEffect, useState} from 'react';
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import ProductsSection from "../components/ProductsSection";
import Footer from "../components/Footer";
import {useParams} from "react-router-dom";
import ChosenProductCard from "../components/ChosenProductCard";

const ProductPage = () => {
    const [chosenProduct, setChosenProduct] = useState({});
    const params = useParams();

    useEffect(() => {
        setChosenProduct({})
        fetch(`https://dummyjson.com/products/${params.id}`)
            .then(response => response.json())
            .then(data => setChosenProduct(data))
    }, [params]);

    return (
        <>
            <Navbar/>
            <Header title={'Product Page'}/>
            {chosenProduct.id && <ChosenProductCard product={chosenProduct}/>}
            <ProductsSection numOfProducts={3} category={chosenProduct.category} chosenProductID={chosenProduct.id}/>
            <Footer copyright={'Copyright © 2022'}/>
        </>
    );
};

export default ProductPage;