import React from 'react';
import { RiCheckboxFill, RiCheckboxBlankLine } from 'react-icons/ri';
import checkBox from './CheckBox.module.css';

const CheckBox = ({ checked, setChecked, type = '', children }) => {
    return (
        <div className={checkBox.wrapper}>
            {checked === true ? (
                <RiCheckboxFill className={`${checkBox.icon} ${checkBox.checked}`} onClick={setChecked} />
            ) : (
                <RiCheckboxBlankLine className={`${checkBox.icon} ${checkBox.nonChecked}`} onClick={setChecked} />
            )}
            {type === 'required' ? (
                <label className={checkBox.text} onClick={setChecked}>
                    <span className={checkBox.required}>[필수]</span>
                    {children}
                </label>
            ) : type === 'option' ? (
                <label className={checkBox.text} onClick={setChecked}>
                    <span className={checkBox.option}>[선택]</span>
                    {children}
                </label>
            ) : (
                <label className={checkBox.text} onClick={setChecked}>
                    {children}
                </label>
            )}
        </div>
    );
};

export default CheckBox;
