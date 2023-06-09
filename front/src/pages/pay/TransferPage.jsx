import React, { useState } from 'react';
import Transfer_ from './TransferPage.module.css';
import Input from '../../components/atoms/Input';

const TransferPage = () => {
    const [transferInputs, setTransferInputs] = useState({
        phone: '',
        amount: 0,
        messsage: '',
    });
    return (
        <>
            <div className={Transfer_.container}>
                <div className={Transfer_.shopContainer}>
                    <h4 className={Transfer_.title}>받을 사람</h4>
                    <div className={Transfer_.shopInfo}>
                        <Input
                            location="one"
                            type="text"
                            name="phone"
                            inputs={transferInputs}
                            setInputsState={setTransferInputs}
                            placeholder="휴대폰번호 ('-'를 제외하고 입력하세요.)"
                        />
                    </div>
                </div>
                <div className={Transfer_.amountContainer}>
                    <div className={Transfer_.amountTitleContainer}>
                        <h4 className={Transfer_.title}>송금금액</h4>
                        <span>・금액이 맞는지 확인하셨나요?</span>
                    </div>
                    <div className={Transfer_.amountInputContainer}>
                        <input type="number" placeholder="금액을 입력해주세요." />
                    </div>
                    <p>페이머니 : 10,000원</p>
                </div>
                <div className={Transfer_.msgContainer}>
                    <h4 className={Transfer_.title}>메시지</h4>
                    <Input
                        location="one"
                        type="text"
                        name="messsage"
                        inputs={transferInputs}
                        setInputsState={setTransferInputs}
                        placeholder="미입력시 송금자명"
                    />
                </div>
                <div className={Transfer_.noticeContainer}>
                    <h4 className={Transfer_.title}>확인해주세요.</h4>
                    <div>
                        <p>・머니 부족 시 등록된 계좌에서 자동 충전됩니다.</p>
                    </div>
                </div>
            </div>
            <div className={Transfer_.btnContainer}>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M1.83333 0C0.820811 0 0 0.820811 0 1.83333V25.6667C0 26.6792 0.820811 27.5 1.83333 27.5H25.6667C26.6792 27.5 27.5 26.6792 27.5 25.6667V1.83333C27.5 0.820811 26.6792 0 25.6667 0H1.83333ZM8.17033 20.3333H13.3203C14.6398 20.3333 15.7788 20.097 16.7372 19.6243C17.6957 19.1451 18.4342 18.4066 18.9528 17.4088C19.4714 16.4109 19.7307 15.1308 19.7307 13.5684C19.7307 12.006 19.4419 10.6964 18.8642 9.63949C18.2931 8.57601 17.479 7.77512 16.4221 7.23682C15.3652 6.69195 14.1146 6.41951 12.6704 6.41951H8.17033L7.97339 8.0935C8.1572 8.34953 8.5281 8.57601 9.0861 8.77295V17.9897C8.52154 18.2064 8.15063 18.4296 7.97339 18.6593L8.17033 20.3333ZM11.991 8.6154H12.8969C15.4374 8.6154 16.7077 10.296 16.7077 13.6571C16.7077 14.8256 16.5731 15.7348 16.304 16.3847C16.0414 17.0346 15.6672 17.4908 15.1814 17.7534C14.6956 18.0094 14.1146 18.1375 13.4385 18.1375H11.991V8.6154Z"
                            fill="white"
                        />
                    </svg>
                    <span>Pay 결제</span>
                </button>
            </div>
        </>
    );
};

export default TransferPage;
