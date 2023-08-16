import React, { useEffect, useState } from 'react';
import AccountConfig_ from './AccountConfigPage.module.css';
import { useNavigate } from 'react-router-dom';
import { modalState } from '../../states/modalState';
import useAuth from '../../hooks/useAuth';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import Modal from '../../components/etc/Modal/Modal';
import { userState } from '../../states/userState';
import useAxios from '../../hooks/useAxios';
import bankData from '../../mock/bankCode.json';

const AccountConfigPage = () => {
    useAuth();
    const user = useRecoilValue(userState);
    const navigate = useNavigate();
    const api = useAxios({
        Authorization: `Bearer ${user.accessToken}`,
    });
    const [modal, setModal] = useRecoilState(modalState);
    const resetModalState = useResetRecoilState(modalState);
    const [accounts, setAccounts] = useState([]);
    const [transferData, setTransferData] = useState({
        accountNum: '',
        bankCode: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [noneMessage, setNoneMessage] = useState('');

    useEffect(() => {
        fetchAccounts();
    }, []);

    const fetchAccounts = async () => {
        const resp = await api.get(`/pay/accounts/${user.userId}`);
        if (resp.data.status === 200) {
            const sortedAccounts = resp.data.data.accounts.sort((a, b) => {
                // 'Y'가 맨 위로, 'N'이 그 다음으로 정렬
                if (a.mainAccountYN === 'Y') return -1;
                if (b.mainAccountYN === 'Y') return 1;
                // 그 외의 경우 유지
                return 0;
            });
            setAccounts(sortedAccounts);
        } else {
            setNoneMessage(resp.data.message);
        }
    };

    const accountDeleteModalHandler = (account, isMain, bankCode) => {
        if (isMain === 'Y') {
            setModal({
                ...modal,
                show: true,
                title: '주계좌 해지',
                content: '주계좌로 설정된 계좌는 해지가 불가합니다.',
                confirmHandler: () => {
                    resetModalState();
                },
                cancel: false,
            });
            return;
        } else {
            setModal({
                ...modal,
                show: true,
                title: '계좌 해지',
                content: '해당 계좌의 연결을 해지하시겠습니까?',
                confirmHandler: async () => {
                    await setTransferData({ ...transferData, accountNum: account, bankCode: bankCode });
                    const response = await api.post(`/pay/accounts/delete/${account}`, {
                        accountNum: account,
                        bankCode: bankCode,
                    });
                    if (response.data.status === 200) {
                        fetchAccounts();
                    }
                    resetModalState();
                },
                cancel: true,
            });
        }
    };

    const accountConfigModalHandler = account => {
        setModal({
            ...modal,
            show: true,
            title: '주계좌 설정',
            content: '해당 계좌를 주계좌로 설정하시겠습니까?',
            confirmHandler: async () => {
                const response = await api.post(`/pay/accounts/updateMainAcc/${account}`);
                fetchAccounts();
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
                        {accounts.map(account => (
                            <li key={account.accountNo} className={AccountConfig_.accountWrapper}>
                                <div className={AccountConfig_.accountInfoContainer}>
                                    <div className={AccountConfig_.bankInfo}>
                                        <p>{bankData[account.bankCode]}</p>

                                        <img
                                            src={`${process.env.PUBLIC_URL}/assets/img/common/${
                                                account.mainAccountYN === 'Y' ? 'check.svg' : 'noncheck.svg'
                                            }`}
                                            alt=""
                                        />
                                    </div>
                                    <p>
                                        {account.accountNo.slice(0, 3)}****{account.accountNo.slice(-4)}
                                    </p>
                                </div>
                                <div className={AccountConfig_.accountConfigButton}>
                                    <button
                                        className={AccountConfig_.accountDelete}
                                        onClick={() =>
                                            accountDeleteModalHandler(
                                                account.accountNo,
                                                account.mainAccountYN,
                                                account.bankCode
                                            )
                                        }
                                    >
                                        해지
                                    </button>
                                    {account.mainAccountYN === 'N' && (
                                        <button
                                            className={AccountConfig_.mainAccount}
                                            onClick={() => accountConfigModalHandler(account.accountNo)}
                                        >
                                            주계좌
                                        </button>
                                    )}
                                </div>
                            </li>
                        ))}
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
