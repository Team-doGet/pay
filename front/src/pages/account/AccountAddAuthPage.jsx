import React, { useEffect, useState } from 'react';
import AccountAddAuth from './AccountAddAuthPage.module.css';
import Input from '../../components/atoms/Input';
import BottomButtons from '../../components/molecules/common/BottomButtons';
import { Navigate, useLocation } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import useAuth from '../../hooks/useAuth';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { modalState } from '../../states/modalState';
import { userState } from '../../states/userState';

const AccountAddAuthPage = () => {
    useAuth();
    const [user, setUser] = useRecoilState(userState);
    const navigate = useNavigate();
    const api = useAxios({
        Authorization: `Bearer ${user.accessToken}`,
    });
    const location = useLocation();
    const { accountNo, bankCode, accountHolderName, accountBalance, payId } = location.state;
    const [modal, setModal] = useRecoilState(modalState);
    const resetModalState = useResetRecoilState(modalState);
    const [inputAlpha, setInputAlpha] = useState({
        authCode: '',
    });

    const [errorMessage, setErrorMessage] = useState('');

    var date = new Date();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds().toString();

    const handleChangeAlpha = e => {
        setInputAlpha({ authCode: e.target.value });
    };

    // 계좌 등록 API를 호출하는 함수
    const registerAccount = async () => {
        const { authCode } = inputAlpha;
        const resp = await api.post('/pay/accounts/register', {
            accountNo: accountNo,
            bankCode: bankCode,
            accountHolderName: accountHolderName,
            accountBalance: accountBalance,
            payId: user.userId,
            authCode,
        });

        // 등록에 성공하면 페이지를 이동합니다.
        if (resp.data.status === 201) {
            setUser({
                ...user,
                bankCode,
                accountNo,
            });
            setModal({
                ...modal,
                show: true,
                title: '간편계좌 연결 완료',
                content: '간편계좌 연결이 완료되었습니다.',
                confirmHandler: () => {
                    navigate('/');
                    resetModalState();
                },
                cancel: false,
            });
        } else {
            setErrorMessage(resp.data.message);
        }
    };

    return (
        <div
            style={{
                marginLeft: '12px',
                marginRight: '12px',
            }}
        >
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
                <div>2. 입금자명에 적힌 문자 4자리를 입력해주세요</div>
                <div className={AccountAddAuth.subText}> 인증문자 : 영문 알파벳과 숫자로 조합된 문자</div>
                <div className={AccountAddAuth.subText}> 단! 한가지로만 조합될 수도 있습니다.</div>
                <div className={AccountAddAuth.input}>
                    <Input
                        location="one"
                        type="text"
                        name="authCode"
                        inputs={inputAlpha.authCode}
                        setInputsState={setInputAlpha}
                        placeholder="4글자 입력"
                    />
                </div>
                <div className={AccountAddAuth.error}>{errorMessage}</div>
            </div>
            <div className={AccountAddAuth.bottom}>
                인증코드는 {hour}시 {minute + 5}분 {second}초까지 유효합니다
            </div>
            <div>
                <BottomButtons childrens={['확인']} handlers={[() => registerAccount()]}></BottomButtons>
            </div>
        </div>
    );
};

export default AccountAddAuthPage;
