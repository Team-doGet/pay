import React, { useEffect, useState } from 'react';
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

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { loadingState } from '../../states/loadingState';

const MyPage = () => {
    useAuth();
    const [user, setUser] = useRecoilState(userState);
    const api = useAxios({
        Authorization: `Bearer ${user.accessToken}`,
    });
    const phoneNum = formatPhoneNumber(user.phoneNo);
    const navigate = useNavigate();
    const [modal, setModal] = useRecoilState(modalState);
    const resetModalState = useResetRecoilState(modalState);
    const [loading, setLoading] = useRecoilState(loadingState);

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

    const fdsHandler = async () => {
        setLoading({ ...loading, show: true });

        if (user.fds) {
            const res = await api.post(`/totp/stop`, {
                userId: user.userId,
            });

            if (res.data.status === 200) {
                setLoading({ ...loading, show: false });

                setModal({
                    show: true,
                    title: 'FDS',
                    content: 'FDS 사용이 해지되었습니다..',
                    confirmHandler: () => {
                        setUser({
                            ...user,
                            fds: false,
                        });
                        navigate('/', { replace: true });
                        resetModalState();
                    },
                    cancel: false,
                });
            } else {
                setLoading({ ...loading, show: false });

                setModal({
                    show: true,
                    title: 'FDS',
                    content: '에러 발생. 관리자에게 문의하세요.',
                    confirmHandler: () => {
                        resetModalState();
                    },
                    cancel: false,
                });
            }

            setUser({
                ...user,
                fds: false,
            });
        } else {
            const res = await api.post(`/totp/update`, {
                emailNo: user.emailNo,
                userId: user.userId,
            });

            if (res.data.status === 200) {
                setLoading({ ...loading, show: false });
                setModal({
                    show: true,
                    title: 'FDS',
                    content: '이메일로 보내드린 바코드로 2FA 등록을 해주세요.',
                    confirmHandler: () => {
                        setUser({
                            ...user,
                            fds: true,
                        });
                        navigate('/', { replace: true });
                        resetModalState();
                    },
                    cancel: false,
                });
            } else {
                setLoading({ ...loading, show: false });

                setModal({
                    show: true,
                    title: 'FDS',
                    content: '에러 발생. 관리자에게 문의하세요.',
                    confirmHandler: () => {
                        resetModalState();
                    },
                    cancel: false,
                });
            }
        }
    };

    return (
        <>
            {user.accessToken && (
                <div
                    style={{
                        marginLeft: '.75rem',
                        marginRight: '.75rem',
                    }}
                >
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
                            <li className={MyPage_.fdsContainer}>
                                <div>
                                    <img src={`${process.env.PUBLIC_URL}/assets/img/common/simplepassword.png`} />
                                    <p>FDS 사용 여부</p>
                                </div>
                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        defaultValue={user.fds}
                                        onChange={() => fdsHandler()}
                                    >
                                        <FormControlLabel value={true} control={<Radio />} label="사용" />
                                        <FormControlLabel value={false} control={<Radio />} label="미사용" />
                                    </RadioGroup>
                                </FormControl>
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
