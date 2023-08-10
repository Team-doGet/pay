import Input from '../../components/atoms/Input';
import React, { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import resetPw from './ResetPassWord.module.css';
import useAuth from '../../hooks/useAuth';
import { userState } from '../../states/userState';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/atoms/Button';
import { modalState } from '../../states/modalState';

const ResetSimplePassWord = () => {
    useAuth();
    const user = useRecoilValue(userState);
    const navigate = useNavigate();
    const [modal, setModal] = useRecoilState(modalState);
    const resetModal = useResetRecoilState(modalState);
    const api = useAxios({
        Authorization: `Bearer ${user.accessToken}`,
    });

    const [resetSimplePassword, setResetSimplePassword] = useState({
        present_pw: '',
        simple_new_pw: '',
        new_simple_pw_check: '',
    });
    const [warning, setWarning] = useState({
        present: {
            show: false,
            msg: '',
        },
        new: {
            show: false,
            msg: '',
        },
    });

    useEffect(() => {
        console.log(resetSimplePassword);
    }, [resetSimplePassword]);

    const handleCancel = () => {
        navigate('/mypage');
    };

    const handleResetSimplePassword = async () => {
        if (resetSimplePassword.simple_new_pw !== resetSimplePassword.new_simple_pw_check) {
            // 비밀번호 확인 불일치
            setWarning({
                ...warning,
                new: {
                    show: true,
                    msg: '비밀번호가 일치하지 않습니다.',
                },
            });
            return;
        } else if (resetSimplePassword.present_pw === '') {
            setWarning({
                new: {
                    show: false,
                    msg: '',
                },
                present: {
                    show: true,
                    msg: '비밀번호를 입력해주세요.',
                },
            });
            return;
        } else if (resetSimplePassword.simple_new_pw === '' || resetSimplePassword.new_simple_pw_check === '') {
            setWarning({
                present: {
                    show: false,
                    msg: '',
                },
                new: {
                    show: true,
                    msg: '비밀번호를 입력해주세요.',
                },
            });
            return;
        }

        try {
            const resp = await api.post('/myInfo/checkOldPassword', {
                userId: String(user.userId),
                oldPassword: resetSimplePassword.present_pw,
            });

            if (resp.data.status === 400) {
                // 현재 비밀번호 불일치
                setWarning({
                    new: {
                        show: false,
                        msg: '',
                    },
                    present: {
                        show: true,
                        msg: '기존 비밀번호가 일치하지 않습니다.',
                    },
                });
                return;
            }
            setWarning({
                new: {
                    show: false,
                    msg: '',
                },
                present: {
                    show: false,
                    msg: '',
                },
            });
            const res = await api.post('/myInfo/resetpassword', {
                userId: String(user.userId),
                newSimplePassword: resetSimplePassword.simple_new_pw,
            });
            if (res.data.status == 200) {
                setModal({
                    show: true,
                    title: '성공',
                    content: '비밀번호 변경에 성공하였습니다.',
                    confirmHandler: () => {
                        navigate('/mypage');
                        resetModal();
                    },
                    cancel: false,
                });
            } else {
                setModal({
                    show: true,
                    title: '실패',
                    content: '비밀번호 변경에 실패하였습니다.',
                    confirmHandler: () => {
                        navigate('/mypage');
                        resetModal();
                    },
                    cancel: false,
                });
            }
        } catch (error) {
            console.error('비밀번호 재설정 오류:', error);
            setModal({
                show: true,
                title: '실패',
                content: '비밀번호 변경에 실패하였습니다. 관리자에게 문의하세요.',
                confirmHandler: () => {
                    navigate('/mypage');
                    resetModal();
                },
                cancel: false,
            });
        }
    };

    return (
        <div>
            <div>
                {/* <h2>비밀번호 변경</h2> */}
                <p className={resetPw.top}>안전한 비밀번호로 내정보를 보호하세요</p>
                <ul>
                    <li className={resetPw.redText}>- 다른 아이디/사이트에서 사용한 적 없는 간편 비밀번호</li>
                    <li className={resetPw.redText}>- 이전에 사용한 적 없는 간편 비밀번호가 안전합니다.</li>
                </ul>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }} className={resetPw.topInput}>
                <Input
                    placeholder="현재 비밀번호( 간편비밀번호가 아닌 비밀번호를 입력하세요.)"
                    type="password"
                    location="one"
                    name="present_pw"
                    inputs={resetSimplePassword}
                    setInputsState={setResetSimplePassword}
                />
                {warning.present.show && <p className={resetPw.warning}>{warning.present.msg}</p>}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }} className={resetPw.midInput}>
                <Input
                    placeholder="새 간편 비밀번호"
                    type="password"
                    location="top"
                    name="simple_new_pw"
                    inputs={resetSimplePassword}
                    setInputsState={setResetSimplePassword}
                />
                <Input
                    placeholder="새 간편 비밀번호 확인"
                    type="password"
                    location="bottom"
                    name="new_simple_pw_check"
                    inputs={resetSimplePassword}
                    setInputsState={setResetSimplePassword}
                />
                {warning.new.show && <p className={resetPw.warning}>{warning.new.msg}</p>}
            </div>
            <div className={resetPw.button}>
                <Button width="full" type="main" handler={() => handleResetSimplePassword()}>
                    확인
                </Button>
                <Button width="full" type="sub" handler={() => handleCancel()}>
                    취소
                </Button>
            </div>
        </div>
    );
};

export default ResetSimplePassWord;
