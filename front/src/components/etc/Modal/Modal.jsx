import React, { useEffect, useRef } from 'react';
import Modal_ from './Modal.module.css';
import Button from '../../atoms/Button';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { modalState } from '../../../states/modalState';

const Modal = () => {
    const { title, content, confirmHandler, cancel } = useRecoilValue(modalState);
    const resetModal = useResetRecoilState(modalState);
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

    return (
        <>
            <div className={Modal_.darkBg} ref={darBgRef}></div>
            <div className={Modal_.wrapper} ref={modalRef}>
                <div className={Modal_.contents}>
                    <h2>{title}</h2>
                    <p>{content}</p>
                </div>
                {cancel ? (
                    <div className={Modal_.btnContainer}>
                        <Button width="half" type="main" handler={confirmHandler}>
                            예
                        </Button>
                        <Button width="half" type="sub" handler={() => resetModal()}>
                            아니요
                        </Button>
                    </div>
                ) : (
                    <div>
                        <Button width="full" type="main" handler={confirmHandler}>
                            확인
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Modal;
