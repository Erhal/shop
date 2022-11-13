import {useParams} from "react-router-dom";
import Header from "../components/Header";
import ProductsSection from "../components/ProductsSection";
import ChosenProductCard from "../components/Cards/ChosenProductCard";
import SpinnerBorder from "../components/Spinners/SpinnerBorder";
import {useGetChosenProductQuery} from "../store/api/products";

const ProductPage = () => {
    const { id } = useParams();
    const { data:chosenProduct, isFetching } = useGetChosenProductQuery(id, {refetchOnMountOrArgChange: true});

    return (
        <>
            <Header/>
            { isFetching && <div className='d-flex justify-content-center align-items-center residual-height-product-page'><SpinnerBorder/></div> }
            { !isFetching && <ChosenProductCard product={chosenProduct}/> }
            { !isFetching && <ProductsSection id={id} numOfProducts={3} category={chosenProduct.category} productsIDsToFilter={[chosenProduct.id]}/> }
        </>
    );
};

export default ProductPage;