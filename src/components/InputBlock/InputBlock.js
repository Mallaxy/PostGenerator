import s from "./InputBlock.module.css";
import React from "react";
import {Formik} from "formik";
import * as yup from 'yup'
import {InputItem} from "./InputItem/InputItem";


export const InputBlock = ({state}) => {

    const validationsSchema = yup.object().shape({
        img: yup.mixed().required('Выбирите изображение'),
        // .test('type', 'Только изображения', (value) => {
        //     console.log(value)
        //     return value && value[0].type === 'image'
        // }),
        title: yup.string().typeError('Должно быть строкой').test('len', 'Максимум 20 символов', value => value && value.length <= 20).matches(/^[а-яА-ЯёЁЇїІіЄєҐґ0-9]+$/, 'Только кириллические символы').required('Обязательно'),
        text: yup.string().typeError('Должно быть строкой').test('len', 'Максимум 250 символов', value => value && value.length <= 250).matches(/^[а-яА-ЯёЁЇїІіЄєҐґ0-9]+$/, 'Только кириллические символы').required('Обязательно')
    })


    return (
        <div className={s.inputWrapper}>
            <Formik initialValues={{
                img: '',
                title: '',
                link: '',
                text: '',
            }} onSubmit={(values) => {
                console.log(values)
                state.setState([...state, {id: Date.now(), ...values}])
            }} validationSchema={validationsSchema}>
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      isValid,
                      handleSubmit,
                      dirty
                  }) => (
                    <div className={s.inputBlock}>
                        <div className={s.imgInput}>
                            <div className={s.imgPreview}>
                                <img src={values.img} alt=""/>
                            </div>
                            <InputItem
                                props={{
                                    values,
                                    handleChange,
                                    handleBlur,
                                    name: 'img',
                                    title: 'Картинка',
                                    type: 'file'
                                }}/>
                            {touched.img && errors.img && <p className={s.error}>{errors.img}</p>}
                        </div>
                        <div className={s.titleInput}>
                            <InputItem
                                props={{values, handleChange, handleBlur, name: 'title', title: 'Заголовок'}}/>
                            {touched.title && errors.title && <p className={s.error}>{errors.title}</p>}
                        </div>
                        <div className={s.linkInput}>
                            <InputItem
                                props={{values, handleChange, handleBlur, name: 'link', title: 'Ссылка'}}/>
                            {touched.link && errors.link && <p className={s.error}>{errors.link}</p>}
                        </div>
                        <div className={s.textInput}>
                            <textarea name={'text'}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.text}
                                      maxLength={250}/>
                            {touched.text && errors.text && <p className={s.error}>{errors.text}</p>}
                        </div>
                        <button disabled={!isValid && !dirty}
                                onClick={handleSubmit}
                                className={s.button}>Создать
                        </button>
                    </div>
                )}
            </Formik>
        </div>
    )
}