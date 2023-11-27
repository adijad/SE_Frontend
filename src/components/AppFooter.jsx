// AppFooter.jsx

import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './AppHeader.css';

const AppFooter = () => {
    return (
        <footer className="bd-footer py-3">
            <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">About Us</a></li>
                <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Help</a></li>
            </ul>
            <p className="text-center text-muted">Copyright &copy; EventEase</p>
        </footer>
    );
};

export default AppFooter;
