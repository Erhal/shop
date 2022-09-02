import React from 'react';

const Footer = (props) => {
    return (
        <footer className="py-5 bg-dark">
            <div className="container">
                <p className="m-0 text-center text-white">{props.copyright}</p>
            </div>
        </footer>
    );
};

export default Footer;