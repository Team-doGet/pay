import React, { useEffect, useState } from 'react';
import Input from '../../components/atoms/Input';
import BottomButtons from '../../components/molecules/common/BottomButtons';
import { useNavigate } from 'react-router-dom';
import Withdraw from './WithdrawPage.module.css';
import AccountSelect from '../../components/molecules/BottomModal/AccountSelect';
import { accountSelectState } from '../../states/accountSelectState';
import { useRecoilState, useRecoilValue } from 'recoil';
import useAxios from '../../hooks/useAxios';
import useAuth from '../../hooks/useAuth';
import { userState } from '../../states/userState';
import bankData from '../../mock/bankCode.json';
import SimplePassword from '../../components/organisms/SimplePassword';

const WithdrawPage = () => {
    useAuth();
    const user = useRecoilValue(userState);
    const navigate = useNavigate();
    const api = useAxios({
        Authorization: `Bearer ${user.accessToken}`,
    });
    const [balance, setBalance] = useState(0);
    const [amount, setAmount] = useState(0);
    const [accountSelect, setAccountSelect] = useRecoilState(accountSelectState);
    const [simple, setSimple] = useState(false);

    const [accountList, setAccountList] = useState([]);

    const getBalance = async () => {
        const resp = await api.get(`/transfer/?userId=${user.userId}`);
        if (resp.data.status === 200) {
            setBalance(resp.data.data.balance);
        }
    };

    const getAccount = async () => {
        const resp = await api.get(`/pay/accounts/${user.userId}`);
        if (resp.data.status === 200) {
            const mainAccount = resp.data.data.accounts.filter(account => {
                return account.mainAccountYN === 'Y';
            });
            setAccountList(resp.data.data.accounts);
            setAccountSelect({
                ...accountSelect,
                accountNo: mainAccount[0].accountNo,
                bankCode: mainAccount[0].bankCode,
                accountBalance: mainAccount[0].accountBalance,
            });
        }
    };

    const withdrawHandler = async () => {
        const resp = await api.post(`/withdraw/withdraw`, {
            payId: user.userId,
            amount,
            accountNo: accountSelect.accountNo,
        });
        if (resp.data.status === 200) {
            // 완료 페이지 전환
            navigate('/result', {
                state: {
                    headerTitle: '인출완료',
                    flag: 'success',
                    info: [
                        {
                            title: '페이머니 잔액',
                            content: (Number(balance) - Number(amount)).toLocaleString('ko-KR') + '원', // balance가 아님
                        },
                        {
                            title: '출금계좌 잔액',
                            content:
                                (Number(accountSelect.accountBalance) + Number(amount)).toLocaleString('ko-KR') + '원',
                        },
                        {
                            title: '출금계좌',
                            content: bankData[accountSelect.bankCode] + ' ' + accountSelect.accountNo,
                        },
                    ],
                    buttons: {
                        childrens: ['홈으로', '페이 머니 내역'],
                        targetUrl: ['/', '/pay/history'],
                    },
                },
            });
            // successPageHandler 에서 땡겨서 만들기
        } else {
            // 에러 페이지 전환
            navigate('/result', {
                state: {
                    headerTitle: '인출실패',
                    flag: 'fail',
                    info: {
                        title: '인출이 실패되었습니다.',
                        contents: ['인출 금액이 페이머니 잔액보다 많습니다.', '머니 확인 후 다시 결제해주세요.'],
                    },
                    buttons: {
                        childrens: ['홈으로', '충전하기'],
                        targetUrl: ['/', '/pay/charge'],
                    },
                },
            });
        }
    };

    useEffect(() => {
        (async () => {
            await getBalance();
            await getAccount();
        })();
    }, []);

    return (
        <>
            {user.accessToken && (
                <div
                    style={{
                        marginLeft: '12px',
                        marginRight: '12px',
                    }}
                >
                    <div className={Withdraw.top}>
                        <p>금액 설정은 만원 단위로 가능합니다.</p>
                    </div>

                    <div className={Withdraw.amountContainer}>
                        <h4 className={Withdraw.title}>인출금액</h4>
                        <div>
                            <input
                                type="number"
                                placeholder="금액을 입력해주세요."
                                onChange={e => setAmount(e.target.value)}
                            />
                        </div>
                        <p>페이머니 : {balance.toLocaleString()}원</p>
                    </div>
                    <h4 className={Withdraw.title1}>계좌선택</h4>
                    <div className={Withdraw.bottom} onClick={() => setAccountSelect({ ...accountSelect, show: true })}>
                        <div className={Withdraw.sub}>인출 받을 계좌</div>
                        <div className={Withdraw.select}>
                            {accountList &&
                                accountList.map(
                                    account =>
                                        account.accountNo == accountSelect.accountNo && (
                                            <>
                                                <div>
                                                    {bankData[account.bankCode]} {account.accountNo.slice(0, 3)}****
                                                    {account.accountNo.slice(-4)}
                                                </div>
                                                <div>
                                                    <img
                                                        src={`${process.env.PUBLIC_URL}/assets/img/common/selectArrow.svg`}
                                                    ></img>
                                                </div>
                                            </>
                                        )
                                )}
                        </div>
                    </div>
                    {/* <BottomButtons childrens={['인출하기']} handlers={[() => navigate('/withdraw/simplePassword')]} /> */}
                    <BottomButtons childrens={['인출하기']} handlers={[() => setSimple(true)]} />
                    {accountSelect.show && <AccountSelect accountList={accountList} />}
                </div>
            )}

            {simple && <SimplePassword handler={() => withdrawHandler()} exit={() => setSimple(false)} />}
        </>
    );
};

export default WithdrawPage;
