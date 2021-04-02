import './App.css';
import React, {useState} from "react";
import s from "./App.module.css";
import {TextBlock} from "./components/TextBlock/TextBlock";
import Preloader from "./preloader/Preloader";

function App() {
    const [title, setTitle] = useState('')
    const [link, setLink] = useState('')
    const [text, setText] = useState('')
    const [img, setImg] = useState('')
    const [isFetching, toggleFetching] = useState(false)
    const [state, setState] = useState(
        Array(25).fill({
            id: Date.now(),
            title: "Привет, я образец",
            link: '',
            text: 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов',
            img: 'https://via.placeholder.com/150'
        }))
    const [currentBlock, setCurrentBlock] = useState(10)
    const stateOnPage = [...state.slice(0, currentBlock)]
    const isKyr = (str) => /[а-яА-ЯёЁ]/i.test(str);

    const addBlock = () => {
        //Добавил проверку для создания с пустыми полями
        if (!Boolean(text) && !Boolean(title)) {
            setState([{id: Date.now(), title, link, text, img}, ...state])
            setTitle('')
            setLink('')
            setText('')
        } else if (isKyr(title) && isKyr(text)) {
            setState([{id: Date.now(), title, link, text, img}, ...state])
            setTitle('')
            setLink('')
            setText('')
        } else alert('Для заголовка и текста только кирриличиские символы')
    }

    const getBlocks = () => {
        toggleFetching(true);
        (async () => {
            let response = await fetch('#');
            // let posts = await response.json()
            toggleFetching(false)
        })()
        setCurrentBlock(currentBlock + 10)
    }
    debugger
    return (
        <div className="wrapper">
            <div className="container">
                <div className={s.inputBlock}>
                    <div className={s.pictureInput}>
                        <div className={s.imageContainer}>
                            <img src={img ? img : 'https://via.placeholder.com/150'} alt=""/>
                        </div>
                        <input type="file" accept="image/x-png,image/gif,image/jpeg"
                               onChange={event => event.target.files[0] ? setImg(URL.createObjectURL(event.target.files[0])) : setImg('')}/>
                    </div>
                    <section className={s.rightBlock}>
                        <input type="text" value={title} onChange={event => setTitle(event.target.value)}
                               className={s.titleInput} placeholder='Заголовок' maxLength={20}/>
                        <input type="text" value={link} onChange={event => setLink(event.target.value)}
                               className={s.linkInput} placeholder='Ссылка'/>
                        <textarea value={text} onChange={event => setText(event.target.value)}
                                  className={s.textInput} placeholder='Текст' maxLength={250}/>
                        <button onClick={addBlock} className={s.button}>Создать</button>
                    </section>
                </div>
                <div className={s.blockList}>
                    {stateOnPage.map(item => <TextBlock key={item.id} {...item} />)}
                </div>
                <div className={s.preloader}>
                    {isFetching ? <Preloader/> : null}
                </div>
                <div className={s.getBlocks}>
                    {state.length > 10 ? <button onClick={getBlocks}>Загрузить больше</button> : null}
                </div>
            </div>
        </div>);
}

export default App;
