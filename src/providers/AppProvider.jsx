import React, {useState} from "react";
import AppContext from "./AppContext";
import {toast} from "react-toastify";

const AppProvider = ({children}) => {
    const [products, setProducts] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);
    const [chosenProduct, setChosenProduct] = useState({});

    const notifySuccess = (message) => toast.success(<div className='text-center text-dark'> {message} </div>);
    const notifyWarning = (message) => toast.warn(<div className='text-center text-dark'> {message} </div>);

    const addProduct = async (id, addedQuantity, productTitle) => {
        if (!!cartProducts.find((product) => product.id === id)) {
            let cartProductsCopy = [...cartProducts];
            cartProductsCopy.find((product) => product.id === id).quantity += +addedQuantity;
            setCartProducts(cartProductsCopy);
            notifySuccess(`${productTitle} added to cart`);
        } else {
            let addedProduct = products.find((product) => product.id === id);
            if (!addedProduct) {
                addedProduct = await fetchChosenProduct(id);
            }
            addedProduct.quantity = +addedQuantity || 1;
            setCartProducts(prevState => [...prevState, addedProduct]);
            notifySuccess(`${productTitle} added to cart`);
        }
    }

    const deleteProduct = (id) => {
        setCartProducts(cartProducts.filter((product) => product.id !== id));
    }

    const setProductQuantity = (id, quantity) => {
        if (!!cartProducts.find((product) => product.id === id)) {
            let cartProductsCopy = [...cartProducts];
            cartProductsCopy.find((product) => product.id === id).quantity = +quantity;
            setCartProducts(cartProductsCopy);
        } else {
            let addedProduct = products.find((product) => product.id === id);
            addedProduct.quantity = +quantity;
            setCartProducts(prevState => [...prevState, addedProduct]);
        }
    }

    const getCartProductTotalPrice = (product) => {
        if (product.quantity > product.stock) {
            product.quantity = product.stock;
            notifyWarning(`Only ${product.stock} units of ${product.title} are available`);
        }
        let cartProductTotalPrice = (product.quantity * product.price).toString();
        let separator = ",";
        return cartProductTotalPrice.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + separator);;
    }

    const getTotalPrice = () => {
        let totalPrice = 0;
        let separator = ",";
        cartProducts.forEach((product) => {
            totalPrice += +getCartProductTotalPrice(product).replace(separator, '');
        });
        return totalPrice.toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + separator);;;
    }

    const getTotalQuantity = () => {
        return cartProducts.reduce((acc, product) => acc + +product.quantity, 0);
    }

    const fetchProducts = async (numOfProducts, category, chosenProductID) => {
        try {
            const response = await fetch('https://dummyjson.com/products');
            const data = await response.json();
            const allProducts = data.products;
            const filteredProducts = allProducts.filter(el => {
                if (category === 'all') {
                    return el.category === 'smartphones' || el.category === 'laptops';
                } else {
                    return el.category === category;
                }
            });
            const topProducts = filteredProducts.sort((a, b) => a.rating < b.rating ? 1 : -1)
            if (!chosenProductID) {
                topProducts.forEach((product) => {
                    product.discountPrice = Math.round(product.price - (product.price * product.discountPercentage / 100));
                });
                setProducts(topProducts.splice(0, numOfProducts))
            } else {
                const filteredProducts = topProducts.filter(el => el.id !== chosenProductID);
                filteredProducts.forEach((product) => {
                    product.discountPrice = Math.round(product.price - (product.price * product.discountPercentage / 100));
                });
                setProducts(filteredProducts.splice(0, numOfProducts))
            }
        } catch (e) {
            console.log(e);
        }
    }

    const fetchChosenProduct = async (id) => {
        try {
            const response = await fetch(`https://dummyjson.com/products/${id}`);
            const product = await response.json();
            product.discountPrice = Math.round(product.price - (product.price * product.discountPercentage / 100));
            setChosenProduct(product);
            return product;
        } catch (e) {
            console.log(e);
        }
    }

    const checkIfOutOfStock = (product, addBtnRef) => {
        if (cartProducts.find((cartProduct) => cartProduct.id === product.id)?.quantity === product.stock) {
            addBtnRef.current.classList.add('disabled');
            if(addBtnRef.current.innerHTML !== '<span>+</span>') addBtnRef.current.innerHTML = 'Out of stock';
        } else {
            addBtnRef.current.classList.remove('disabled');
            if(addBtnRef.current.innerHTML !== '<span>+</span>') addBtnRef.current.innerHTML = 'Add to cart';
        }
    }

    const updateInputRef = (inputRef, product) => {
        inputRef.current.value = product.quantity;
        if (inputRef.current.value < 1) {
            deleteProduct(product.id);
        }
    }

    return (
        <AppContext.Provider value={{
            products,
            chosenProduct,
            cartProducts,
            setProducts,
            setChosenProduct,
            fetchProducts,
            fetchChosenProduct,
            addProduct,
            deleteProduct,
            setProductQuantity,
            getCartProductTotalPrice,
            getTotalQuantity,
            getTotalPrice,
            checkIfOutOfStock,
            updateInputRef
        }}>
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;