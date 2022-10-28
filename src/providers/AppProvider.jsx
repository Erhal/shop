import {useState} from "react";
import AppContext from "./AppContext";
import {toast} from "react-toastify";

const AppProvider = ({children}) => {


    /* STATES */

    const [products, setProducts] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);
    const [chosenProduct, setChosenProduct] = useState({});


    /* NOTIFICATIONS */

    const notifySuccess = (message) => toast.success(<div className='text-center text-dark'> {message} </div>);
    const notifyWarning = (message) => toast.warn(<div className='text-center text-dark'> {message} </div>);


    /* FETCHES */

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
            if (chosenProductID) {
                const filteredProducts = topProducts.filter(el => el.id !== chosenProductID);
                filteredProducts.forEach((product) => {
                    product.discountPrice = getDiscountPrice(product);
                });
                setProducts(filteredProducts.splice(0, numOfProducts))
            } else {
                topProducts.forEach((product) => {
                    product.discountPrice = getDiscountPrice(product);
                });
                setProducts(topProducts.splice(0, numOfProducts))
            }
        } catch (e) {
            console.log(e);
        }
    }

    const fetchChosenProduct = async (id) => {
        try {
            const response = await fetch(`https://dummyjson.com/products/${id}`);
            const product = await response.json();
            product.discountPrice = getDiscountPrice(product);
            setChosenProduct(product);
            return product;
        } catch (e) {
            console.log(e);
        }
    }


    /* CART FUNCTIONALITY */

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

    const deleteProduct = (id) => setCartProducts(cartProducts.filter((product) => product.id !== id));

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
        return cartProductTotalPrice.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + separator);
    }

    const getTotalPrice = () => {
        let totalPrice = 0;
        let separator = ",";
        cartProducts.forEach((product) => {
            totalPrice += +getCartProductTotalPrice(product).replace(separator, '');
        });
        return totalPrice.toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + separator);
    }

    const getDiscountPrice = (product) => Math.round(product.price - (product.price * product.discountPercentage / 100));

    const getCartProductsQuantity = () => cartProducts.reduce((acc, product) => acc + +product.quantity, 0);

    const getProductRating = (rating) => {
        let stars = [];
        if (rating === 5) {
            for (let i = 0; i < rating; i++) {
                stars.push('bi-star-fill');
            }
        } else {
            for (let i = 1; i <= Math.trunc(rating); i++) {
                stars.push('bi-star-fill');
            }
            if (rating.toFixed(1) - Math.trunc(rating) >= 0.5) {
                stars.push('bi-star-half');
                for (let i = 1; i <= 4 - Math.trunc(rating); i++) {
                    stars.push('bi-star');
                }
            } else {
                for (let i = 1; i <= 5 - Math.trunc(rating); i++) {
                    stars.push('bi-star');
                }
            }
        }
        return stars.map((star, index) => <div key={index} className={star}></div>);
    };

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
            getCartProductsQuantity,
            getProductRating,
            getTotalPrice,
            checkIfOutOfStock,
            updateInputRef
        }}>
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;