import s from "./InputItem.module.css";
import React from "react";

export const InputItem = ({props}) => {
    return (
        <div className={s.inputItem}>
            <label htmlFor={props.name}>{props.title}</label>
            <input type={props.type || 'input'}
                   name={props.name}
                   onChange={props.handleChange}
                   onBlur={props.handleBlur}
                   value={props.values[props.name]}
                   className={`s.${props.name}Input`}/>
        </div>
    )
}