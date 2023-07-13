import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/molecules/Header';
import BottomButtons from '../../components/molecules/common/BottomButtons';
import FailInfo from '../../components/molecules/result/fail/FailInfo';
import SuccessInfo from '../../components/molecules/result/success/SuccessInfo';

const ResultPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { headerTitle, flag, info, buttons } = location.state;
    const buttonsHandlers = buttons.targetUrl.map(url => () => navigate(`${url}`));

    return (
        <>
            <Header title={headerTitle} isBack={false} />
            {flag === 'success' ? <SuccessInfo info={info} /> : <FailInfo info={info} />}
            <BottomButtons childrens={buttons.childrens} handlers={buttonsHandlers} />
        </>
    );
};

export default ResultPage;
