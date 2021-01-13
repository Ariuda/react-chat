import React from 'react';

const Checkbox = ({ title, defaultValue, name, values, onChange }) => {
    const renderCheckboxes = () => {
        return values.map((value) => {
            return (
                <div key={value.name}>
                    <input
                        type="radio"
                        value={value.value}
                        name={name}
                        onChange={(e) => onChange(value.value, name)}
                        defaultChecked={value.value === defaultValue ? true : false}
                    />
                    <label htmlFor={value.name}>
                        <span>{value.text}</span>
                    </label>
                </div>
            );
        });
    };

    const renderCheckboxContainer = () => {
        return (
            <div className="radio-btn-container column">
                <h3>{title}</h3>
                <div className="radio-btn-wrapper">{renderCheckboxes()}</div>
            </div>
        );
    };

    return <div>{renderCheckboxContainer()}</div>;
};

export default Checkbox;
