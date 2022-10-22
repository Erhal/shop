import * as Screens from '../screens';

const routes = [
    {
        path: '/all-products',
        Screen: Screens.AllProducts
    },
    {
        path: '/smartphones',
        Screen: Screens.Smartphones
    },
    {
        path: '/laptops',
        Screen: Screens.Laptops
    },
    {
        path: '/product/:id',
        Screen: Screens.ProductPage
    },
    {
        path: '*',
        Screen: Screens.Page404
    }
    ]

export default routes