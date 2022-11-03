import ProductCard from "../Cards/ProductCard";
import SpinnerBorder from "../Spinners/SpinnerBorder";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import filterProducts from "../../helpers/filterProducts";
import {useGetAllProductsQuery} from "../../store/api/products";

const ProductsSection = ({numOfProducts, category, productsIDsToFilter}) => {

    const {isLoading, isSuccess} = useGetAllProductsQuery();
    const {products} = useSelector(state => state.products);

    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        filterProducts(products, numOfProducts, category, productsIDsToFilter, setFilteredProducts);
    }, [products, productsIDsToFilter]);

    // useEffect(() => {
    //     setProducts([]); TODO: проверить это на странице продукта, было необходимо для красивого обновления страницы
    //     fetchProducts(numOfProducts, category, productsIDsToFilter); TODO: фетч больше не нужен, но здесь есть фильтр для страницы продукта
    // }, [numOfProducts, category, productsIDsToFilter]);

    return (
        <section className="py-5">
            <div className="container px-4 px-lg-5">
                {isLoading && <SpinnerBorder/>}
                {isSuccess &&
                    <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                        {isSuccess && filteredProducts.map(product => <ProductCard product={product} key={`productCard-${product.id}`}/>)}
                    </div>
                }
            </div>
        </section>
    );
};

export default ProductsSection;