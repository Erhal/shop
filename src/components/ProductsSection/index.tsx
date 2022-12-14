import {FC, useEffect, useState} from "react";
import {IProductsSectionProps} from "./_types";
import {IProduct} from "../../store/_types";

import {useGetAllProductsQuery} from "../../store/api/products";
import {useAppSelector} from "../../store/hooks";

import {getFilteredProducts} from "../../helpers";

import ProductCard from "../Cards/ProductCard";
import SpinnerBorder from "../Spinners/SpinnerBorder";

const ProductsSection: FC<IProductsSectionProps> = ({numOfProducts, category, productsIDsToFilter}) => {

    const {isFetching, isError} = useGetAllProductsQuery(category, {refetchOnMountOrArgChange: true});
    const {products} = useAppSelector(state => state.products);

    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        setFilteredProducts(getFilteredProducts(products, numOfProducts, productsIDsToFilter));
    }, [products, productsIDsToFilter]);


    return (
        <>
            {(isFetching || isError) &&
                <div className='d-flex justify-content-center align-items-center residual-height'><SpinnerBorder/>
                </div>}
            {!isFetching &&
                <section className="py-5">
                    <div className="container px-4 px-lg-5">
                        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                            {filteredProducts.map(product => <ProductCard product={product}
                                                                          key={`productCard-${product.id}`}/>)}
                        </div>
                    </div>
                </section>
            }
        </>
    );
};

export default ProductsSection;