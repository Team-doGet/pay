import React, { useEffect, useState } from 'react';
import Agreements from '../../components/molecules/agree/Agreements';
import BottomButtons from '../../components/molecules/common/BottomButtons';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { joinState } from '../../states/joinState';

const JoinAgreePage = () => {
    const navigate = useNavigate();
    const { agree1Yn, agree2Yn } = useRecoilValue(joinState);
    const [warning, setWarning] = useState(false);

    const nextHandler = () => {
        if (agree1Yn && agree2Yn) {
            navigate('/join/info');
        } else {
            setWarning(true);
        }
    };

    return (
        <div>
            <Agreements warning={warning} />
            <BottomButtons childrens={['다음']} handlers={[() => nextHandler()]} />
        </div>
    );
};

export default JoinAgreePage;
