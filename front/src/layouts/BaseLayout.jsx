import { useEffect } from 'react';
import Base from './BaseLayout.module.css';
import useViewHeight from '../hooks/useViewHeight';
import { Outlet } from 'react-router-dom';

const BaseLayout = () => {
    useViewHeight();

    return (
        <div className={Base.container}>
            <div className={Base.wrapper}>
                <div className={Base.contents}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default BaseLayout;
