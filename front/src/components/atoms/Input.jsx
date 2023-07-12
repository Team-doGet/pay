import React from 'react';
import input from './Input.module.css';

const Input = ({ location, type, name, inputs, setInputsState, placeholder }) => {
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
            placeholder={placeholder}
        ></input>
    );
};

export default Input;
