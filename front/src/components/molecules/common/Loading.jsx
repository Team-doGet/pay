import React from 'react';
import Loading_ from './Loading.module.css';

export const Loading = () => {
    return (
        <div className={Loading_.background}>
            <div className={Loading_.text}>잠시만 기다려주세요.</div>
            <img src={`${process.env.PUBLIC_URL}/assets/img/common/loading.gif`} alt="로딩중"></img>
        </div>
    );
};

export default Loading;
