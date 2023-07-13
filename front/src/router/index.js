import React from 'react';
import { useRoutes } from 'react-router-dom';
import BaseLayout from '../layouts/BaseLayout';
import ComponentsTest from '../components/ComponentsTest';
import SimplePassword from '../components/organisms/SimplePassword';
import Header from '../components/molecules/Header';
import TotalLayout from '../layouts/TotalLayout';

const Router = () => {
    const routes = [
        {
            path: '',
            element: <TotalLayout isHeader={true} title="컴포넌트 테스트" isBack={false} />,
            children: [
                {
                    path: '',
                    element: <ComponentsTest />,
                },
            ],
        },
        {
            path: '/simple',
            element: <SimplePassword />,
        },
    ];

    return useRoutes(routes);
};

export default Router;
