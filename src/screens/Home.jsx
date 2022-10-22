import Header from "../components/Header";
import ProductsSection from "../components/ProductsSection";

const Home = () => {
    return (
        <>
            <Header title={'Shop in Style'}/>
            <ProductsSection numOfProducts={9} category={'all'}/>
        </>
    );
};

export default Home;