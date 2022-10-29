import {useContext, useEffect, useState} from 'react';
import Header from "../components/Header";
import ProductsSection from "../components/ProductsSection";
import {useNavigate, useParams} from "react-router-dom";
import ChosenProductCard from "../components/Cards/ChosenProductCard";
import AppContext from "../providers/AppContext";

const ProductPage = () => {

    const [chosenProductID, setChosenProductID] = useState([null]);
    const params = useParams();
    const {chosenProduct, setChosenProduct, fetchChosenProduct} = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        setChosenProduct({})
        setChosenProductID([+params.id]);
        fetchChosenProduct(params.id);
    }, [params]);

    useEffect(() => {
        if (chosenProduct.message === `Product with id '${params.id}' not found`) navigate('/error');
    }, [chosenProduct]);

    return (
        <>
            <Header/>
            {chosenProduct.id && <ChosenProductCard product={chosenProduct}/>}
            <ProductsSection numOfProducts={3} category={chosenProduct.category} productsIDsToFilter={chosenProductID}/>
        </>
    );
};

export default ProductPage;