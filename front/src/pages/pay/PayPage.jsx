import React, { useEffect, useState } from 'react';
import Pay_ from './PayPage.module.css';
import Input from '../../components/atoms/Input';
import BottomButtons from '../../components/molecules/common/BottomButtons';
import useAxios from '../../hooks/useAxios';
import useAuth from '../../hooks/useAuth';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { userState } from '../../states/userState';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { modalState } from '../../states/modalState';
import { loadingState } from '../../states/loadingState';
import SimplePassword from '../../components/organisms/SimplePassword';
import MfaModal from '../../components/etc/Modal/MfaModal';

const PayPage = () => {
    useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const user = useRecoilValue(userState);
    const [modal, setModal] = useRecoilState(modalState);
    const resetModal = useResetRecoilState(modalState);
    const [loading, setLoading] = useRecoilState(loadingState);
    const api = useAxios({
        Authorization: `Bearer ${user.accessToken}`,
    });

    const [simple, setSimple] = useState(false);
    const [payReq, setPayReq] = useState({
        amount: 0,
        message: '',
    });
    const [amount, setAmount] = useState();
    const [payBalance, setPayBalance] = useState();
    const [storeName, setStoreName] = useState();

    const [mfa, setMfa] = useState({
        show: false,
        code: '',
    });

    useEffect(() => {
        setLoading({ ...loading, show: true });
        if (location.search.startsWith('?storeId=')) {
            if (user.accountNo === '') {
                setLoading({ ...loading, show: false });
                setModal({
                    show: true,
                    title: '계좌 등록',
                    content: '계좌등록이 필요합니다.',
                    confirmHandler: () => {
                        resetModal();
                        navigate('/account/config', { replace: true });
                    },
                    cancel: false,
                });
            } else {
                (async () => {
                    const res = await api.get(`/pay?storeId=${searchParams.get('storeId')}`);
                    if (res.data.status === 200) {
                        setStoreName(res.data.data.storeName);
                        setLoading({ ...loading, show: false });

                        // fds 미사용 시 사용 제안 모달 띄움
                        if (user.fds === false) {
                            setModal({
                                show: true,
                                title: 'FDS',
                                content: '안전한 거래를 위해 FDS 기능을 사용하시겠습니까?',
                                confirmHandler: () => {
                                    resetModal();
                                    navigate('/mypage', { replace: true });
                                },
                                cancel: true,
                            });
                        }
                    } else {
                        setLoading({ ...loading, show: false });
                        setModal({
                            show: true,
                            title: '실패',
                            content: '존재하지 않는 매장입니다.',
                            confirmHandler: () => {
                                resetModal();
                                navigate('/');
                            },
                            cancel: false,
                        });
                    }
                })();
            }
        } else {
            setLoading({ ...loading, show: false });
            setModal({
                show: true,
                title: '실패',
                content: '카메라 앱으로 QR 코드를 인식해주세요.',
                confirmHandler: () => {
                    resetModal();
                    navigate('/');
                },
                cancel: false,
            });
        }

        (async () => {
            const res = await api.get(`/transfer/?userId=${user.userId}`);
            if (res.data.status === 200) {
                setPayBalance(res.data.data.balance);
            }
        })();
    }, []);

    const fdsHandler = async () => {
        const fdsRes = await api.post(`/checkFDS`, {
            payId: user.userId,
            reqAmount: amount,
            oppositeName: storeName,
            bankCode: user.bankCode,
            accountNo: user.accountNo,
            paymoneyBalance: payBalance,
        });

        if (fdsRes.data.status === 200) {
            setSimple(true);
        } else if (fdsRes.data.status === 401) {
            // fds 해야댐
            setMfa({
                ...mfa,
                show: true,
            });
        }
    };

    const mfaHandler = async () => {
        const mfaRes = await api.post(`/totp/validate`, {
            inputCode: mfa.code,
            userId: user.userId,
        });

        if (mfaRes.data.status === 200) {
            setMfa({
                ...mfa,
                show: false,
            });
            setSimple(true);
        } else {
            setMfa({
                ...mfa,
                show: false,
            });
            setModal({
                show: true,
                title: '인증 실패',
                content: '2FA 인증이 실패하였습니다.',
                confirmHandler: () => {
                    resetModal();
                    navigate('/', { replace: true });
                },
                cancel: false,
            });
        }
    };

    const payHandler = async () => {
        const res = await api.post(`/pay`, {
            userId: String(user.userId),
            amount: Number(amount),
            storeName,
        });

        if (res.data.status == 200) {
            navigate('/result', {
                state: {
                    headerTitle: '결제완료',
                    flag: 'success',
                    info: [
                        {
                            title: '결제 금액',
                            content: res.data.data.amount.toLocaleString() + '원',
                        },
                        {
                            title: '결제 일자',
                            content: res.data.data.dateTime,
                        },
                        {
                            title: '매장 이름',
                            content: res.data.data.storeName,
                        },
                    ],
                    buttons: {
                        childrens: ['홈으로', '페이 머니 내역'],
                        targetUrl: ['/', '/pay/history'],
                    },
                },
                replace: true,
            });
        } else {
            navigate('/result', {
                state: {
                    headerTitle: '결제실패',
                    flag: 'fail',
                    info: {
                        title: '결제가 실패되었습니다.',
                        contents: [res.data.message],
                    },
                    buttons: {
                        childrens: ['홈으로', '충전하기'],
                        targetUrl: ['/', '/pay/charge'],
                    },
                },
            });
        }
    };

    return (
        <>
            {storeName && (
                <div
                    style={{
                        marginLeft: '12px',
                        marginRight: '12px',
                    }}
                >
                    <div className={Pay_.container}>
                        <div className={Pay_.shopContainer}>
                            <h4 className={Pay_.title}>결제매장</h4>
                            <div className={Pay_.shopInfo}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="25"
                                    height="20"
                                    viewBox="0 0 25 20"
                                    fill="none"
                                >
                                    <g clipPath="url(#clip0_45_110)">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M13.519 15.1329C13.5866 15.1329 13.6527 15.1529 13.7089 15.1905C13.7652 15.2281 13.809 15.2815 13.8349 15.3439C13.8608 15.4064 13.8675 15.4752 13.8543 15.5415C13.8411 15.6078 13.8086 15.6688 13.7607 15.7166C13.7129 15.7644 13.652 15.797 13.5857 15.8102C13.5193 15.8233 13.4506 15.8166 13.3881 15.7907C13.3256 15.7648 13.2722 15.721 13.2347 15.6648C13.1971 15.6085 13.177 15.5424 13.177 15.4748C13.177 15.3841 13.2131 15.2971 13.2772 15.233C13.3413 15.1689 13.4283 15.1329 13.519 15.1329ZM4.32006 4.46268H0.672154V5.04885C0.673177 5.48592 0.846857 5.90488 1.15536 6.21449C1.46387 6.5241 1.88222 6.69926 2.31928 6.70184C2.77258 6.70184 3.53851 6.51622 3.83745 6.21532C3.99117 6.06135 4.11294 5.87851 4.19577 5.67732C4.27859 5.47613 4.32083 5.26056 4.32006 5.04299V4.45682V4.46268ZM0.840189 3.87652H4.42362L5.00979 0.568583H2.27434L0.840189 3.87261V3.87652ZM14.5428 0.564675L14.7909 3.87261H18.7984L18.1223 0.564675H14.5428ZM14.0074 3.87261L13.7613 0.564675H10.2443L10 3.87261H14.0074ZM9.21651 3.87261L9.45879 0.564675H5.79525L5.20908 3.87261H9.21651ZM18.9019 0.564675L19.576 3.87261H23.1497L21.6042 0.564675H18.9019ZM19.6835 4.47245V5.05862C19.6827 5.27619 19.725 5.49176 19.8078 5.69295C19.8906 5.89414 20.0124 6.07698 20.1661 6.23095C20.465 6.53185 21.231 6.71747 21.6843 6.71747C22.1213 6.71489 22.5397 6.53973 22.8482 6.23012C23.1567 5.92052 23.3304 5.50155 23.3314 5.06448V4.47831L19.6835 4.47245ZM14.8496 4.46268V5.04885C14.8487 5.2666 14.8911 5.48235 14.9743 5.6836C15.0575 5.88484 15.1798 6.06756 15.3341 6.22118C15.6331 6.52208 16.397 6.7077 16.8503 6.7077C17.3036 6.7077 18.0676 6.52208 18.3666 6.22118C18.5209 6.06756 18.6432 5.88484 18.7264 5.6836C18.8096 5.48235 18.852 5.2666 18.8511 5.04885V4.46268H14.8496ZM10 4.46268V5.04885C9.99918 5.2666 10.0416 5.48235 10.1248 5.6836C10.2079 5.88484 10.3302 6.06756 10.4846 6.22118C10.7835 6.52208 11.5475 6.7077 12.0008 6.7077C12.4541 6.7077 13.2181 6.52208 13.517 6.22118C13.6713 6.06756 13.7937 5.88484 13.8768 5.6836C13.96 5.48235 14.0024 5.2666 14.0016 5.04885V4.46268H10ZM5.15047 4.46268V5.04885C5.14963 5.2666 5.19203 5.48235 5.27521 5.6836C5.35839 5.88484 5.4807 6.06756 5.63503 6.22118C5.93397 6.52208 6.69794 6.7077 7.15125 6.7077C7.60455 6.7077 8.36852 6.52208 8.66746 6.22118C8.8218 6.06756 8.9441 5.88484 9.02728 5.6836C9.11046 5.48235 9.15286 5.2666 9.15203 5.04885V4.46268H5.15047ZM20.7249 7.15709C20.4807 7.04377 19.8789 6.88746 19.6893 6.69793C19.5239 6.5321 19.3843 6.34242 19.2751 6.13521C19.1659 6.34242 19.0263 6.5321 18.8609 6.69793C18.4428 7.11606 17.4932 7.37398 16.8503 7.37398C16.2075 7.37398 15.2618 7.11606 14.8496 6.69793C14.6842 6.5321 14.5445 6.34242 14.4353 6.13521C14.3261 6.34242 14.1865 6.5321 14.0211 6.69793C13.603 7.11606 12.6534 7.37398 12.0106 7.37398C11.3677 7.37398 10.4181 7.11606 10 6.69793C9.83045 6.53292 9.68685 6.3432 9.57407 6.13521C9.46487 6.34242 9.32525 6.5321 9.15984 6.69793C8.74171 7.11606 7.79212 7.37398 7.14929 7.37398C6.50646 7.37398 5.55687 7.11606 5.13874 6.69793C4.97334 6.5321 4.83371 6.34242 4.72452 6.13521C4.61532 6.34242 4.4757 6.5321 4.31029 6.69793C4.0348 6.97343 3.3099 7.17859 2.92694 7.2841C2.84358 7.29452 2.7576 7.30233 2.66903 7.30754V18.73C2.66923 18.7879 2.69242 18.8434 2.73351 18.8843C2.77539 18.9265 2.8323 18.9504 2.89177 18.9508H11.6843V11.0629C11.6853 10.5585 11.8861 10.075 12.2428 9.71837C12.5995 9.3617 13.0829 9.16086 13.5874 9.15983H16.7331C17.2372 9.16138 17.7201 9.36244 18.0764 9.71906C18.4326 10.0757 18.6332 10.5588 18.6342 11.0629V18.9527H21.1118C21.1409 18.9525 21.1697 18.9465 21.1966 18.9351C21.2234 18.9237 21.2477 18.9071 21.2681 18.8863C21.3083 18.845 21.3307 18.7896 21.3306 18.7319V7.32317C21.3306 7.30168 21.3306 7.28019 21.3306 7.26065C21.1261 7.23916 20.9231 7.20457 20.723 7.15709H20.7249ZM12.5694 18.9527H17.7511V11.0629C17.7501 10.7927 17.6423 10.5339 17.4512 10.3429C17.2602 10.1518 17.0013 10.044 16.7312 10.043H13.5893C13.3191 10.044 13.0603 10.1518 12.8692 10.3429C12.6782 10.5339 12.5704 10.7927 12.5694 11.0629V18.9527ZM5.86168 10.6135H9.00744C9.12473 10.6135 9.23725 10.66 9.32038 10.7427C9.4035 10.8255 9.45046 10.9378 9.45097 11.0551V15.7308C9.45097 15.8484 9.40424 15.9612 9.32106 16.0444C9.23789 16.1276 9.12507 16.1743 9.00744 16.1743H5.86168C5.74405 16.1743 5.63123 16.1276 5.54806 16.0444C5.46488 15.9612 5.41815 15.8484 5.41815 15.7308V11.0551C5.41866 10.9378 5.46562 10.8255 5.54874 10.7427C5.63187 10.66 5.74439 10.6135 5.86168 10.6135ZM8.56586 11.4986H6.30131V15.2892H8.56586V11.4986ZM1.63542 7.22939C1.27504 7.14512 0.944197 6.96485 0.678016 6.7077C0.462094 6.49295 0.290974 6.23746 0.174586 5.95605C0.0581982 5.67464 -0.00113954 5.37291 1.6574e-05 5.06839V4.16178C0.000373556 4.11611 0.0117694 4.07119 0.0332327 4.03087L1.84644 0.13482C1.86891 0.0938787 1.90201 0.0597511 1.94223 0.0360264C1.98246 0.0123018 2.02834 -0.000142955 2.07505 1.23895e-06H21.7898C21.8391 0.000156685 21.8875 0.0141553 21.9292 0.0404058C21.971 0.0666564 22.0046 0.104106 22.0262 0.148497L23.9801 4.02306C24.0024 4.0604 24.0152 4.10269 24.0172 4.14615C24.0182 4.15459 24.0182 4.16311 24.0172 4.17155V5.06643C24.0171 5.36932 23.9571 5.66919 23.8408 5.94884C23.7244 6.22848 23.554 6.48239 23.3392 6.69598C23.0748 6.95538 22.7421 7.13428 22.3799 7.2118C22.3877 7.24774 22.3916 7.28443 22.3916 7.32122V18.73C22.3901 19.0662 22.2552 19.3881 22.0164 19.6249C21.8986 19.7432 21.7585 19.8371 21.6043 19.9011C21.45 19.9651 21.2846 19.9981 21.1176 19.998H2.89763C2.73095 19.9978 2.56595 19.9648 2.41206 19.9007C2.25818 19.8367 2.11842 19.7429 2.0008 19.6249C1.88268 19.5077 1.7889 19.3683 1.72485 19.2147C1.6608 19.0611 1.62775 18.8964 1.62761 18.73V7.32317C1.62462 7.28872 1.62462 7.25407 1.62761 7.21962L1.63542 7.22939Z"
                                            fill="black"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_45_110">
                                            <rect width="24.0094" height="20" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <span>{storeName}</span>
                            </div>
                        </div>
                        <div className={Pay_.amountContainer}>
                            <h4 className={Pay_.title}>결제금액</h4>
                            <div>
                                <input
                                    type="number"
                                    value={amount}
                                    placeholder="금액을 입력해주세요."
                                    onChange={e => setAmount(e.target.value)}
                                />
                            </div>
                            <p>페이머니 : {Number(payBalance).toLocaleString()}원</p>
                        </div>
                        <div className={Pay_.msgContainer}>
                            <h4 className={Pay_.title}>메시지</h4>
                            <Input
                                location="one"
                                type="text"
                                name="message"
                                inputs={payReq}
                                setInputsState={setPayReq}
                                placeholder="미입력시 송금자명"
                            />
                        </div>
                        <div className={Pay_.noticeContainer}>
                            <h4 className={Pay_.title}>확인해주세요.</h4>
                            <div>
                                <p>・머니 부족 시 등록된 계좌에서 자동 충전됩니다.</p>
                                <p>・결제 취소를 원할 경우 매장에 문의해주세요.</p>
                            </div>
                        </div>
                    </div>
                    <div className={Pay_.btnContainer}>
                        <button onClick={() => fdsHandler()}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                viewBox="0 0 28 28"
                                fill="none"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M1.83333 0C0.820811 0 0 0.820811 0 1.83333V25.6667C0 26.6792 0.820811 27.5 1.83333 27.5H25.6667C26.6792 27.5 27.5 26.6792 27.5 25.6667V1.83333C27.5 0.820811 26.6792 0 25.6667 0H1.83333ZM8.17033 20.3333H13.3203C14.6398 20.3333 15.7788 20.097 16.7372 19.6243C17.6957 19.1451 18.4342 18.4066 18.9528 17.4088C19.4714 16.4109 19.7307 15.1308 19.7307 13.5684C19.7307 12.006 19.4419 10.6964 18.8642 9.63949C18.2931 8.57601 17.479 7.77512 16.4221 7.23682C15.3652 6.69195 14.1146 6.41951 12.6704 6.41951H8.17033L7.97339 8.0935C8.1572 8.34953 8.5281 8.57601 9.0861 8.77295V17.9897C8.52154 18.2064 8.15063 18.4296 7.97339 18.6593L8.17033 20.3333ZM11.991 8.6154H12.8969C15.4374 8.6154 16.7077 10.296 16.7077 13.6571C16.7077 14.8256 16.5731 15.7348 16.304 16.3847C16.0414 17.0346 15.6672 17.4908 15.1814 17.7534C14.6956 18.0094 14.1146 18.1375 13.4385 18.1375H11.991V8.6154Z"
                                    fill="white"
                                />
                            </svg>
                            <span>Pay 결제</span>
                        </button>
                    </div>
                </div>
            )}

            {simple && <SimplePassword handler={() => payHandler()} exit={() => setSimple(false)} />}

            {mfa.show && <MfaModal confirmHandler={() => mfaHandler()} setMfa={setMfa} mfa={mfa} />}
        </>
    );
};

export default PayPage;
