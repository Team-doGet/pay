import React from 'react';
import { useNavigate } from 'react-router-dom';
import appHeader from './AppHeader.module.css';

const AppHeader = ({ title, isBack, targetUrl = -1 }) => {
    const navigate = useNavigate();

    return (
        <div className={appHeader.titleHeader}>
            {isBack && (
                <img
                    className={appHeader.historyBackImg}
                    onClick={() => navigate(targetUrl, { replace: true })}
                    src="/assets/img/common/backBtn.svg"
                    alt=""
                />
            )}
            <span className={appHeader.titleText}>{title}</span>
        </div>
    );
};

export default AppHeader;
