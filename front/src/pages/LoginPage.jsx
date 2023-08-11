import React, { useEffect, useState } from 'react';
import Input from '../components/atoms/Input';
import CheckBox from '../components/atoms/CheckBox';
import Button from '../components/atoms/Button';
import { Link, useNavigate } from 'react-router-dom';
import Login from './LoginPage.module.css';
import useAxios from '../hooks/useAxios';
import { useRecoilState } from 'recoil';
import { modalState } from '../states/modalState';
import { userState } from '../states/userState';
import { loadingState } from '../states/loadingState';

const LoginPage = () => {
    const api = useAxios('');
    const navigate = useNavigate();
    const [modal, setModal] = useRecoilState(modalState);
    const [user, setUser] = useRecoilState(userState);
    const [loading, setLoading] = useRecoilState(loadingState);
    const [saveIdChecked, setSaveIdChecked] = useState([false]);
    const [loginInputs, setLoginInputs] = useState({
        emailNo: '',
        passwordNo: '',
    });
    const [msg, setMsg] = useState('');

    const loginHandler = async () => {
        setLoading({ ...loading, show: true });
        const res = await api.post(`/users/login`, loginInputs);
        setLoading({ ...loading, show: false });
        if (res.data.status == 200) {
            (async () => {
                await setUser(res.data.data);
                await navigate('/');
            })();
        } else {
            setMsg(res.data.message);
        }
    };

    useEffect(() => {
        api.defaults.headers.common.Authorization = '';
    }, []);

    return (
        <div
            style={{
                marginLeft: '12px',
                marginRight: '12px',
            }}
        >
            <div className={Login.logo}>
                <img src={`${process.env.PUBLIC_URL}/assets/img/common/logo.svg`} />
            </div>
            <div className={Login.inputContainer}>
                <div className={Login.inputSubContainer}>
                    <div>
                        <Input
                            placeholder="아이디를 입력하세요"
                            location="one"
                            name="emailNo"
                            type="email"
                            inputs={loginInputs}
                            setInputsState={setLoginInputs}
                        />
                    </div>
                    <div>
                        <Input
                            placeholder="비밀번호를 입력하세요"
                            location="one"
                            type="password"
                            name="passwordNo"
                            inputs={loginInputs}
                            setInputsState={setLoginInputs}
                        />
                    </div>
                    <p className={Login.warnMsg}>{msg}</p>
                </div>
                <div>
                    <CheckBox checked={saveIdChecked} setChecked={() => setSaveIdChecked(!saveIdChecked)}>
                        아이디 저장
                    </CheckBox>
                </div>
            </div>
            <div>
                <div className={Login.buttonContainer}>
                    <div>
                        <Button width="full" type="main" handler={() => loginHandler()}>
                            로그인
                        </Button>
                    </div>
                    <div>
                        <Button width="full" type="sub" handler={() => navigate('/join/agree')}>
                            회원가입
                        </Button>
                    </div>
                </div>
                <div>
                    <Link>아이디 찾기</Link> | <Link>비밀번호 찾기</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
