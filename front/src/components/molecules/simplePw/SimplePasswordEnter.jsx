import React, { useEffect } from 'react';
import Enter_ from './SimplePasswordEnter.module.css';
import arr from '../../../mock/passwordKeyPad';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { simplePwState } from '../../../states/simplePwState';

const SimplePasswordEnter = ({ handler }) => {
    const [passwords, setPasswords] = useRecoilState(simplePwState);
    const resetPasswords = useResetRecoilState(simplePwState);
    const { pw, pwIdx } = passwords;

    useEffect(() => {
        return () => {
            resetPasswords();
        };
    }, []);

    const passwordClickHandler = value => {
        if (value >= 0) {
            if (pwIdx <= 5) {
                const tmp = [...pw];
                tmp[pwIdx] = parseInt(value);
                setPasswords({ ...passwords, pw: tmp, pwIdx: pwIdx + 1 });

                if (pwIdx === 5) {
                    console.log('api 요청(마지막 비밀번호 처리해줘야함)');
                    handler();
                }
            }
        } else if (value === -1) {
            setPasswords({ ...passwords, pw: Array.from({ length: 6 }, () => -1), pwIdx: 0 });
        } else if (pwIdx > 0) {
            const tmp = [...pw];
            tmp[pwIdx - 1] = -1;
            setPasswords({ ...passwords, pw: tmp, pwIdx: pwIdx - 1 });
        }
    };

    return (
        <div className={Enter_.pwEnterContainer}>
            <div className={Enter_.pwEnterWrapper}>
                <table className={Enter_.pwTable}>
                    <tbody>
                        {arr.map((num, i) => {
                            return (
                                <tr>
                                    <td>
                                        <button value={num[0]} onClick={() => passwordClickHandler(num[0])}>
                                            {num[0]}
                                        </button>
                                    </td>
                                    <td>
                                        <button value={num[1]} onClick={() => passwordClickHandler(num[1])}>
                                            {num[1]}
                                        </button>
                                    </td>
                                    <td>
                                        <button value={num[2]} onClick={() => passwordClickHandler(num[2])}>
                                            {num[2]}
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        <tr>
                            <td>
                                <button value={-1} onClick={() => passwordClickHandler(-1)}>
                                    전체삭제
                                </button>
                            </td>
                            <td>
                                <button value={0} onClick={() => passwordClickHandler(0)}>
                                    0
                                </button>
                            </td>
                            <td>
                                <button value={-2} onClick={() => passwordClickHandler(-2)}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="27"
                                        height="19"
                                        viewBox="0 0 27 19"
                                        fill="none"
                                    >
                                        <g opacity="0.4">
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M10.5878 0H24.8678C25.9718 0 26.8678 0.895 26.8678 2V17C26.8678 18.105 25.9718 19 24.8678 19H10.5868C9.48881 19 8.43881 18.548 7.68281 17.751L1.17081 10.875C0.439809 10.105 0.439809 8.895 1.17081 8.125L7.68381 1.249C8.43981 0.452 9.48981 0 10.5878 0Z"
                                                fill="black"
                                            />
                                            <path d="M12 5L21 14M21 5L12 14" stroke="white" strokeWidth="1.5" />
                                        </g>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SimplePasswordEnter;
