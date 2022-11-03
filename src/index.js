import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import {BrowserRouter as Router} from "react-router-dom";

import store from "./store";
import {Provider} from "react-redux";

import ScrollToTop from "./helpers/ScrollToTop";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <Provider store={store}>
                <ScrollToTop>
                    <App/>
                </ScrollToTop>
            </Provider>
        </Router>
    </React.StrictMode>
);