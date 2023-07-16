import React, { useState } from 'react';
import AccountAddAuth from './AccountAddAuthPage.module.css';
import Input from '../../components/atoms/Input';
import BottomButtons from '../../components/molecules/common/BottomButtons';
import { Navigate } from 'react-router-dom';

const AccountAddAuthPage = () => {
    const [inputAlpha, setInputAlpha] = useState({
        alpha: '',
    });
    return (
        <div>
            <div className={AccountAddAuth.one}>
                <div>
                    1. 입력한 계좌로 <span className={AccountAddAuth.blue}>1원</span>을 보냈어요.
                </div>
                <div>계좌 거래내역을 확인해주세요.</div>
                <div className={AccountAddAuth.examContainer}>
                    <div className={AccountAddAuth.examNameContainer}>
                        <p className={AccountAddAuth.examTitle}>입금자명</p>
                        <div>
                            <p>D</p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="15"
                                height="15"
                                viewBox="0 0 15 15"
                                fill="none"
                            >
                                <ellipse cx="7.70346" cy="7.19549" rx="7.15023" ry="7.19549" fill="#D9D9D9" />
                            </svg>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="15"
                                height="15"
                                viewBox="0 0 15 15"
                                fill="none"
                            >
                                <ellipse cx="7.70346" cy="7.19549" rx="7.15023" ry="7.19549" fill="#D9D9D9" />
                            </svg>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="15"
                                height="15"
                                viewBox="0 0 15 15"
                                fill="none"
                            >
                                <ellipse cx="7.70346" cy="7.19549" rx="7.15023" ry="7.19549" fill="#D9D9D9" />
                            </svg>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="15"
                                height="15"
                                viewBox="0 0 15 15"
                                fill="none"
                            >
                                <ellipse cx="7.70346" cy="7.19549" rx="7.15023" ry="7.19549" fill="#D9D9D9" />
                            </svg>
                        </div>
                    </div>
                    <div className={AccountAddAuth.examAmountContainer}>
                        <p className={AccountAddAuth.examTitle}>금액</p>
                        <p>1원</p>
                    </div>
                </div>
            </div>
            <div className={AccountAddAuth.two}>
                <div>2. 영문 알파벳을 입력해주세요</div>
                <div className={AccountAddAuth.input}>
                    <Input
                        location="one"
                        type="text"
                        name="alpha"
                        inputs={inputAlpha}
                        setInputsState={setInputAlpha}
                        placeholder="소문자 4글자 입력"
                    />
                </div>
            </div>
            <div className={AccountAddAuth.bottom}>06월 02일 15시 17분 전까지 입력 필요</div>
            <div>
                <BottomButtons childrens={['확인']} handlers={[() => Navigate('/success')]}></BottomButtons>
            </div>
        </div>
    );
};

export default AccountAddAuthPage;
