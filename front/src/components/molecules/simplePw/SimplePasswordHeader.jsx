import React from 'react';
import PwHeader from './SimplePasswordHeader.module.css';
import { useNavigate } from 'react-router-dom';

const SimplePasswordHeader = ({ title }) => {
    const navigate = useNavigate();

    return (
        <div className={PwHeader.header}>
            <img
                className={PwHeader.button}
                onClick={() => navigate(-1, { replace: true })}
                src="/assets/img/common/backBtn.svg"
                alt=""
            />
            <span className={PwHeader.text}>{title}</span>
        </div>
    );
};

export default SimplePasswordHeader;
