import React, { useEffect, useState } from 'react';
import BottomModalLayout from '../../../layouts/BottomModalLayout';
import HistoryFilter_ from './HistoryFilter.module.css';
import { historyFilterState } from '../../../states/historyFilterState';
import { RecoilState, useRecoilState, useRecoilValue } from 'recoil';
import useAxios from '../../../hooks/useAxios';
import { userState } from '../../../states/userState';

const HistoryFiler = ({ historyData = { historyData }, setHistoryData = { setHistoryData } }) => {
    const user = useRecoilValue(userState);
    const api = useAxios({
        Authorization: `Bearer ${user.accessToken}`,
    });
    const [historyFilter, setHistoryFilter] = useRecoilState(historyFilterState);
    const [tempFilter, setTempFilter] = useState({
        period: 1,
        type: 1,
        orderby: 1,
    });

    useEffect(() => {
        setTempFilter(historyFilter);
    }, []);

    const getHistory = async () => {
        const res = await api.post(`/history/`, tempFilter);
        setHistoryFilter({ ...tempFilter, show: false });
        if (res.data.status === 200) {
            //list 출력
            setHistoryData({ data: res.data.data });
        } else {
            // 조회 오류 발생
            setHistoryData({
                ...historyData,
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

    return (
        <BottomModalLayout>
            <button onClick={() => setHistoryFilter({ ...historyFilter, show: false })}>
                <img src={`${process.env.PUBLIC_URL}/assets/img/common/close.svg`} alt="" />
            </button>
            <div className={HistoryFilter_.filterContainer}>
                <ul className={HistoryFilter_.filterList}>
                    <li className={HistoryFilter_.filterWrapper}>
                        <h4>조회기간</h4>
                        <ul className={HistoryFilter_.buttonList}>
                            <li className={tempFilter.period === 1 ? HistoryFilter_.buttonOn : HistoryFilter_.button}>
                                <span onClick={() => setTempFilter({ ...tempFilter, period: 1 })}>지난달</span>
                            </li>
                            <li className={tempFilter.period === 2 ? HistoryFilter_.buttonOn : HistoryFilter_.button}>
                                <span onClick={() => setTempFilter({ ...tempFilter, period: 2 })}>3개월</span>
                            </li>
                            <li className={tempFilter.period === 3 ? HistoryFilter_.buttonOn : HistoryFilter_.button}>
                                <span onClick={() => setTempFilter({ ...tempFilter, period: 3 })}>6개월</span>
                            </li>
                        </ul>
                    </li>
                    <li className={HistoryFilter_.filterWrapper}>
                        <h4>거래유형</h4>
                        <ul className={HistoryFilter_.buttonList}>
                            <li className={tempFilter.type === 1 ? HistoryFilter_.buttonOn : HistoryFilter_.button}>
                                <span onClick={() => setTempFilter({ ...tempFilter, type: 1 })}>전체</span>
                            </li>
                            <li className={tempFilter.type === 2 ? HistoryFilter_.buttonOn : HistoryFilter_.button}>
                                <span onClick={() => setTempFilter({ ...tempFilter, type: 2 })}>입금</span>
                            </li>
                            <li className={tempFilter.type === 3 ? HistoryFilter_.buttonOn : HistoryFilter_.button}>
                                <span onClick={() => setTempFilter({ ...tempFilter, type: 3 })}>출금</span>
                            </li>
                        </ul>
                    </li>
                    <li className={HistoryFilter_.filterWrapper}>
                        <h4>정렬</h4>
                        <ul className={HistoryFilter_.buttonList}>
                            <li className={tempFilter.orderby === 1 ? HistoryFilter_.buttonOn : HistoryFilter_.button}>
                                <span onClick={() => setTempFilter({ ...tempFilter, orderby: 1 })}>최신순</span>
                            </li>
                            <li className={tempFilter.orderby === 2 ? HistoryFilter_.buttonOn : HistoryFilter_.button}>
                                <span onClick={() => setTempFilter({ ...tempFilter, orderby: 2 })}>과거순</span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div className={HistoryFilter_.acceptButton}>
                <button onClick={() => getHistory()}>확인</button>
            </div>
        </BottomModalLayout>
    );
};

export default HistoryFiler;
