import React from 'react';
import Main_ from './MainPage.module.css';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className={Main_.container}>
                <div className={Main_.headerContainer}>
                    <div className={Main_.logoContainer}>
                        <svg
                            width="150"
                            height="64"
                            viewBox="0 0 150 64"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M73.1165 48.05V13.675L75.5457 12.5291H87.7832C93.1304 12.5291 95.804 15.2027 95.804 20.55V27.425C95.804 32.7722 93.1304 35.4458 87.7832 35.4458H77.6999V45.9875L73.3457 48.05H73.1165ZM77.6999 16.6541V31.3208H87.7832C90.0749 31.3208 91.2207 30.0222 91.2207 27.425V20.55C91.2207 17.9527 90.0749 16.6541 87.7832 16.6541H77.6999ZM107.262 43.0083H112.075C113.603 43.0083 114.367 42.0916 114.367 40.2583V37.1187C114.367 35.2854 113.603 34.3687 112.075 34.3687H107.262C105.735 34.3687 104.971 35.2854 104.971 37.1187V40.2583C104.971 42.0916 105.735 43.0083 107.262 43.0083ZM107.262 47.1333C102.679 47.1333 100.387 44.8416 100.387 40.2583V37.1187C100.387 32.5354 102.679 30.2437 107.262 30.2437H112.075C112.869 30.2437 113.633 30.4729 114.367 30.9312V28.8C114.367 26.9666 113.603 26.05 112.075 26.05H103.871V25.8208L105.704 21.925H112.075C116.658 21.925 118.95 24.2166 118.95 28.8V45.9875L114.596 48.05H114.367V46.4458C113.786 46.9041 113.022 47.1333 112.075 47.1333H107.262ZM132.7 47.1333C128.117 47.1333 125.825 44.8416 125.825 40.2583V23.0708L130.179 21.0083H130.408V40.2583C130.408 42.0916 131.172 43.0083 132.7 43.0083H137.971C139.498 43.0083 140.262 42.0916 140.262 40.2583V23.0708L144.617 21.0083H144.846V49.6541C144.846 54.2375 142.554 56.5291 137.971 56.5291H128.208V56.3L130.042 52.4041H137.971C139.498 52.4041 140.262 51.4875 140.262 49.6541V46.4458C139.667 46.9041 138.903 47.1333 137.971 47.1333H132.7Z"
                                fill="#39C4FF"
                            />
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M4.26667 0C1.91025 0 0 1.91025 0 4.26667V59.7333C0 62.0897 1.91025 64 4.26667 64H59.7333C62.0897 64 64 62.0897 64 59.7333V4.26667C64 1.91025 62.0897 0 59.7333 0H4.26667ZM19.0146 48.4667H31C34.0708 48.4667 36.7215 47.9167 38.9521 46.8167C41.1826 45.7014 42.9014 43.9826 44.1083 41.6604C45.3153 39.3382 45.9188 36.359 45.9188 32.7229C45.9188 29.0868 45.2465 26.0389 43.9021 23.5792C42.5729 21.1042 40.6785 19.2403 38.2188 17.9875C35.759 16.7194 32.8486 16.0854 29.4875 16.0854H19.0146L18.5563 19.9812C18.984 20.5771 19.8472 21.1042 21.1458 21.5625V43.0125C19.8319 43.5167 18.9688 44.0361 18.5563 44.5708L19.0146 48.4667ZM27.9063 21.1958H30.0146C35.9271 21.1958 38.8833 25.1069 38.8833 32.9292C38.8833 35.6486 38.5701 37.7646 37.9438 39.2771C37.3326 40.7896 36.4618 41.8514 35.3313 42.4625C34.2007 43.0583 32.8486 43.3563 31.275 43.3563H27.9063V21.1958Z"
                                fill="#39C4FF"
                            />
                        </svg>
                    </div>
                    <button>로그아웃</button>
                </div>
                <div className={Main_.moneyContainer}>
                    <h4>머니</h4>
                    <p>10,000원</p>
                    <div className={Main_.moneyButtonContainer}>
                        <button onClick={() => navigate('/pay/charge')}>충전</button>
                        <button onClick={() => navigate('/pay/withdraw')}>인출</button>
                    </div>
                </div>
                <div className={Main_.menuContainer}>
                    <ul className={Main_.menuList}>
                        <li className={Main_.menuWrapper}>
                            <button className={Main_.menuButton} onClick={() => navigate('/account/config')}>
                                <img src={`${process.env.PUBLIC_URL}/assets/img/main/account.svg`} alt="" />
                                <p>계좌</p>
                            </button>
                        </li>
                        <li className={Main_.menuWrapper}>
                            <button className={Main_.menuButton} onClick={() => navigate('/pay/history')}>
                                <img src={`${process.env.PUBLIC_URL}/assets/img/main/history.svg`} alt="" />
                                <p>거래내역</p>
                            </button>
                        </li>
                        <li className={Main_.menuWrapper}>
                            <button className={Main_.menuButton}>
                                <img src={`${process.env.PUBLIC_URL}/assets/img/main/transfer.svg`} alt="" />
                                <p>송・수금</p>
                            </button>
                        </li>
                        <li className={Main_.menuWrapper}>
                            <button className={Main_.menuButton} onClick={() => navigate('/pay/pay')}>
                                <img src={`${process.env.PUBLIC_URL}/assets/img/main/pay.svg`} alt="" />
                                <p>결제</p>
                            </button>
                        </li>
                    </ul>
                </div>
                <div className={Main_.historyContainer}>
                    <div className={Main_.historyHeader}>
                        <h4>최근 거래내역</h4>
                    </div>
                    <div className={Main_.historyBox}>
                        <ul className={Main_.historyList}>
                            <li className={Main_.historyWrapper}>
                                <div className={Main_.histroyContent}>
                                    <p>06.05</p>
                                    <p>사용처</p>
                                </div>
                                <div className={Main_.historyAmount}>
                                    <p>20,000원</p>
                                    <p>1,310,000원</p>
                                </div>
                            </li>
                            <li className={Main_.historyWrapper}>
                                <div className={Main_.histroyContent}>
                                    <p>06.05</p>
                                    <p>사용처</p>
                                </div>
                                <div className={Main_.historyAmount}>
                                    <p>20,000원</p>
                                    <p>10,000원</p>
                                </div>
                            </li>
                            <li className={Main_.historyWrapper}>
                                <div className={Main_.histroyContent}>
                                    <p>06.05</p>
                                    <p>사용처</p>
                                </div>
                                <div className={Main_.historyAmount}>
                                    <p>20,000원</p>
                                    <p>10,000원</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MainPage;
