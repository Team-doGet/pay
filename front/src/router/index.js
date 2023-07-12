import { useRoutes } from 'react-router-dom';
import BaseLayout from '../layouts/BaseLayout';
import ComponentsTest from '../components/ComponentsTest';
import SimplePassword from '../components/organisms/SimplePassword';
import Header from '../components/molecules/Header';

const Router = () => {
    const routes = [
        {
            path: '/components',
            element: [<Header title="컴포넌트 테스트" isBack={true} />, <BaseLayout />],
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
