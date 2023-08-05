import React, { useEffect, useState } from 'react';
import BottomModalLayout from '../../../layouts/BottomModalLayout';
import HistoryFilter_ from './HistoryFilter.module.css';
import { historyFilterState } from '../../../states/historyFilterState';
import { RecoilState, useRecoilState } from 'recoil';

const HistoryFiler = () => {
    const [historyFilter, setHistoryFilter] = useRecoilState(historyFilterState);
    const [tempFilter, setTempFilter] = useState({
        period: 1,
        type: 1,
        orderby: 1,
    });

    useEffect(() => {
        setTempFilter(historyFilter);
    }, []);

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
                <button onClick={() => setHistoryFilter({ ...tempFilter, show: false })}>확인</button>
            </div>
        </BottomModalLayout>
    );
};

export default HistoryFiler;
