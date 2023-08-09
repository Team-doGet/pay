import React, { useEffect } from 'react';
import BottomModalLayout from '../../../layouts/BottomModalLayout';
import { accountSelectState } from '../../../states/accountSelectState';
import { useRecoilState } from 'recoil';
import AccountSelect_ from './AccountSelect.module.css';
import { useNavigate } from 'react-router-dom';
import bankData from '../../../mock/bankCode.json';

const AccountSelect = ({ accountList }) => {
    const [accountSelect, setAccountSelect] = useRecoilState(accountSelectState);
    const navigate = useNavigate();

    return (
        <BottomModalLayout>
            <button onClick={() => setAccountSelect({ ...accountSelect, show: false })}>
                <img src={`${process.env.PUBLIC_URL}/assets/img/common/close.svg`} alt="" />
            </button>
            <div className={AccountSelect_.container}>
                <h4>계좌선택</h4>
                <div className={AccountSelect_.accountListContainer}>
                    <ul className={AccountSelect_.accountList}>
                        {accountList &&
                            accountList.map(
                                account =>
                                    account.accountNo == accountSelect.accountNo && (
                                        <li className={AccountSelect_.accountWrapper}>
                                            <p className={AccountSelect_.accountTextMain}>
                                                {bankData[account.bankCode]} {account.accountNo.slice(0, 3)}
                                                ****{account.accountNo.slice(-4)}
                                            </p>
                                            <img src={`${process.env.PUBLIC_URL}/assets/img/common/check.svg`} alt="" />
                                        </li>
                                    )
                            )}
                        {accountList &&
                            accountList.map(
                                account =>
                                    account.accountNo == accountSelect.accountNo || (
                                        <li
                                            className={AccountSelect_.accountWrapper}
                                            onClick={() =>
                                                setAccountSelect({
                                                    ...accountSelect,
                                                    show: false,
                                                    accountNo: account.accountNo,
                                                })
                                            }
                                        >
                                            <p className={AccountSelect_.accountText}>
                                                {bankData[account.bankCode]} {account.accountNo.slice(0, 3)}****
                                                {account.accountNo.slice(-4)}
                                            </p>
                                            <img
                                                src={`${process.env.PUBLIC_URL}/assets/img/common/noncheck.svg`}
                                                alt=""
                                            />
                                        </li>
                                    )
                            )}
                        {/* <li className={AccountSelect_.accountWrapper}>
                            <p className={AccountSelect_.accountTextMain}>IBK기업 234****3234</p>
                            <img src={`${process.env.PUBLIC_URL}/assets/img/common/check.svg`} alt="" />
                        </li>
                        <li className={AccountSelect_.accountWrapper}>
                            <p className={AccountSelect_.accountText}>IBK기업 234****3234</p>
                            <img src={`${process.env.PUBLIC_URL}/assets/img/common/noncheck.svg`} alt="" />
                        </li>
                        <li className={AccountSelect_.accountWrapper}>
                            <p className={AccountSelect_.accountText}>IBK기업 234****3234</p>
                            <img src={`${process.env.PUBLIC_URL}/assets/img/common/noncheck.svg`} alt="" />
                        </li> */}
                    </ul>
                </div>
            </div>
            <div className={AccountSelect_.acceptButton}>
                <button onClick={() => navigate('/account/add/agree')}>계좌 등록</button>
            </div>
        </BottomModalLayout>
    );
};

export default AccountSelect;
