import React from 'react';
import input from './css/Input.module.css';

const Input = ({ location, type, name, inputs, setInputsState, placholder }) => {
    return (
        <input
            className={`${input.input} ${input[`${location}`]}`}
            type={type}
            name={name}
            onChange={e => {
                const { value, name } = e.target;
                setInputsState({
                    ...inputs,
                    [name]: value,
                });
            }}
            placeholder={placholder}
        ></input>
    );
};

export default Input;
