import React, { useEffect, useState } from 'react';
import Input from '../../components/atoms/Input';
import Button from '../../components/atoms/Button';
import JoinInfo from './JoinInfoPage.module.css';
import BottomButtons from '../../components/molecules/common/BottomButtons';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { joinState } from '../../states/joinState';
import useAxios from './../../hooks/useAxios';
import { useNavigate } from 'react-router-dom';
import { loadingState } from '../../states/loadingState';

const JoinInfoPage = () => {
    const api = useAxios();
    const navigate = useNavigate();
    const [join, setJoin] = useRecoilState(joinState);
    const resetJoin = useResetRecoilState(joinState);
    const [loading, setLoading] = useRecoilState(loadingState);
    const [authCode, setAuthCode] = useState({
        email: '',
        sms: '',
    });
    const [authCheck, setAuthCheck] = useState({
        email: false,
        sms: false,
    });
    const [topMsg, setTopMsg] = useState({
        show: false,
        color: '',
        msg: '',
    });
    const [botMsg, setBotMsg] = useState({
        show: false,
        color: '',
        msg: '',
    });

    const msgHandler = (show, color, msg, name) => {
        name === 'email'
            ? setTopMsg({
                  show,
                  color,
                  msg,
              })
            : setBotMsg({
                  show,
                  color,
                  msg,
              });
    };

    const getAuth = async (name, authId) => {
        if (authId === '' || authCode === '') {
            name === 'email'
                ? msgHandler(true, 'red', '이메일 또는 인증번호를 입력하세요.', name)
                : msgHandler(true, '휴대폰번호 또는 인증번호를 입력하세요.', name);
            return;
        }

        setLoading({ ...loading, show: true });
        const res = await api.post(`/${name}/join/auth`, { authId });
        setLoading({ ...loading, show: false });
        console.log(res);
        if (res.data.status === 200) {
            msgHandler(true, 'green', res.data.message, name);
        } else {
            msgHandler(true, 'red', res.data.message, name);
        }
    };

    const checkAuth = async (name, authId, authCode) => {
        const res = await api.get(`/${name}/join/auth?authId=${authId}&authCode=${authCode}`);
        if (res.data.status === 200) {
            setAuthCheck({
                ...authCheck,
                [`${name}`]: true,
            });
            msgHandler(true, 'green', res.data.message, name);
        } else {
            setAuthCheck({
                ...authCheck,
                [`${name}`]: false,
            });
            msgHandler(true, 'red', res.data.message, name);
        }
    };

    const joinHandler = async () => {
        if (join.passwordNo !== join.passwordNoCheck) {
            msgHandler(true, 'red', '비밀번호가 일치하지않습니다.', 'email');
            return;
        }
        if (!authCheck.email) {
            msgHandler(true, 'red', '이메일 인증이 필요합니다.', 'email');
            return;
        }
        if (!authCheck.sms) {
            msgHandler(false, '', '', 'email');
            msgHandler(true, 'red', '휴대폰 인증이 필요합니다.', 'sms');
            return;
        }

        await setJoin({
            ...join,
            phoneNo: join.phoneNo.substring(1, join.phoneNo.length),
        });

        const res = await api.post(`/users/join`, join);
        if (res.data.status === 200) {
            navigate('/join/success');
            resetJoin();
        } else {
            msgHandler(true, 'red', res.data.message, 'sms');
        }
    };

    useEffect(() => {
        setJoin({
            ...join,
            agree1Yn: 'Y',
            agree2Yn: 'Y',
            agree3Yn: join.agree3Yn === true ? 'Y' : 'N',
        });
    }, []);

    return (
        <div
            style={{
                marginLeft: '12px',
                marginRight: '12px',
            }}
        >
            <div>
                <div className={JoinInfo.topInputContainer}>
                    <div className={JoinInfo.inputWithButton}>
                        <div>
                            <Input
                                location="top"
                                type="email"
                                name="emailNo"
                                inputs={join}
                                setInputsState={setJoin}
                                placeholder="이메일"
                            ></Input>
                            <Button width="half" type="main" handler={() => getAuth('email', join.emailNo)}>
                                인증
                            </Button>
                        </div>
                    </div>
                    <div className={JoinInfo.inputWithButton}>
                        <div>
                            <Input
                                location="mid"
                                type="password"
                                name="emailNo"
                                inputs={authCode}
                                setInputsState={setAuthCode}
                                placeholder="인증번호"
                            ></Input>
                            <Button
                                width="half"
                                type="main"
                                handler={() => checkAuth('email', join.emailNo, authCode.emailNo)}
                            >
                                확인
                            </Button>
                        </div>
                    </div>
                    <div>
                        <Input
                            location="mid"
                            type="password"
                            name="passwordNo"
                            inputs={join}
                            setInputsState={setJoin}
                            placeholder="비밀번호"
                        ></Input>
                    </div>
                    <div>
                        <Input
                            location="bottom"
                            type="password"
                            name="passwordNoCheck"
                            inputs={join}
                            setInputsState={setJoin}
                            placeholder="비밀번호 확인"
                        ></Input>
                    </div>
                    {topMsg.show && (
                        <p className={topMsg.color === 'red' ? JoinInfo.red : JoinInfo.green}>{topMsg.msg}</p>
                    )}
                </div>
                <div className={JoinInfo.bottomInputContainer}>
                    <div>
                        <Input
                            location="top"
                            type="text"
                            name="userName"
                            inputs={join}
                            setInputsState={setJoin}
                            placeholder="이름"
                        ></Input>
                    </div>
                    <div className={JoinInfo.inputWithButton}>
                        <div>
                            <Input
                                location="mid"
                                type="text"
                                name="phoneNo"
                                inputs={join}
                                setInputsState={setJoin}
                                placeholder="휴대전화번호"
                            ></Input>
                            <Button width="half" type="main" handler={() => getAuth('sms', join.phoneNo)}>
                                요청
                            </Button>
                        </div>
                    </div>
                    <div className={JoinInfo.inputWithButton}>
                        <div>
                            <Input
                                location="bottom"
                                type="password"
                                name="phoneNo"
                                inputs={authCode}
                                setInputsState={setAuthCode}
                                placeholder="인증번호"
                            ></Input>
                            <Button
                                width="half"
                                type="main"
                                handler={() => checkAuth('sms', join.phoneNo, authCode.phoneNo)}
                            >
                                확인
                            </Button>
                        </div>
                    </div>
                    {botMsg.show && (
                        <p className={botMsg.color === 'red' ? JoinInfo.red : JoinInfo.green}>{botMsg.msg}</p>
                    )}
                </div>
            </div>
            <BottomButtons childrens={['가입하기']} handlers={[() => joinHandler()]} />
        </div>
    );
};

export default JoinInfoPage;
