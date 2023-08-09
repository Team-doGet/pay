import React, { useEffect, useState } from 'react';
import Input from '../../components/atoms/Input';
import AccountAddInfo from './AccountAddInfoPage.module.css';
import BottomButtons from '../../components/molecules/common/BottomButtons';
import { useNavigate } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import useAuth from '../../hooks/useAuth';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from '../../states/userState';
import getRandomNumber from '../../mock/randomBalance';

const AccountAddInfoPage = () => {
    useAuth();
    const user = useRecoilValue(userState);
    const navigate = useNavigate();
    const api = useAxios({
        Authorization: `Bearer ${user.accessToken}`,
    });

    const [errorMessage, setErrorMessage] = useState('');

    const [inputAccount, setInputAccount] = useState({
        accountNo: '',
        bankCode: '',
        accountHolderName: user.userName,
        accountBalance: getRandomNumber(),
        payId: user.userId,
    });

    const checkDuplicateAccount = async () => {
        const { accountNo } = inputAccount;
        const resp = await api.post('/pay/accounts/checkDuplicate', { accountNo });
        console.log(resp.data);
        if (resp.data.status === 200) {
            // 중복되는 계좌번호가 없는 경우, 계좌 등록 API 호출

            navigate('/account/add/auth', {
                state: {
                    accountNo: inputAccount.accountNo,
                    bankCode: inputAccount.bankCode,
                    accountHolderName: inputAccount.accountHolderName,
                    accountBalance: inputAccount.accountBalance,
                    payId: inputAccount.payId,
                },
            });
        } else {
            setErrorMessage(resp.data.message);
        }
    };

    const [selectedBank, setSelectedBank] = useState(null);

    useEffect(() => {
        console.log(inputAccount);
    }, [inputAccount]);

    return (
        <div>
            <div className={AccountAddInfo.top}>금액 설정은 만원 단위로 가능합니다.</div>
            <Input
                location="one"
                type="number"
                name="accountNo"
                inputs={inputAccount}
                setInputsState={setInputAccount}
                placeholder="'-'없이 계좌번호 입력"
            />
            <div className={AccountAddInfo.error}>{errorMessage}</div>
            <div className={AccountAddInfo.bank}>
                <ul>
                    <li>
                        <button
                            value="004"
                            onClick={e => {
                                setInputAccount({ ...inputAccount, bankCode: e.target.value });
                                setSelectedBank('004');
                            }}
                            className={selectedBank === '004' ? AccountAddInfo.selected : ''}
                        >
                            KB국민
                        </button>
                    </li>
                    <li>
                        <button
                            value="003"
                            onClick={e => {
                                setInputAccount({ ...inputAccount, bankCode: e.target.value });
                                setSelectedBank('003');
                            }}
                            className={selectedBank === '003' ? AccountAddInfo.selected : ''}
                        >
                            IBK기업
                        </button>
                    </li>
                    <li>
                        <button
                            value="011"
                            onClick={e => {
                                setInputAccount({ ...inputAccount, bankCode: e.target.value });
                                setSelectedBank('011');
                            }}
                            className={selectedBank === '011' ? AccountAddInfo.selected : ''}
                        >
                            NH농협
                        </button>
                    </li>
                    <li>
                        <button
                            value="088"
                            onClick={e => {
                                setInputAccount({ ...inputAccount, bankCode: e.target.value });
                                setSelectedBank('088');
                            }}
                            className={selectedBank === '088' ? AccountAddInfo.selected : ''}
                        >
                            신한
                        </button>
                    </li>
                </ul>
            </div>
            <div className={AccountAddInfo.bank}>
                <ul>
                    <li>
                        <button
                            value="027"
                            onClick={e => {
                                setInputAccount({ ...inputAccount, bankCode: e.target.value });
                                setSelectedBank('027');
                            }}
                            className={selectedBank === '027' ? AccountAddInfo.selected : ''}
                        >
                            씨티
                        </button>
                    </li>
                    <li>
                        <button
                            value="023"
                            onClick={e => {
                                setInputAccount({ ...inputAccount, bankCode: e.target.value });
                                setSelectedBank('023');
                            }}
                            className={selectedBank === '023' ? AccountAddInfo.selected : ''}
                        >
                            SC제일
                        </button>
                    </li>
                    <li>
                        <button
                            value="020"
                            onClick={e => {
                                setInputAccount({ ...inputAccount, bankCode: e.target.value });
                                setSelectedBank('020');
                            }}
                            className={selectedBank === '020' ? AccountAddInfo.selected : ''}
                        >
                            우리
                        </button>
                    </li>
                    <li>
                        <button
                            value="090"
                            onClick={e => {
                                setInputAccount({ ...inputAccount, bankCode: e.target.value });
                                setSelectedBank('090');
                            }}
                            className={selectedBank === '090' ? AccountAddInfo.selected : ''}
                        >
                            카카오뱅크
                        </button>
                    </li>
                </ul>
            </div>
            <div className={AccountAddInfo.bank}>
                <ul>
                    <li>
                        <button
                            value="081"
                            onClick={e => {
                                setInputAccount({ ...inputAccount, bankCode: e.target.value });
                                setSelectedBank('081');
                            }}
                            className={selectedBank === '081' ? AccountAddInfo.selected : ''}
                        >
                            하나
                        </button>
                    </li>
                    <li>
                        <button
                            value="089"
                            onClick={e => {
                                setInputAccount({ ...inputAccount, bankCode: e.target.value });
                                setSelectedBank('089');
                            }}
                            className={selectedBank === '089' ? AccountAddInfo.selected : ''}
                        >
                            케이뱅크
                        </button>
                    </li>
                    <li>
                        <button
                            value="007"
                            onClick={e => {
                                setInputAccount({ ...inputAccount, bankCode: e.target.value });
                                setSelectedBank('007');
                            }}
                            className={selectedBank === '007' ? AccountAddInfo.selected : ''}
                        >
                            수협
                        </button>
                    </li>
                    <li>
                        <button
                            value="071"
                            onClick={e => {
                                setInputAccount({ ...inputAccount, bankCode: e.target.value });
                                setSelectedBank('071');
                            }}
                            className={selectedBank === '071' ? AccountAddInfo.selected : ''}
                        >
                            우체국
                        </button>
                    </li>
                </ul>
            </div>
            <div className={AccountAddInfo.bank}>
                <ul>
                    <li>
                        <button
                            value="034"
                            onClick={e => {
                                setInputAccount({ ...inputAccount, bankCode: e.target.value });
                                setSelectedBank('034');
                            }}
                            className={selectedBank === '034' ? AccountAddInfo.selected : ''}
                        >
                            광주
                        </button>
                    </li>
                    <li>
                        <button
                            value="031"
                            onClick={e => {
                                setInputAccount({ ...inputAccount, bankCode: e.target.value });
                                setSelectedBank('031');
                            }}
                            className={selectedBank === '031' ? AccountAddInfo.selected : ''}
                        >
                            대구
                        </button>
                    </li>
                    <li>
                        <button
                            value="092"
                            onClick={e => {
                                setInputAccount({ ...inputAccount, bankCode: e.target.value });
                                setSelectedBank('092');
                            }}
                            className={selectedBank === '092' ? AccountAddInfo.selected : ''}
                        >
                            토스뱅크
                        </button>
                    </li>
                    <li>
                        <button
                            value="045"
                            onClick={e => {
                                setInputAccount({ ...inputAccount, bankCode: e.target.value });
                                setSelectedBank('045');
                            }}
                            className={selectedBank === '045' ? AccountAddInfo.selected : ''}
                        >
                            새마을금고
                        </button>
                    </li>
                </ul>
            </div>
            <div className={AccountAddInfo.bottom}>
                <div>평생계좌번호 및 맞춤계좌번호, 가상계좌 등의 계좌는 페이 등록이 불가능합니다.</div>
                <div>등록 가능한 계좌 확인은 등록하려는 은행의 고객센터로 문의하세요.</div>
            </div>
            <div>
                <BottomButtons
                    childrens={['등록하기']}
                    // handlers={[() => navigate('/account/add/auth')]}
                    handlers={[() => checkDuplicateAccount()]}
                ></BottomButtons>
            </div>
        </div>
    );
};

export default AccountAddInfoPage;
