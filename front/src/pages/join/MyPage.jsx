import React, { useEffect } from 'react';
import Header from '../../components/molecules/Header';
import MyPage_ from './MyPage.module.css';
import useAuth from '../../hooks/useAuth';
import { useRecoilValue, useRecoilState, useResetRecoilState } from 'recoil';
import useAxios from '../../hooks/useAxios';
import { useNavigate } from 'react-router';

import { userState } from '../../states/userState';
import formatPhoneNumber from '../../mock/phoneNoFormat';
import { modalState } from '../../states/modalState';
import Modal from '../../components/etc/Modal/Modal';
import ResetPassWord from './ResetPassWord';

const MyPage = () => {
    useAuth();
    const user = useRecoilValue(userState);
    const api = useAxios({
        Authorization: `Bearer ${user.accessToken}`,
    });
    const phoneNum = formatPhoneNumber(user.phoneNo);
    const navigate = useNavigate();
    const [modal, setModal] = useRecoilState(modalState);
    const resetModalState = useResetRecoilState(modalState);

    const resetPasswordModal = () => {
        setModal({
            ...modal,
            show: true,
            title: '비밀번호 재설정',
            content: '비밀번호를 재설정 하시겠습니까?',
            confirmHandler: () => {
                navigate('/mypage/resetPassword');
                resetModalState();
            },
            cancel: true,
        });
    };

    const resetSimplePasswordModal = () => {
        setModal({
            ...modal,
            show: true,
            title: '간편비밀번호 재설정',
            content: '간편비밀번호를 재설정 하시겠습니까?',
            confirmHandler: () => {
                navigate('/mypage/resetSimplePassword');
                resetModalState();
            },
            cancel: true,
        });
    };

    return (
        <>
            {user.accessToken && (
                <div>
                    <Header title="마이페이지" isBack={true} />
                    <div className={MyPage_.account_box}>
                        <div className={MyPage_.title}>
                            <h2 className={MyPage_.title_text}>내 프로필</h2>
                        </div>
                        <ul className={MyPage_.account_row}>
                            <div>
                                <img src={`${process.env.PUBLIC_URL}/assets/img/common/email.png`} />
                                <li>{user.emailNo}</li>
                            </div>
                            <div>
                                <img src={`${process.env.PUBLIC_URL}/assets/img/common/user1.png`} />
                                <li>{user.userName}</li>
                            </div>
                            <div>
                                <img src={`${process.env.PUBLIC_URL}/assets/img/common/phoneNo.png`} />
                                <li>{phoneNum}</li>
                            </div>
                        </ul>
                    </div>
                    <div className={MyPage_.account_box}>
                        <div className={MyPage_.title}>
                            <h2 className={MyPage_.title_text}>보안 설정</h2>
                        </div>
                        <ul className={MyPage_.account_row}>
                            <li>
                                <div>
                                    <img src={`${process.env.PUBLIC_URL}/assets/img/common/password.png`} />
                                    <p>비밀번호 재설정</p>
                                </div>
                                <button onClick={() => resetPasswordModal()}>
                                    <span>재설정</span>
                                </button>
                            </li>
                            <li>
                                <div>
                                    <img src={`${process.env.PUBLIC_URL}/assets/img/common/simplepassword.png`} />
                                    <p>간편비밀번호 재설정</p>
                                </div>
                                <button onClick={() => resetSimplePasswordModal()}>
                                    <span>재설정</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            {modal.show && <Modal />}
        </>
    );
};

export default MyPage;
