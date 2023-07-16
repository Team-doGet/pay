import React from 'react';
import AccountConfig_ from './AccountConfigPage.module.css';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { modalState } from '../../states/modalState';
import Modal from '../../components/etc/Modal/Modal';

const AccountConfigPage = () => {
    const navigate = useNavigate();
    const [modal, setModal] = useRecoilState(modalState);
    const resetModalState = useResetRecoilState(modalState);

    const accountDeleteModalHandler = () => {
        setModal({
            ...modal,
            show: true,
            title: '간편비밀번호 해지',
            content: '해당 계좌의 연결을 해지하시겠습니까?',
            confirmHandler: () => {
                navigate('/login');
                resetModalState();
            },
            cancel: true,
        });
    };

    const accountConfigModalHandler = () => {
        setModal({
            ...modal,
            show: true,
            title: '주계좌 설정',
            content: '해당 계좌를 주계좌로 설정하시겠습니까?',
            confirmHandler: () => {
                navigate('/login');
                resetModalState();
            },
            cancel: true,
        });
    };

    return (
        <>
            <div className={AccountConfig_.container}>
                <div className={AccountConfig_.accountContainer}>
                    <ul className={AccountConfig_.accountList}>
                        <li className={AccountConfig_.accountWrapper}>
                            <div className={AccountConfig_.accountInfoContainer}>
                                <div className={AccountConfig_.bankInfo}>
                                    <p>IBK 기업</p>
                                    <img src={`${process.env.PUBLIC_URL}/assets/img/common/check.svg`} alt="" />
                                </div>
                                <p>237****1018</p>
                            </div>
                            <div className={AccountConfig_.accountConfigButton}>
                                <button
                                    className={AccountConfig_.accountDelete}
                                    onClick={() => accountDeleteModalHandler()}
                                >
                                    해지
                                </button>
                            </div>
                        </li>
                        <li className={AccountConfig_.accountWrapper}>
                            <div className={AccountConfig_.accountInfoContainer}>
                                <div className={AccountConfig_.bankInfo}>
                                    <p>KB 국민</p>
                                    <img src={`${process.env.PUBLIC_URL}/assets/img/common/noncheck.svg`} alt="" />
                                </div>
                                <p>955****8840</p>
                            </div>
                            <div className={AccountConfig_.accountConfigButton}>
                                <button
                                    className={AccountConfig_.accountDelete}
                                    onClick={() => accountDeleteModalHandler()}
                                >
                                    해지
                                </button>
                                <button
                                    className={AccountConfig_.mainAccount}
                                    onClick={() => accountConfigModalHandler()}
                                >
                                    주계좌
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className={AccountConfig_.accountAddContainer}>
                    <button className={AccountConfig_.accountAddButton} onClick={() => navigate('/account/add/agree')}>
                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10.5" cy="10.5" r="10.5" fill="#39C4FF" />
                            <line x1="4" y1="10.5" x2="17" y2="10.5" stroke="white" />
                            <line x1="10.5" y1="4" x2="10.5" y2="17" stroke="white" />
                        </svg>
                        <span>계좌 등록하기</span>
                    </button>
                </div>
            </div>
            {modal.show && <Modal />}
        </>
    );
};

export default AccountConfigPage;
