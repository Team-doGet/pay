import React from 'react';
import History_ from './History.module.css';
import HistoryFiler from '../../components/molecules/BottomModal/HistoryFiler';
import { useRecoilState } from 'recoil';
import { historyFilterState } from '../../states/historyFilterState';

const HistoryPage = () => {
    const [historyFilter, setHistoryFilter] = useRecoilState(historyFilterState);

    return (
        <>
            <div className={History_.conatiner}>
                <div className={History_.payContainer}>
                    <div className={History_.payMoney}>
                        <h4>10,000원</h4>
                    </div>
                    <div className={History_.payButtonsContainer}>
                        <button>충전</button>
                        <button>인출</button>
                    </div>
                </div>
                <div className={History_.historyContainer}>
                    <div className={History_.filterButtonContainer}>
                        <button
                            className={History_.filterButton}
                            onClick={() => setHistoryFilter({ ...historyFilter, show: true })}
                        >
                            <p>1개월 ・ </p>
                            <p>전체 ・ </p>
                            <p>최신순</p>
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
                            <li className={History_.historyWrapper}>
                                <div className={History_.histroyContent}>
                                    <p>06.05</p>
                                    <p>사용처</p>
                                </div>
                                <div className={History_.historyAmount}>
                                    <p>20,000원</p>
                                    <p>1,310,000원</p>
                                </div>
                            </li>
                            <li className={History_.historyWrapper}>
                                <div className={History_.histroyContent}>
                                    <p>06.05</p>
                                    <p>사용처</p>
                                </div>
                                <div className={History_.historyAmount}>
                                    <p>20,000원</p>
                                    <p>10,000원</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {historyFilter.show && <HistoryFiler />}
        </>
    );
};

export default HistoryPage;
