import {FC} from "react";

import Header from "../components/Header";
import ProductsSection from "../components/ProductsSection";

const Home: FC = () => {
    return (
        <>
            <Header title={'Shop in Style'}/>
            <ProductsSection numOfProducts={9} category={'all'}/>
        </>
    );
};

export default Home;