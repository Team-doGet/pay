import React from 'react';
import Agreements from '../../components/molecules/agree/Agreements';
import BottomButtons from '../../components/molecules/common/BottomButtons';
import { useNavigate } from 'react-router-dom';

const JoinAgreePage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Agreements />
            <BottomButtons childrens={['다음']} handlers={[() => navigate('/join/info')]} />
        </div>
    );
};

export default JoinAgreePage;
