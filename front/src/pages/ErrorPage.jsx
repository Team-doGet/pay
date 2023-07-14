import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ErrorPage_ from './ErrorPage.module.css';
import BottomButtons from '../components/molecules/common/BottomButtons';

const ErrorPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { title, contents } = location.state;

    return (
        <div className={ErrorPage_.container}>
            <div className={ErrorPage_.imgContainer}>
                <img src={`${process.env.PUBLIC_URL}/assets/img/common/fail.svg`} alt="" />
                <h4>{title}</h4>
            </div>
            <div className={ErrorPage_.contentContainer}>
                {contents.map(content => (
                    <p>{content}</p>
                ))}
            </div>
            <BottomButtons childrens={['홈으로']} handlers={[() => navigate('/')]} />
        </div>
    );
};

export default ErrorPage;
