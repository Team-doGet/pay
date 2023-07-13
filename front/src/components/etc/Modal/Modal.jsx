import React from 'react';
import modal from './Modal.module.css';
import Button from '../../atoms/Button';

const Modal = ({ title, content, cancel = false, handler, setShowModal }) => {
    return (
        <>
            <div className={modal.darkBg}></div>
            <div className={modal.wrapper}>
                <div className={modal.contents}>
                    <h2>{title}</h2>
                    <p>{content}</p>
                </div>
                {cancel ? (
                    <div className={modal.btnContainer}>
                        <Button width="half" type="main" handler={handler}>
                            예
                        </Button>
                        <Button width="half" type="sub" handler={() => setShowModal(false)}>
                            아니요
                        </Button>
                    </div>
                ) : (
                    <div>
                        <Button width="full" type="main" handler={handler}>
                            확인
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Modal;
