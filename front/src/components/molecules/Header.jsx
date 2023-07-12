import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header_ from './Header.module.css';

const Header = ({ title, isBack, targetUrl = -1 }) => {
    const navigate = useNavigate();

    return (
        <div className={Header_.wrapper}>
            {isBack && (
                <img
                    className={Header_.button}
                    onClick={() => navigate(targetUrl, { replace: true })}
                    src="/assets/img/common/backBtn.svg"
                    alt=""
                />
            )}
            <span className={Header_.text}>{title}</span>
        </div>
    );
};

export default Header;
