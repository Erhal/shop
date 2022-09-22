import React, {useContext, useEffect} from 'react';
import Header from "../components/Header";
import ProductsSection from "../components/ProductsSection";
import {useParams} from "react-router-dom";
import ChosenProductCard from "../components/Cards/ChosenProductCard";
import AppContext from "../providers/AppContext";

const ProductPage = () => {
    const params = useParams();
    const {chosenProduct, setChosenProduct, fetchChosenProduct} = useContext(AppContext);

    useEffect(() => {
        setChosenProduct({})
        fetchChosenProduct(params.id);
    }, [params]);

    return (
        <>
            <Header title={'Product Page'}/>
            {chosenProduct.id && <ChosenProductCard product={chosenProduct}/>}
            <ProductsSection numOfProducts={3} category={chosenProduct.category} chosenProductID={chosenProduct.id}/>
        </>
    );
};

export default ProductPage;