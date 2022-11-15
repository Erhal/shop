import {FC} from "react";

import Header from "../components/Header";
import ProductsSection from "../components/ProductsSection";

const Laptops: FC = () => {
    return (
        <>
            <Header title={'Laptops'}/>
            <ProductsSection numOfProducts={Infinity} category={'laptops'}/>
        </>
    );
};

export default Laptops;