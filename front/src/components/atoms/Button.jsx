import React from 'react';
import button from './Button.module.css';

const Button = ({ children, width, type, handler }) => {
    return (
        <div className={`${button.wrapper} ${button[`${width}`]}`}>
            <button className={`${button.button} ${button[`${type}`]}`} onClick={handler}>
                <span>{children}</span>
            </button>
        </div>
    );
};

export default Button;
