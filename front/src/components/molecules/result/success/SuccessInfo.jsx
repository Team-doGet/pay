import React from 'react';
import SuccessInfo_ from './SuccessInfo.module.css';

const SuccessInfo = ({ info }) => {
    return (
        <div className={SuccessInfo_.container}>
            <ul className={SuccessInfo_.infoContainer}>
                {info.map(e => (
                    <li className={SuccessInfo_.infoList}>
                        <span>{e.title}</span>
                        <span>{e.content}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SuccessInfo;
