import {FC} from "react";

import {useParams} from "react-router-dom";

import {useGetChosenProductQuery} from "../store/api/products";
import {useAppSelector} from "../store/hooks";

import Header from "../components/Header";
import ProductsSection from "../components/ProductsSection";
import ChosenProductCard from "../components/Cards/ChosenProductCard";
import SpinnerBorder from "../components/Spinners/SpinnerBorder";

const ProductPage: FC = () => {
    const { id } = useParams<string>();
    const { isFetching } = useGetChosenProductQuery(id, {refetchOnMountOrArgChange: true});
    const { chosenProduct } = useAppSelector(state => state.products);

    return (
        <>
            <Header title={false}/>
            { isFetching && <div className='d-flex justify-content-center align-items-center residual-height-product-page'><SpinnerBorder/></div> }
            { !isFetching && <ChosenProductCard product={chosenProduct}/> }
            { !isFetching && <ProductsSection numOfProducts={3} category={chosenProduct.category} productsIDsToFilter={[chosenProduct?.id]}/> }
        </>
    );
};

export default ProductPage;