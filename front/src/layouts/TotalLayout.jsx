import React from 'react';
import { Outlet } from 'react-router-dom';
import BaseLayout from './BaseLayout';
import { modalState } from '../states/modalState';
import { useRecoilValue } from 'recoil';
import Modal from '../components/etc/Modal/Modal';
import { simplePwState } from '../states/simplePwState';
import SimplePassword from '../components/organisms/SimplePassword';

const TotalLayout = () => {
    const { show } = useRecoilValue(modalState);
    const simple = useRecoilValue(simplePwState);

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
