import React from 'react';
import { useRoutes } from 'react-router-dom';
import BaseLayout from '../layouts/BaseLayout';
import ComponentsTest from '../components/ComponentsTest';
import SimplePassword from '../components/organisms/SimplePassword';
import Header from '../components/molecules/Header';
import TotalLayout from '../layouts/TotalLayout';
import LoginPage from '../pages/LoginPage';
import JoinInfoPage from '../pages/JoinInfoPage';

const Router = () => {
    const routes = [
        {
            path: '/components',
            element: <TotalLayout />,
            children: [
                {
                    path: '',
                    element: [<Header title="정보입력" isBack={true} />, <ComponentsTest />],
                },
            ],
        },
        {
            path: '/simple',
            element: <SimplePassword />,
        },
        {
            path: '/login',
            element: <TotalLayout />,
            children: [
                {
                    path: '',
                    element: <LoginPage />,
                },
            ],
        },
        {
            path: '/join',
            element: <TotalLayout />,
            children: [
                {
                    path: 'agree',
                    element: <SimplePassword />,
                },
                {
                    path: 'info',
                    element: [<Header title="정보입력" isBack={true} />, <JoinInfoPage />],
                },
            ],
        },
    ];

    return useRoutes(routes);
};

export default Router;
