import React, { useState } from 'react';
import Input from '../../components/atoms/Input';
import BottomButtons from '../../components/molecules/common/BottomButtons';
import { useNavigate } from 'react-router-dom';
import Charge from './ChargePage.module.css';

const ChargePage = () => {
    const navigate = useNavigate();

    const [inputAmount, setInputAmount] = useState({
        amount: '',
    });

    return (
        <>
            <div className={Charge.top}>
                <p>금액 설정은 만원 단위로 가능합니다.</p>
            </div>
            <div>
                <Input
                    location="one"
                    type="text"
                    name="amount"
                    inputs={inputAmount}
                    setInputsState={setInputAmount}
                    placeholder="충전 금액"
                ></Input>
            </div>
            <div className={Charge.bottom}>
                <div className={Charge.sub}>출금 계좌</div>
                <div className={Charge.select}>
                    <div>IBK기업 234*****3234</div>
                    <div>
                        <img src={`${process.env.PUBLIC_URL}/assets/img/common/selectArrow.svg`}></img>
                    </div>
                </div>
            </div>
            <BottomButtons childrens={['충전하기']} handlers={[() => navigate('/charge/simplePassword')]} />
        </>
    );
};

export default ChargePage;
