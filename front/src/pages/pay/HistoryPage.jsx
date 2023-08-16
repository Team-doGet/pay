import React, { useEffect, useState } from 'react';
import History_ from './History.module.css';
import HistoryFiler from '../../components/molecules/BottomModal/HistoryFiler';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { historyFilterState } from '../../states/historyFilterState';
import useAxios from '../../hooks/useAxios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useRecoilValue } from 'recoil';
import { userState } from '../../states/userState';

const HistoryPage = () => {
    useAuth();
    const user = useRecoilValue(userState);
    const api = useAxios({
        Authorization: `Bearer ${user.accessToken}`,
    });

    const navigate = useNavigate();
    const [historyFilter, setHistoryFilter] = useRecoilState(historyFilterState);
    const resetHistoryFilter = useResetRecoilState(historyFilterState);
    const [userBalance, setUserBalance] = useState(0);
    const [historyData, setHistoryData] = useState({
        data: [
            {
                registered_date: '          ',
                opposite_name: '조회된 데이터가 없습니다.',
                process_code: '000',
                process_amount: '-',
                paymoney_balance: '-',
            },
        ],
    });

    const getAccountBalance = async () => {
        const res = await api.get(`/transfer/?userId=${user.userId}`, userBalance);
        setUserBalance(res.data.data.balance);
    };

    const getHistoryDefault = async () => {
        const res = await api.post(`/history/`, {
            ...historyFilter,
            id: user.userId,
        }); // user.userId
        if (res.data.status === 200) {
            console.log(res.data.data);
            //list 출력
            setHistoryData({ ...historyData, data: res.data.data });
        } else {
            // 조회 오류 발생
            setHistoryData({
                data: [
                    {
                        registered_date: '          ',
                        opposite_name: '조회된 데이터가 없습니다.',
                        process_code: '000',
                        process_amount: '-',
                        paymoney_balance: '-',
                    },
                ],
            });
        }
    };

    useEffect(() => {
        setHistoryFilter({ ...historyFilter, id: user.userId }); // user.userId 로 변경
        getAccountBalance();
        getHistoryDefault();

        return () => {
            resetHistoryFilter();
        };
    }, []);

    return (
        <>
            <div className={History_.conatiner}>
                <div className={History_.payContainer}>
                    <div className={History_.payMoney}>
                        <h3>잔액</h3>
                        <h4>{userBalance.toLocaleString()}원</h4>
                    </div>
                    <div className={History_.payButtonsContainer}>
                        <button onClick={() => navigate('/pay/charge')}>충전</button>
                        <button onClick={() => navigate('/pay/withdraw')}>인출</button>
                    </div>
                </div>
                <div className={History_.historyContainer}>
                    <div className={History_.filterButtonContainer}>
                        <button
                            className={History_.filterButton}
                            onClick={() => setHistoryFilter({ ...historyFilter, show: true })}
                        >
                            <p>
                                {historyFilter.period === 1 ? '1개월' : historyFilter.period === 2 ? '3개월' : '6개월'}{' '}
                                ・{' '}
                            </p>
                            <p>{historyFilter.type === 1 ? '전체' : historyFilter.type === 2 ? '입금' : '출금'} ・ </p>
                            <p>{historyFilter.orderby === 1 ? '최신순' : '과거순'}</p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="7"
                                viewBox="0 0 12 7"
                                fill="none"
                            >
                                <path
                                    d="M5.46967 6.53033C5.76256 6.82322 6.23744 6.82322 6.53033 6.53033L11.3033 1.75736C11.5962 1.46447 11.5962 0.989593 11.3033 0.696699C11.0104 0.403806 10.5355 0.403806 10.2426 0.696699L6 4.93934L1.75736 0.696699C1.46447 0.403806 0.989593 0.403806 0.696699 0.696699C0.403806 0.989592 0.403806 1.46447 0.696699 1.75736L5.46967 6.53033ZM5.25 5L5.25 6L6.75 6L6.75 5L5.25 5Z"
                                    fill="#929294"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className={History_.historyBox}>
                        <ul className={History_.historyList}>
                            {historyData.data &&
                                historyData.data.map(history => (
                                    <li className={History_.historyWrapper}>
                                        <div className={History_.histroyContent}>
                                            <p>
                                                {history.registered_date.slice(4, 6)}.
                                                {history.registered_date.slice(6, 8)}
                                            </p>
                                            <p>{history.opposite_name}</p>
                                        </div>
                                        <div className={History_.historyAmount}>
                                            <p>
                                                {history.process_code === '001' ||
                                                history.process_code === '002' ||
                                                history.process_code === '005' ? (
                                                    <p style={{ color: 'red' }}>출금</p>
                                                ) : history.process_code === '000' ? (
                                                    '-'
                                                ) : (
                                                    <p style={{ color: 'blue' }}>입금</p>
                                                )}
                                            </p>
                                            <p>사용 금액 : {history.process_amount.toLocaleString()}원</p>
                                            <p>잔액 : {history.paymoney_balance.toLocaleString()}원</p>
                                        </div>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </div>
            {historyFilter.show && <HistoryFiler historyData={historyData} setHistoryData={setHistoryData} />}
        </>
    );
};

export default HistoryPage;
