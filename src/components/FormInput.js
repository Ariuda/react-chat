import React from 'react';
import { useState } from 'react';

const FormInput = ({ label, type, value, name, onChange, touched }) => {
    const [active, setActive] = useState(touched);
    return (
        <div className="column input-wrapper">
            <input
                type={type}
                value={value}
                name={name}
                onChange={(e) => onChange(e.target.value, name)}
                onClick={(e) => setActive('touched')}
            />
            <label className={active}>{label}</label>
        </div>
    );
};

export default FormInput;
