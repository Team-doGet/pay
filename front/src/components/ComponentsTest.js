import React, { useEffect, useState } from 'react';
import BaseLayout from '../layouts/BaseLayout';
import Button from './atoms/Button';
import CheckBox from './atoms/CheckBox';
import agreeData from '../mock/agree.json';
import Input from './atoms/Input';
import Modal from './etc/Modal';
import Header from './molecules/Header';

const ComponentsTest = () => {
    const [checkedOne, setCheckedOne] = useState([]);
    const [checked, setChecked] = useState([]);
    const [userInfo, setUserInfo] = useState({
        email: '',
        pw: '',
        pwCheck: '',
    });
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setChecked(agreeData);
    }, []);

    useEffect(() => {
        console.log(userInfo);
    }, [userInfo]);

    const checkBoxHandler = idx => {
        setChecked([...checked, (checked[idx].isChecked = !checked[idx].isChecked)]);
    };

    return (
        <>
            <Header title="컴포넌트 테스트" isBack={true}></Header>
            <BaseLayout>
                {/* 버튼 */}
                <Button width="full" type="main" handler={() => setShowModal(true)}>
                    확인
                </Button>
                <br />
                <Button width="full" type="sub">
                    확인
                </Button>
                <br />
                <div style={{ display: 'flex', gap: '4%' }}>
                    <Button width="half" type="main" handler={() => alert('asd')}>
                        확인
                    </Button>
                    <Button width="half" type="sub" handler={() => setShowModal(true)}>
                        취소
                    </Button>
                </div>
                <br />

                {/* 체크박스 */}
                {agreeData.map((data, idx) => (
                    <CheckBox checked={data.isChecked} setChecked={() => checkBoxHandler(idx)} type={data.type}>
                        {data.title}
                    </CheckBox>
                ))}
                <CheckBox checked={checkedOne} setChecked={() => setCheckedOne(!checkedOne)}>
                    아이디 저장
                </CheckBox>
                <br />

                {/* 인풋박스 */}
                <Input placholder="이메일" location="one" />
                <br />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Input
                        placholder="이메일"
                        type="email"
                        location="top"
                        name="email"
                        inputs={userInfo}
                        setInputsState={setUserInfo}
                    />
                    <Input
                        placholder="비밀번호"
                        type="password"
                        location="mid"
                        name="pw"
                        inputs={userInfo}
                        setInputsState={setUserInfo}
                    />
                    <Input
                        placholder="비밀번호 확인"
                        type="password"
                        location="bottom"
                        name="pwCheck"
                        inputs={userInfo}
                        setInputsState={setUserInfo}
                    />
                </div>
            </BaseLayout>
            {/* 모달 */}
            {showModal && (
                <Modal
                    title="간편비밀번호 등록"
                    content="간편비밀번호가 설정되었습니다."
                    handler={() => alert('asd')}
                    setShowModal={setShowModal}
                    cancel={true}
                />
            )}
        </>
    );
};

export default ComponentsTest;
