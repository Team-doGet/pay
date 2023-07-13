import React from 'react';
import Button from '../../atoms/Button';
import BottomButtons_ from './BottomButtons.module.css';

const BottomButtons = ({ childrens, handlers }) => {
    return (
        <>
            {childrens.length === 1 ? (
                <div className={BottomButtons_.container}>
                    <Button width="full" type="main" handler={handlers[0]}>
                        {childrens[0]}
                    </Button>
                </div>
            ) : (
                <div className={`${BottomButtons_.container} ${BottomButtons_.twoContainer}`}>
                    <Button width="half" type="main" handler={handlers[0]}>
                        {childrens[0]}
                    </Button>
                    <Button width="half" type="sub" handler={handlers[1]}>
                        {childrens[1]}
                    </Button>
                </div>
            )}
        </>
    );
};

export default BottomButtons;
