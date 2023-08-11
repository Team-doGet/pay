import React, { useEffect, useState } from 'react';
import SimplePasswordHeader from '../molecules/simplePw/SimplePasswordHeader';
import SimplePasswordDisplay from '../molecules/simplePw/SimplePasswordDisplay';
import SimplePasswordEnter from '../molecules/simplePw/SimplePasswordEnter';
import useViewHeight from '../../hooks/useViewHeight';
import { useLocation, useNavigate } from 'react-router-dom';
import SimplePasswordContainer from '../molecules/simplePw/SimplePasswordContainer';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { userState } from '../../states/userState';
import { simplePwState } from '../../states/simplePwState';
import { modalState } from '../../states/modalState';
import Modal from '../etc/Modal/Modal';

const SimplePassword = ({ handler, exit }) => {
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
            <SimplePasswordHeader title="간편비밀번호 입력" handler={() => navigate(-1)} exit={exit} />
            <SimplePasswordContainer>
                <SimplePasswordDisplay
                    name={user.userName}
                    email={user.emailNo}
                    phrase="간편비밀번호를 입력해주세요."
                />
                <SimplePasswordEnter handler={handler} />
            </SimplePasswordContainer>
            {modal.show && <Modal />}
        </>
    );
};

export default SimplePassword;
