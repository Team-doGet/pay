import React from 'react';
import BottomModalLayout from '../../../layouts/BottomModalLayout';
import HistoryFilter_ from './HistoryFilter.module.css';
import { historyFilterState } from '../../../states/historyFilterState';
import { useRecoilState } from 'recoil';

const HistoryFiler = () => {
    const [historyFilter, setHistoryFilter] = useRecoilState(historyFilterState);

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
                            <li className={HistoryFilter_.button}>
                                <span>지난달</span>
                            </li>
                            <li className={HistoryFilter_.button}>
                                <span>3개월</span>
                            </li>
                            <li className={HistoryFilter_.button}>
                                <span>6개월</span>
                            </li>
                        </ul>
                    </li>
                    <li className={HistoryFilter_.filterWrapper}>
                        <h4>거래유형</h4>
                        <ul className={HistoryFilter_.buttonList}>
                            <li className={HistoryFilter_.button}>
                                <span>전체</span>
                            </li>
                            <li className={HistoryFilter_.button}>
                                <span>입금</span>
                            </li>
                            <li className={HistoryFilter_.button}>
                                <span>출금</span>
                            </li>
                        </ul>
                    </li>
                    <li className={HistoryFilter_.filterWrapper}>
                        <h4>정렬</h4>
                        <ul className={HistoryFilter_.buttonList}>
                            <li className={HistoryFilter_.button}>
                                <span>최신순</span>
                            </li>
                            <li className={HistoryFilter_.button}>
                                <span>과거순</span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div className={HistoryFilter_.acceptButton}>
                <button>확인</button>
            </div>
        </BottomModalLayout>
    );
};

export default HistoryFiler;
