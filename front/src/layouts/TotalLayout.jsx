import React from 'react';
import { Outlet } from 'react-router-dom';
import BaseLayout from './BaseLayout';
import { modalState } from '../states/modalState';
import { useRecoilValue } from 'recoil';
import Modal from '../components/etc/Modal/Modal';

const TotalLayout = () => {
    const { show } = useRecoilValue(modalState);

    return (
        <>
            <BaseLayout>
                <Outlet />
            </BaseLayout>

            {show && <Modal />}
        </>
    );
};

export default TotalLayout;
