import {Route, Routes} from "react-router-dom";
import {ToastContainer} from 'react-toastify';

import Layout from "./components/Layout";
import Home from "./screens/Home";
import routes from "./routes";

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.scss';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    {routes.map(({path, Screen}) => <Route key={path} path={path} element={<Screen/>}/>)}
                </Route>
            </Routes>

            <div>
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
            </div>
        </>
    );
}

export default App;