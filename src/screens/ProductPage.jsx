import {useContext, useEffect, useState} from 'react';
import Header from "../components/Header";
import ProductsSection from "../components/ProductsSection";
import {useNavigate, useParams} from "react-router-dom";
import ChosenProductCard from "../components/Cards/ChosenProductCard";
import SpinnerBorder from "../components/Spinners/SpinnerBorder";
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
            {!chosenProduct.id && <div className='d-flex justify-content-center align-items-center residual-height__product-page'><SpinnerBorder/></div>}
            {chosenProduct.id && <ChosenProductCard product={chosenProduct}/>}
            {chosenProduct.id && <ProductsSection numOfProducts={3} category={chosenProduct.category} productsIDsToFilter={chosenProductID}/>}
        </>
    );
};

export default ProductPage;