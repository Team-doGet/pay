import React, { useEffect, useState } from 'react';
import CheckBox from '../../atoms/CheckBox';
import joinAgreeData from '../../../mock/joinAgree.json';
import Agreement from './Agreements.module.css';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { joinState } from '../../../states/joinState';

const Agreements = ({ warning }) => {
    const [checked, setChecked] = useState([]);
    const [isAllChecked, SetIsAllChecked] = useState(false);
    const [join, setJoin] = useRecoilState(joinState);
    const resetJoin = useResetRecoilState(joinState);

    const checkBoxHandler = idx => {
        setChecked(
            checked.map((item, i) => {
                if (i === idx) {
                    item.isChecked = !item.isChecked;
                }
                return item;
            })
        );
        const name = checked[idx].name;
        name === 'agree1Yn'
            ? setJoin({
                  ...join,
                  agree1Yn: !join.agree1Yn,
              })
            : name === 'agree2Yn'
            ? setJoin({
                  ...join,
                  agree2Yn: !join.agree2Yn,
              })
            : setJoin({
                  ...join,
                  agree3Yn: !join.agree3Yn,
              });
    };

    useEffect(() => {
        setChecked(joinAgreeData);

        return () => {
            resetJoin();
        };
    }, []);

    const allCheckBoxHandler = () => {
        setChecked(checked.map(item => ({ ...item, isChecked: !isAllChecked })));
        SetIsAllChecked(!isAllChecked);
        setJoin({
            ...join,
            agree1Yn: !isAllChecked,
            agree2Yn: !isAllChecked,
            agree3Yn: !isAllChecked,
        });
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
                    <CheckBox
                        checked={data.isChecked}
                        setChecked={() => {
                            checkBoxHandler(idx);
                        }}
                        type={data.type}
                    >
                        {data.title}
                    </CheckBox>
                    <div className={Agreement.content}>
                        <textarea name="" id="" cols="30" rows="10" value={data.content} readOnly></textarea>
                    </div>
                </div>
            ))}
            {warning && <p className={Agreement.warning}>필수 동의사항에 체크해주세요.</p>}
        </div>
    );
};

export default Agreements;
