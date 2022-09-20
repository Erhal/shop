import React, {useEffect, useState} from 'react';

const ProductRating = ({product}) => {
    const [starRating, setStarRating] = useState([]);

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
                for (let i = 1; i <= 4 - Math.trunc(product.rating); i++) {
                    stars.push('bi-star');
                }
            } else {
                for (let i = 1; i <= 5 - Math.trunc(product.rating); i++) {
                    stars.push('bi-star');
                }
            }
        }

        setStarRating(stars);
    }, [product.rating]);

    return (
        <>
            {starRating.map((star, index) => (
                <div key={index} className={star}></div>))}
        </>
    );
};

export default ProductRating;