import React from 'react';
import { Outlet } from 'react-router-dom';
import BaseLayout from './BaseLayout';
import Header from '../components/molecules/Header';

const TotalLayout = ({ isHeader, title, isBack, targetUrl }) => {
    return (
        <>
            {isHeader && <Header title={title} isBack={isBack} targetUrl={targetUrl && targetUrl} />}
            <BaseLayout>
                <Outlet />
            </BaseLayout>
        </>
    );
};

export default TotalLayout;
