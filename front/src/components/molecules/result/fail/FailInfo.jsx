import React from 'react';
import FailInfo_ from './FailInfo.module.css';

const FailInfo = ({ info }) => {
    const { title, contents } = info;

    return (
        <div className={FailInfo_.container}>
            <div className={FailInfo_.imgContainer}>
                <img src={`${process.env.PUBLIC_URL}/assets/img/common/fail.svg`} alt="" />
                <h4>{title}</h4>
            </div>
            <div className={FailInfo_.contentContainer}>
                {contents.map(content => (
                    <p>{content}</p>
                ))}
            </div>
        </div>
    );
};

export default FailInfo;
