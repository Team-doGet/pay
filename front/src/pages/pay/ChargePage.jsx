import React, { useState } from 'react';
import Input from '../../components/atoms/Input';
import BottomButtons from '../../components/molecules/common/BottomButtons';
import { useNavigate } from 'react-router-dom';
import Charge from './ChargePage.module.css';
import AccountSelect from '../../components/molecules/BottomModal/AccountSelect';
import { accountSelectState } from '../../states/accountSelectState';
import { useRecoilState } from 'recoil';

const ChargePage = () => {
    const navigate = useNavigate();
    const [accountSelect, setAccountSelect] = useRecoilState(accountSelectState);

    const [inputAmount, setInputAmount] = useState({
        amount: '',
    });

    return (
        <>
            <div className={Charge.top}>
                <p>금액 설정은 만원 단위로 가능합니다.</p>
            </div>

            <div className={Charge.amountContainer}>
                <h4 className={Charge.title}>충전금액</h4>
                <div>
                    <input type="number" placeholder="금액을 입력해주세요." />
                </div>
                <p>페이머니 : 10,000원</p>
            </div>
            <h4 className={Charge.title1}>계좌선택</h4>
            <div className={Charge.bottom} onClick={() => setAccountSelect({ ...accountSelect, show: true })}>
                <div className={Charge.sub}>출금 계좌</div>
                <div className={Charge.select}>
                    <div>IBK기업 234*****3234</div>
                    <div>
                        <img src={`${process.env.PUBLIC_URL}/assets/img/common/selectArrow.svg`}></img>
                    </div>
                </div>
            </div>
            <BottomButtons childrens={['충전하기']} handlers={[() => navigate('/charge/simplePassword')]} />
            {accountSelect.show && <AccountSelect />}
        </>
    );
};

export default ChargePage;
