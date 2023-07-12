import React from 'react';
import Con_ from './SimplePasswordContainer.module.css';

const SimplePasswordContainer = ({ children }) => {
    return (
        <div className={Con_.container}>
            <div className={Con_.wrapper}>{children}</div>
        </div>
    );
};

export default SimplePasswordContainer;
