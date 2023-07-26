import React from 'react';
import Header from '../../components/molecules/Header';
import MyPage_ from './MyPage.module.css';
const MyPage = () => {
    return (
        <div>
            <Header title="마이페이지" isBack={true} />
            <div className={MyPage_.account_box}>
                <div className={MyPage_.title}>
                    <h2 className={MyPage_.title_text}>내 프로필</h2>
                </div>
                <ul className={MyPage_.account_row}>
                    <div>
                        <img src={`${process.env.PUBLIC_URL}/assets/img/common/email.png`} />
                        <li>example@naver.com</li>
                    </div>
                    <div>
                        <img src={`${process.env.PUBLIC_URL}/assets/img/common/user1.png`} />
                        <li>홍길동</li>
                    </div>
                    <div>
                        <img src={`${process.env.PUBLIC_URL}/assets/img/common/phoneNo.png`} />
                        <li>010-1234-5678</li>
                    </div>
                </ul>
            </div>
            <div className={MyPage_.account_box}>
                <div className={MyPage_.title}>
                    <h2 className={MyPage_.title_text}>보안 설정</h2>
                </div>
                <ul className={MyPage_.account_row}>
                    <li>
                        <div>
                            <img src={`${process.env.PUBLIC_URL}/assets/img/common/password.png`} />
                            <p>비밀번호 재설정</p>
                        </div>
                        <button>
                            <span>재설정</span>
                        </button>
                    </li>
                    <li>
                        <div>
                            <img src={`${process.env.PUBLIC_URL}/assets/img/common/simplepassword.png`} />
                            <p>간편비밀번호 초기화</p>
                        </div>
                        <button>
                            <span>초기화</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default MyPage;
