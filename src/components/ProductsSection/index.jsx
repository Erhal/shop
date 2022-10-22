import {useContext, useEffect} from 'react';
import AppContext from "../../providers/AppContext";
import ProductCard from "../Cards/ProductCard";
import SpinnerBorder from "../Spinners/SpinnerBorder";

const ProductsSection = ({numOfProducts, category, chosenProductID}) => {

    const {products, setProducts, fetchProducts} = useContext(AppContext);

    useEffect(() => {
        setProducts([]);
        fetchProducts(numOfProducts, category, chosenProductID);
    }, [numOfProducts, category, chosenProductID]);

    return (
        <section className="py-5">
            <div className="container px-4 px-lg-5 mt-5">
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">

                    {!products.length && <div className='mb-5'><SpinnerBorder/></div>}
                    {!!products.length && products.map(product => <ProductCard product={product} key={product.id}/>)}

                </div>
            </div>
        </section>
    );
};

export default ProductsSection;