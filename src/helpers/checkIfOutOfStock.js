const checkIfOutOfStock = ( cart, product, addBtnRef, inputRef ) => {
    if (cart.products.find((cartProduct) => cartProduct.id === product.id)?.quantity === product.stock) {
        addBtnRef.current.classList.add('disabled');
        inputRef?.current.classList.add('disabled');
        if(addBtnRef.current.innerHTML !== '<span>+</span>') addBtnRef.current.innerHTML = 'Out of stock';
    } else {
        addBtnRef.current.classList.remove('disabled');
        inputRef?.current.classList.remove('disabled');
        if(addBtnRef.current.innerHTML !== '<span>+</span>') addBtnRef.current.innerHTML = 'Add to cart';
    }
}

export default checkIfOutOfStock;