import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({ page }) => {
    return (
        <div className="row breadcrumbs">
            <Link to="/">Dashboard</Link>&gt; {page}
        </div>
    );
};

export default Breadcrumbs;
