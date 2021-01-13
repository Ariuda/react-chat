import React from 'react';

const Button = ({ text, id }) => {
    return (
        <div className="button-container">
            <button id={id}>{text}</button>
        </div>
    );
};

export default Button;
