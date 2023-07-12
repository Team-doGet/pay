import React from 'react';
import SimplePasswordHeader from '../molecules/simplePw/SimplePasswordHeader';
import SimplePasswordDisplay from '../molecules/simplePw/SimplePasswordDisplay';
import SimplePasswordEnter from '../molecules/simplePw/SimplePasswordEnter';
import useViewHeight from '../../hooks/useViewHeight';
import { useNavigate } from 'react-router-dom';
import SimplePasswordContainer from '../molecules/simplePw/SimplePasswordContainer';

const SimplePassword = () => {
    useViewHeight();
    const navigate = useNavigate();

    const simplePwHandler = () => {
        alert('asd');
    };

    return (
        <>
            <SimplePasswordHeader title="간편비밀번호 입력" handler={() => navigate(-1)} />
            <SimplePasswordContainer>
                <SimplePasswordDisplay name="두겟" email="doget123" phrase="asd" />
                <SimplePasswordEnter handler={() => simplePwHandler()} />
            </SimplePasswordContainer>
        </>
    );
};

export default SimplePassword;
