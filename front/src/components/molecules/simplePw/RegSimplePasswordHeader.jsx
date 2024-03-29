import React from 'react';
import PwHeader from './SimplePasswordHeader.module.css';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { simplePwState } from '../../../states/simplePwState';

const RegSimplePasswordHeader = ({ title, exit }) => {
    const navigate = useNavigate();
    const [simple, setSimple] = useRecoilState(simplePwState);
    const resetSimple = useResetRecoilState(simplePwState);

    return (
        <div className={PwHeader.header}>
            <span className={PwHeader.text}>{title}</span>
        </div>
    );
};

export default RegSimplePasswordHeader;
