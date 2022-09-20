import React from 'react';

const Footer = ({copyright}) => {
    return (
        <footer className="py-5 bg-dark">
            <div className="container">
                <p className="m-0 text-center text-white">{copyright}</p>
            </div>
        </footer>
    );
};

export default Footer;