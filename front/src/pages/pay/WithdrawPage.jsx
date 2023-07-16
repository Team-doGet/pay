import React, { useState } from 'react';
import Input from '../../components/atoms/Input';
import BottomButtons from '../../components/molecules/common/BottomButtons';
import { useNavigate } from 'react-router-dom';
import Withdraw from './WithdrawPage.module.css';
import AccountSelect from '../../components/molecules/BottomModal/AccountSelect';
import { useRecoilState } from 'recoil';
import { accountSelectState } from '../../states/accountSelectState';

const WithdrawPage = () => {
    const navigate = useNavigate();
    const [accountSelect, setAccountSelect] = useRecoilState(accountSelectState);

    const [inputAmount, setInputAmount] = useState({
        amount: '',
    });

    return (
        <>
            <div className={Withdraw.top}>
                <p>금액 설정은 만원 단위로 가능합니다.</p>
            </div>
            <div className={Withdraw.amountContainer}>
                <h4 className={Withdraw.title}>인출금액</h4>
                <div>
                    <input type="number" placeholder="금액을 입력해주세요." />
                </div>
                <p>페이머니 : 10,000원</p>
            </div>
            <div className={Withdraw.bottom} onClick={() => setAccountSelect({ ...accountSelect, show: true })}>
                <div className={Withdraw.sub}>인출 받을 계좌</div>
                <div className={Withdraw.select}>
                    <div>IBK기업 234*****3234</div>
                    <div>
                        <img src={`${process.env.PUBLIC_URL}/assets/img/common/selectArrow.svg`}></img>
                    </div>
                </div>
            </div>
            <BottomButtons childrens={['인출하기']} handlers={[() => navigate('/withdraw/simplePassword')]} />
            {accountSelect.show && <AccountSelect />}
        </>
    );
};

export default WithdrawPage;
