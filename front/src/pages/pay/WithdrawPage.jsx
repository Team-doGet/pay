import React, { useState } from 'react';
import Input from '../../components/atoms/Input';
import BottomButtons from '../../components/molecules/common/BottomButtons';
import { useNavigate } from 'react-router-dom';
import Withdraw from './WithdrawPage.module.css';

const WithdrawPage = () => {
    const navigate = useNavigate();

    const [inputAmount, setInputAmount] = useState({
        amount: '',
    });

    return (
        <>
            <div className={Withdraw.top}>
                <p>금액 설정은 만원 단위로 가능합니다.</p>
            </div>
            <div className={Withdraw.p}>
                <Input
                    location="one"
                    type="text"
                    name="amount"
                    inputs={inputAmount}
                    setInputsState={setInputAmount}
                    placeholder="인출 금액"
                ></Input>
                <p>페이머니 : 10,512원</p>
            </div>
            <div className={Withdraw.bottom}>
                <div className={Withdraw.sub}>인출 받을 계좌</div>
                <div className={Withdraw.select}>
                    <div>IBK기업 234*****3234</div>
                    <div>
                        <img src={`${process.env.PUBLIC_URL}/assets/img/common/selectArrow.svg`}></img>
                    </div>
                </div>
            </div>
            <BottomButtons childrens={['인출하기']} handlers={[() => navigate('/withdraw/simplePassword')]} />
        </>
    );
};

export default WithdrawPage;
