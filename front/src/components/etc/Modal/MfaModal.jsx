import React, { useEffect, useRef, useState } from 'react';
import Modal_ from './MfaModal.module.css';
import Button from '../../atoms/Button';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { modalState } from '../../../states/modalState';

const MfaModal = ({ confirmHandler, setMfa, mfa }) => {
    const darBgRef = useRef(null);
    const modalRef = useRef(null);

    useEffect(() => {
        darBgRef.current.style.top = `${document.documentElement.scrollTop}px`;
        modalRef.current.style.top = `calc(50% + ${document.documentElement.scrollTop}px)`;

        document.body.style.cssText = `
        overflow-y: hidden;
        top: -${window.scrollY}px`;

        return () => {
            document.body.style.cssText = ``;
        };
    }, []);

    const mfaHandler = async () => {
        confirmHandler();
    };

    return (
        <>
            <div className={Modal_.darkBg} ref={darBgRef}></div>
            <div className={Modal_.wrapper} ref={modalRef}>
                <div className={Modal_.contents}>
                    <h2>2FA 인증</h2>
                    <p>2FA 인증번호를 입력해주세요.</p>
                    <input type="number" value={mfa.code} onChange={e => setMfa({ ...mfa, code: e.target.value })} />
                </div>
                <div>
                    <Button width="full" type="main" handler={() => mfaHandler()}>
                        확인
                    </Button>
                </div>
            </div>
        </>
    );
};

export default MfaModal;
