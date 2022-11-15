import {FC} from "react";

import Header from "../components/Header";
import ProductsSection from "../components/ProductsSection";

const AllProducts: FC = () => {
    return (
        <>
            <Header title={'All Products'}/>
            <ProductsSection numOfProducts={Infinity} category={'all'}/>
        </>
    );
};

export default AllProducts;