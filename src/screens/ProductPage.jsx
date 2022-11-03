import Header from "../components/Header";
import ProductsSection from "../components/ProductsSection";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useGetAllProductsQuery} from "../store/api/products";
import ChosenProductCard from "../components/Cards/ChosenProductCard";
import SpinnerBorder from "../components/Spinners/SpinnerBorder";

const ProductPage = () => {

    const {id} = useParams();
    const {isLoading, isSuccess} = useGetAllProductsQuery();
    const {products} = useSelector(state => state.products);
    const [chosenProduct, setChosenProduct] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        setChosenProduct(products.find(product => product.id === +id));
    }, [isSuccess, id])

    return (
        <>
            <Header/>
            {chosenProduct && <ChosenProductCard product={chosenProduct}/>}
            {id && <ProductsSection numOfProducts={3} category={'all'} productsIDsToFilter={[+id]}/>}
        </>
    );
};

export default ProductPage;