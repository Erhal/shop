import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom";
import AppProvider from "./providers/AppProvider";
import ScrollToTop from "./helpers/ScrollToTop";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AppProvider>
            <Router>
                <ScrollToTop>
                    <App/>
                </ScrollToTop>
            </Router>
        </AppProvider>
    </React.StrictMode>
);