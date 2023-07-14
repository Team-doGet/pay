import React from 'react';
import { useRoutes } from 'react-router-dom';
import ComponentsTest from '../components/ComponentsTest';
import SimplePassword from '../components/organisms/SimplePassword';
import Header from '../components/molecules/Header';
import TotalLayout from '../layouts/TotalLayout';
import LoginPage from '../pages/LoginPage';
import JoinInfoPage from '../pages/join/JoinInfoPage';
import JoinSuccessPage from '../pages/join/JoinSuccessPage';
import ResultPage from '../pages/result/ResultPage';
import ErrorPage from '../pages/ErrorPage';

const Router = () => {
    const routes = [
        {
            path: '/',
            element: <TotalLayout />,
            children: [
                {
                    path: '',
                    element: [<Header title="컴포넌트 테스트" isBack={true} />, <ComponentsTest />],
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
                {
                    path: 'success',
                    element: [<Header title="회원가입 완료" isBack={true} />, <JoinSuccessPage />],
                },
            ],
        },
        {
            path: '/result',
            element: <TotalLayout />,
            children: [
                {
                    path: '',
                    element: [<ResultPage />],
                },
            ],
        },
        {
            path: '/error',
            element: <TotalLayout />,
            children: [
                {
                    path: '',
                    element: [<Header title="에러" isBack={false} />, <ErrorPage />],
                },
            ],
        },
    ];

    return useRoutes(routes);
};

export default Router;
