import React from "react";
import s from './TextBlock.module.css'

export const TextBlock = ({id, title, link, text, img}) => {
    return (
        <div className={s.textBlock}>
            <a href={link} className={s.link}>
                <div className={s.imgBlock}>
                    <img src={img} alt="Картинка"/>
                </div>
                <h2 className={s.title}>{title}</h2>
                <div className={s.text}>{text}</div>
            </a>
        </div>
    )
}