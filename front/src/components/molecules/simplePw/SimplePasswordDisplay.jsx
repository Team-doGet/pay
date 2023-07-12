import React from 'react';
import { useRecoilValue } from 'recoil';
import Display_ from './SimplePasswordDisplay.module.css';
import { simplePwState } from '../../../states/simplePwState';

const SimplePasswordDisplay = ({ name, email, phrase }) => {
    const { pw } = useRecoilValue(simplePwState);

    return (
        <div className={Display_.pwDisplay}>
            <p>
                {name}({email})님의
            </p>
            <p>{phrase}</p>
            <ul>
                {pw &&
                    pw.map((password, i) =>
                        password === -1 ? (
                            <li>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="22"
                                    height="22"
                                    viewBox="0 0 22 22"
                                    fill="none"
                                >
                                    <circle cx="11" cy="11" r="11" fill="#D9D9D9" />
                                </svg>
                            </li>
                        ) : (
                            <li>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="22"
                                    height="22"
                                    viewBox="0 0 22 22"
                                    fill="none"
                                >
                                    <circle cx="11" cy="11" r="11" fill="#39C4FF" />
                                </svg>
                            </li>
                        )
                    )}
            </ul>
        </div>
    );
};

export default SimplePasswordDisplay;
