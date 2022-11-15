import {FC} from "react";

import Header from "../components/Header";
import ProductsSection from "../components/ProductsSection";

const Smartphones: FC = () => {
    return (
        <>
            <Header title={'Smartphones'}/>
            <ProductsSection numOfProducts={Infinity} category={'smartphones'}/>
        </>
    );
};

export default Smartphones;