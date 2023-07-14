import React, { useState } from 'react';
import Input from '../../components/atoms/Input';
import Button from '../../components/atoms/Button';
import JoinInfo from './JoinInfoPage.module.css';
import BottomButtons from '../../components/molecules/common/BottomButtons';

const JoinInfoPage = () => {
    const [idJoinInputs, setIdJoinInputs] = useState({
        id: '',
        emailCode: '',
        pwd: '',
        pwdCheck: '',
    });

    const [nameJoinInputs, setNameJoinInputs] = useState({
        name: '',
        phone: '',
        phoneCode: '',
    });

    return (
        <>
            <div>
                <div className={JoinInfo.topInputContainer}>
                    <div className={JoinInfo.inputWithButton}>
                        <div>
                            <Input
                                location="top"
                                type="email"
                                name="id"
                                inputs={idJoinInputs}
                                setInputsState={setIdJoinInputs}
                                placeholder="이메일"
                            ></Input>
                            <Button width="half" type="main">
                                인증
                            </Button>
                        </div>
                    </div>
                    <div className={JoinInfo.inputWithButton}>
                        <div>
                            <Input
                                location="mid"
                                type="text"
                                name="emailCode"
                                inputs={idJoinInputs}
                                setInputsState={setIdJoinInputs}
                                placeholder="인증번호"
                            ></Input>
                            <Button width="half" type="main">
                                확인
                            </Button>
                        </div>
                    </div>
                    <div>
                        <Input
                            location="mid"
                            type="password"
                            name="pwd"
                            inputs={idJoinInputs}
                            setInputsState={setIdJoinInputs}
                            placeholder="비밀번호"
                        ></Input>
                    </div>
                    <div>
                        <Input
                            location="bottom"
                            type="password"
                            name="pwd"
                            inputs={idJoinInputs}
                            setInputsState={setIdJoinInputs}
                            placeholder="비밀번호 확인"
                        ></Input>
                    </div>
                    <p className={JoinInfo.p_Color}>비밀번호: 필수 정보입니다.</p>
                </div>
                <div className={JoinInfo.bottomInputContainer}>
                    <div>
                        <Input
                            location="top"
                            type="text"
                            name="name"
                            inputs={nameJoinInputs}
                            setInputsState={setNameJoinInputs}
                            placeholder="이름"
                        ></Input>
                    </div>
                    <div className={JoinInfo.inputWithButton}>
                        <div>
                            <Input
                                location="mid"
                                type="text"
                                name="phone"
                                inputs={nameJoinInputs}
                                setInputsState={setNameJoinInputs}
                                placeholder="휴대전화번호"
                            ></Input>
                            <Button width="half" type="main">
                                요청
                            </Button>
                        </div>
                    </div>
                    <div className={JoinInfo.inputWithButton}>
                        <div>
                            <Input
                                location="bottom"
                                type="text"
                                name="phoneCode"
                                inputs={nameJoinInputs}
                                setInputsState={setNameJoinInputs}
                                placeholder="인증번호"
                            ></Input>
                            <Button width="half" type="main">
                                확인
                            </Button>
                        </div>
                    </div>
                    <p className={JoinInfo.p_Color}>인증번호: 필수 정보입니다.</p>
                </div>
            </div>
            <BottomButtons childrens={['가입하기']} handlers={() => alert('asd')} />
        </>
    );
};

export default JoinInfoPage;
