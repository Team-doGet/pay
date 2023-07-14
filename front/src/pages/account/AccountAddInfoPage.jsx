import React, { useState } from 'react';
import Input from '../../components/atoms/Input';
import AccountAddInfo from './AccountAddInfoPage.module.css';
import BottomButtons from '../../components/molecules/common/BottomButtons';
import { useNavigate } from 'react-router-dom';

const AccountAddInfoPage = () => {
    const navigate = useNavigate();

    const [inputAccount, setInputAccount] = useState({
        num: '',
    });
    return (
        <div>
            <div className={AccountAddInfo.top}>금액 설정은 만원 단위로 가능합니다.</div>
            <Input
                location="one"
                type="text"
                name="num"
                inputs={inputAccount}
                setInputsState={setInputAccount}
                placeholder="'-'없이 계좌번호 입력"
            />
            <div className={AccountAddInfo.bank}>
                <ul>
                    <li>
                        <div>KB국민</div>
                    </li>
                    <li>
                        <div>IBK기업</div>
                    </li>
                    <li>
                        <div>NH농협</div>
                    </li>
                    <li>
                        <div>신한</div>
                    </li>
                </ul>
            </div>
            <div className={AccountAddInfo.bank}>
                <ul>
                    <li>
                        <div>KB국민</div>
                    </li>
                    <li>
                        <div>IBK기업</div>
                    </li>
                    <li>
                        <div>NH농협</div>
                    </li>
                    <li>
                        <div>신한</div>
                    </li>
                </ul>
            </div>
            <div className={AccountAddInfo.bank}>
                <ul>
                    <li>
                        <div>KB국민</div>
                    </li>
                    <li>
                        <div>IBK기업</div>
                    </li>
                    <li>
                        <div>NH농협</div>
                    </li>
                    <li>
                        <div>신한</div>
                    </li>
                </ul>
            </div>
            <div className={AccountAddInfo.bank}>
                <ul>
                    <li>
                        <div>KB국민</div>
                    </li>
                    <li>
                        <div>IBK기업</div>
                    </li>
                    <li>
                        <div>NH농협</div>
                    </li>
                    <li>
                        <div>신한</div>
                    </li>
                </ul>
            </div>
            <div className={AccountAddInfo.bottom}>
                <div>해당 계좌는 등록이 불가능한 계좌입니다.</div>
                <div>평생계좌번호 및 맞춤계좌번호, 가상계좌 등의 계좌는 페이 등록이 불가능합니다.</div>
                <div>등록 가능한 계좌 확인은 등록하려는 은행의 고객센터로 문의하세요.</div>
            </div>
            <div>
                <BottomButtons
                    childrens={['등록하기']}
                    handlers={[() => navigate('/account/add/auth')]}
                ></BottomButtons>
            </div>
        </div>
    );
};

export default AccountAddInfoPage;
