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
import JoinAgreePage from '../pages/join/JoinAgreePage';
import ChargePage from '../pages/pay/ChargePage';
import WithdrawPage from '../pages/pay/WithdrawPage';
import PayPage from '../pages/pay/PayPage';
import TransferPage from '../pages/pay/TransferPage';
import CollectPage from '../pages/pay/CollectPage';
import AccountAddAgreePage from '../pages/account/AccountAddAgreePage';
import AccountAddInfoPage from '../pages/account/AccountAddInfoPage';
import AccountAddAuthPage from '../pages/account/AccountAddAuthPage';

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
                    element: [<Header title="약관 동의" isBack={true} />, <JoinAgreePage />],
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
            path: '/pay',
            element: <TotalLayout />,
            children: [
                {
                    path: 'charge',
                    element: [<Header title="충전하기" isBack={true} />, <ChargePage />],
                },
                {
                    path: 'withdraw',
                    element: [<Header title="인출하기" isBack={true} />, <WithdrawPage />],
                },
                {
                    path: 'pay',
                    element: [<Header title="결제" isBack={true} targetUrl={'/'} />, <PayPage />],
                },
                {
                    path: 'transfer',
                    element: [<Header title="송금" isBack={true} targetUrl={'/'} />, <TransferPage />],
                },
                {
                    path: 'collect',
                    element: [<Header title="수금" isBack={true} />, <CollectPage />],
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
        {
            path: '/account',
            element: <TotalLayout />,
            children: [
                {
                    path: 'add/agree',
                    element: [<Header title="약관 동의" isBack={true} />, <AccountAddAgreePage />],
                },
                {
                    path: 'add/info',
                    element: [<Header title="간편결제 계좌 연결" isBack={true} />, <AccountAddInfoPage />],
                },
                {
                    path: 'add/auth',
                    element: [<Header title="계좌로 본인 인증" isBack={false} />, <AccountAddAuthPage />],
                },
            ],
        },
    ];

    return useRoutes(routes);
};

export default Router;
