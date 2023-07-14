import React from 'react';
import BottomButtons from '../../components/molecules/common/BottomButtons';
import { useNavigate } from 'react-router-dom';
import AddAccountAgreements from './AddAccountAgreements';

const AccountAddAgreePage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <AddAccountAgreements />
            <BottomButtons childrens={['다음']} handlers={[() => navigate('/account/add/info')]} />
        </div>
    );
};

export default AccountAddAgreePage;
