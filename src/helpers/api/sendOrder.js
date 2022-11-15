import showNotifySuccess from "../notify/showNotifySuccess";
import showNotifyWarning from "../notify/showNotifyWarning";

const sendOrder = async (formData, cart) => {
    let body = {
        'City': formData.city,
        'Address': formData.address,
        'Phone': formData.phone,
        'Email': formData.email,
        'Name': formData.name,
        'Products': cart.products.map(product => {
            return {
                'Id': product.id,
                'Title': product.title,
                'Quantity': product.quantity
            }
        }),
        'totalQuantity': cart.totalQuantity,
        'totalPrice': cart.totalPrice.replace(/\D/g, ''),
    };
    try {
        const response = await fetch('https://parseapi.back4app.com/classes/Orders', {
            method: 'POST',
            headers: {
                'X-Parse-Application-Id': '9YBHm9Sgf1WylMCHD0pkiRn6ONZ8DnE7T8SaLINS',
                'X-Parse-REST-API-Key': '96l6lHybz7jgbDwYSqXXuOtSC62AeP86YeT75B55',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const data = await response.json();

        if (data.error) {
            console.log(data);
            showNotifyWarning('Oops! Something went wrong. Please try again later.')
            return 'error';
        } else {
            await navigator.clipboard.writeText(data.objectId)
            showNotifySuccess('Order number copied to clipboard')
            return data.objectId;
        }
    } catch (error) {
        console.log(error);
    }
}

export default sendOrder