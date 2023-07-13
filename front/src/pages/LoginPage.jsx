import React, { useEffect, useState } from 'react';
import Input from '../components/atoms/Input';
import CheckBox from '../components/atoms/CheckBox';
import Button from '../components/atoms/Button';
import { Link, useNavigate } from 'react-router-dom';
import Login from './LoginPage.module.css';

const LoginPage = () => {
    const navigate = useNavigate();

    const [saveIdChecked, setSaveIdChecked] = useState([false]);
    const [loginInputs, setLoginInputs] = useState({
        id: '',
        pwd: '',
    });

    useEffect(() => {
        console.log(loginInputs);
    }, [loginInputs]);

    return (
        <div>
            <div className={Login.logo}>
                <img src={`${process.env.PUBLIC_URL}/assets/img/common/logo.svg`} />
            </div>
            <div className={Login.inputContainer}>
                <div className={Login.inputSubContainer}>
                    <div>
                        <Input
                            placeholder="아이디를 입력하세요"
                            location="one"
                            name="id"
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
                            name="pwd"
                            inputs={loginInputs}
                            setInputsState={setLoginInputs}
                        />
                    </div>
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
                        <Button width="full" type="main">
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
