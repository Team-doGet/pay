import React, { useEffect, useState } from 'react';
import BaseLayout from '../layouts/BaseLayout';
import Button from './atoms/Button';
import CheckBox from './atoms/CheckBox';
import agreeData from '../mock/agree.json';
import Input from './atoms/Input';
import Modal from './etc/Modal/Modal';
import Header from './molecules/Header';
import { useNavigate } from 'react-router';

const ComponentsTest = () => {
    const navigate = useNavigate();
    const [checkedOne, setCheckedOne] = useState([]);
    const [checked, setChecked] = useState([]);
    const [userInfo, setUserInfo] = useState({
        email: '',
        pw: '',
        pwCheck: '',
    });
    const [showModal, setShowModal] = useState(false);
    const [isAllChecked, SetIsAllChecked] = useState(false);

    useEffect(() => {
        setChecked(agreeData);
    }, []);

    useEffect(() => {
        console.log(userInfo);
    }, [userInfo]);

    const checkBoxHandler = idx => {
        setChecked(
            checked.map((item, i) => {
                if (i === idx) {
                    item.isChecked = !item.isChecked;
                }
                return item;
            })
        );
    };

    const checkBoxHandler2 = () => {
        setChecked(checked.map(item => ({ ...item, isChecked: !isAllChecked })));
        SetIsAllChecked(!isAllChecked);
    };

    const successPageHandler = () => {
        navigate('/result', {
            state: {
                headerTitle: '결제완료',
                flag: 'success',
                info: [
                    {
                        title: '페이머니 잔액',
                        content: '10,000원',
                    },
                    {
                        title: '출금계좌 잔액',
                        content: '10,000원',
                    },
                    {
                        title: '출금계좌',
                        content: 'IBK기업 234****3234',
                    },
                ],
                buttons: {
                    childrens: ['홈으로', '페이 머니 내역'],
                    targetUrl: ['/components', '/login'],
                },
            },
        });
    };

    const failPageHandler = () => {
        navigate('/result', {
            state: {
                headerTitle: '결제실패',
                flag: 'fail',
                info: {
                    title: '결제가 실패되었습니다.',
                    contents: ['머니가 부족합니다.', '머니 확인 후 다시 결제해주세요.'],
                },
                buttons: {
                    childrens: ['홈으로', '충전하기'],
                    targetUrl: ['/components', '/login'],
                },
            },
        });
    };

    return (
        <>
            {/* <Header title="컴포넌트 테스트" isBack={true}></Header> */}
            {/* <BaseLayout> */}
            {/* 버튼 */}
            <Button width="full" type="main" handler={() => successPageHandler()}>
                확인
            </Button>
            <br />
            <Button width="full" type="sub" handler={() => navigate('/simple')}>
                확인
            </Button>
            <br />
            <div style={{ display: 'flex', gap: '4%' }}>
                <Button width="half" type="main" handler={() => failPageHandler()}>
                    확인
                </Button>
                <Button width="half" type="sub" handler={() => setShowModal(true)}>
                    취소
                </Button>
            </div>
            <br />

            <CheckBox checked={isAllChecked} setChecked={() => checkBoxHandler2()}>
                전체선택
            </CheckBox>
            {/* 체크박스 */}
            {checked.map((data, idx) => (
                <CheckBox checked={data.isChecked} setChecked={() => checkBoxHandler(idx)} type={data.type}>
                    {data.title}
                </CheckBox>
            ))}
            <CheckBox checked={checkedOne} setChecked={() => setCheckedOne(!checkedOne)}>
                아이디 저장
            </CheckBox>
            <br />

            {/* 인풋박스 */}
            <Input placeholder="이메일" location="one" />
            <br />
            <br />
            <br />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Input
                    placeholder="이메일"
                    type="email"
                    location="top"
                    name="email"
                    inputs={userInfo}
                    setInputsState={setUserInfo}
                />
                <Input
                    placeholder="비밀번호"
                    type="password"
                    location="mid"
                    name="pw"
                    inputs={userInfo}
                    setInputsState={setUserInfo}
                />
                <Input
                    placeholder="비밀번호 확인"
                    type="password"
                    location="bottom"
                    name="pwCheck"
                    inputs={userInfo}
                    setInputsState={setUserInfo}
                />
            </div>
            {/* </BaseLayout> */}
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
