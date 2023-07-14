import React, { useEffect, useState } from 'react';
import CheckBox from '../../components/atoms/CheckBox';
import addAcountAgreeData from '../../mock/accountAgree.json';
import Agreement from '../../components/molecules/agree/Agreements.module.css';

const AddAccountAgreements = () => {
    const [checked, setChecked] = useState([]);
    const [isAllChecked, SetIsAllChecked] = useState(false);

    const checkBoxHandler = idx => {
        setChecked(
            checked.map((item, i) => {
                if (i === idx) {
                    item.isChecked = !item.isChecked;
                }
                return item;
            })
        );
    };

    useEffect(() => {
        setChecked(addAcountAgreeData);
    }, []);

    const allCheckBoxHandler = () => {
        setChecked(checked.map(item => ({ ...item, isChecked: !isAllChecked })));
        SetIsAllChecked(!isAllChecked);
    };

    return (
        <div>
            <div className={Agreement.allCheck}>
                <CheckBox checked={isAllChecked} setChecked={() => allCheckBoxHandler()}>
                    전체 동의
                </CheckBox>
            </div>
            {checked.map((data, idx) => (
                <div className={Agreement.aboveCheckBox}>
                    <CheckBox checked={data.isChecked} setChecked={() => checkBoxHandler(idx)} type={data.type}>
                        {data.title}
                    </CheckBox>
                    <div className={Agreement.content}>
                        <textarea name="" id="" cols="30" rows="10" value={data.content} readOnly></textarea>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AddAccountAgreements;
