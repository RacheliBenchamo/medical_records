import React from 'react';
import { Link } from 'react-router-dom';

function NoPage() {
    return (
        <div className="container no-page-container">
            <h2>No Page Found</h2>
            <Link to="/" className="button">
                Back to Home Page
            </Link>
        </div>
    );
}

export default NoPage;
