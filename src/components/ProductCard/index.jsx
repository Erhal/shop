import React, {useEffect, useState} from 'react';

const ProductCard = ({product}) => {
    const [starRating, setStarRating] = useState([]);
    const getDiscount = () => {
        return Math.round(product.price - (product.price * product.discountPercentage / 100));
    }

    useEffect(() => {
        const stars = [];
        if (product.rating === 5) {
            for (let i = 0; i < product.rating; i++) {
                stars.push('bi-star-fill');
            }
        } else {
            for (let i = 1; i <= Math.trunc(product.rating); i++) {
                stars.push('bi-star-fill');
            }
            if (product.rating.toFixed(1) - Math.trunc(product.rating) >= 0.5) {
                stars.push('bi-star-half');
                for(let i = 1; i <= 4 - Math.trunc(product.rating); i++) {
                    stars.push('bi-star');
                }
            } else {
                for(let i = 1; i <= 5 - Math.trunc(product.rating); i++) {
                    stars.push('bi-star');
                }
            }
        }

        setStarRating(stars);
    }, [product.rating]);

    return (
        <div className="col mb-5">
            <div className="card h-100 p-1">
                <img
                    className="card-img-top"
                    style={{height: 180, maxWidth: 270, objectFit: "contain"}}
                    src={product.images[0]}
                    alt={product.title}
                />
                <div className="card-body p-4">
                    <div className="text-center">
                        <h5 className="fw-bolder product-name">{product.title}</h5>
                        <div className="mb-2">
                            <div className="d-flex justify-content-center small text-warning">

                                {starRating.map((star, index) => (
                                    <div key={index} className={star}></div>))}

                            </div>
                        </div>
                        <span className="discount-price">${getDiscount()}</span>{" "}
                        <span className="price"><s>${product.price}</s></span>
                    </div>
                </div>
                <div className="card-footer text-center p-4 pt-0 border-top-0 bg-transparent">
                    <button className="btn btn-outline-dark mt-auto">
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;