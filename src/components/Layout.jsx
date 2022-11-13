import Navbar from "./Navbar";
import {Outlet} from "react-router-dom";
import Footer from "./Footer";

import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
    return (
        <>
            <Navbar/>
                <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    style={{marginTop: '60px'}}
                />

                <Outlet/>
            <Footer/>
        </>
    );
};

export default Layout;