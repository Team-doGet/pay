import React from 'react';
import JoinSuccess from './JoinSuccessPage.module.css';
import BottomButtons from '../../components/molecules/common/BottomButtons';
import { useNavigate } from 'react-router-dom';

const JoinSuccessPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div className={JoinSuccess.logoContainer}>
                <img src={`${process.env.PUBLIC_URL}/assets/img/common/check_image.svg`}></img>
            </div>
            <div className={JoinSuccess.content}>
                <div>축하합니다!</div>
                <div>회원가입이 완료되었습니다.</div>
            </div>
            <div>
                <BottomButtons childrens={['로그인']} handlers={[() => navigate('/login')]}></BottomButtons>
            </div>
        </div>
    );
};

export default JoinSuccessPage;
