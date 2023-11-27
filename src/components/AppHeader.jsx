import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './AppHeader.css';

const AppHeader = () => {
    const navigate = useNavigate();

    const navigateToResponses = () => navigate('/responses');
    const handleLogout = () => {
        // Perform logout operations here
        // Example: localStorage.removeItem('authToken');
        navigate('/login');
    };

    return (
        <header>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <Link to="/home" className="navbar-brand">EventEase</Link>
                    <div className="d-flex">
                        {/* Button for Responses tab with onClick handler */}
                        <button onClick={navigateToResponses} className="btn btn-outline-primary me-2">
                            Responses
                        </button>
                        {/* Button for LogOut with onClick handler */}
                        <button onClick={handleLogout} className="btn btn-outline-secondary">
                            LogOut
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default AppHeader;
