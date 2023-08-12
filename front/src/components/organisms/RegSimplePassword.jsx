import React, { useEffect, useState } from 'react';
import SimplePasswordDisplay from '../molecules/simplePw/SimplePasswordDisplay';
import useViewHeight from '../../hooks/useViewHeight';
import { useLocation, useNavigate } from 'react-router-dom';
import SimplePasswordContainer from '../molecules/simplePw/SimplePasswordContainer';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { userState } from '../../states/userState';
import { simplePwState } from '../../states/simplePwState';
import { modalState } from '../../states/modalState';
import Modal from '../etc/Modal/Modal';
import RegSimplePasswordHeader from '../molecules/simplePw/RegSimplePasswordHeader';
import RegSimplePasswordEnter from '../molecules/simplePw/RegSimplePasswordEnter';

const RegSimplePassword = ({ title, handler, exit }) => {
    useViewHeight();
    const navigate = useNavigate();
    const location = useLocation();
    const user = useRecoilValue(userState);
    const [simplePw, setSimplePw] = useRecoilState(simplePwState);
    const [modal, setModal] = useRecoilState(modalState);
    const resetModal = useResetRecoilState(modalState);
    const resetPasswords = useResetRecoilState(simplePwState);

    useEffect(() => {
        return () => {
            resetPasswords();
        };
    }, []);

    return (
        <>
            <RegSimplePasswordHeader title={title} exit={exit} />
            <SimplePasswordContainer>
                <SimplePasswordDisplay
                    name={user.userName}
                    email={user.emailNo}
                    phrase="등록할 간편비밀번호를 입력해주세요."
                />
                <RegSimplePasswordEnter handler={exit} />
            </SimplePasswordContainer>
            {modal.show && <Modal />}
        </>
    );
};

export default RegSimplePassword;
