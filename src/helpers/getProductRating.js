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

export default getProductRating;