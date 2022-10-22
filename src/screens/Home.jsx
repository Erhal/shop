import Header from "../components/Header";
import ProductsSection from "../components/ProductsSection";

const Home = () => {
    return (
        <>
            {/*TODO: добавить рекламный POPUP*/}
            <Header title={'Shop in Style'}/>
            <ProductsSection numOfProducts={9} category={'all'}/>
        </>
    );
};

export default Home;