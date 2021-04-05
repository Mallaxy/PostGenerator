import './App.css';
import React, {useState} from "react";
import s from "./App.module.css";
import {TextBlock} from "./components/TextBlock/TextBlock";
import Preloader from "./preloader/Preloader";
import {InputBlock} from "./components/InputBlock/InputBlock";

function App() {
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

    const getBlocks = () => {
        toggleFetching(true);
        (async () => {
            let response = await fetch('#');
            // let posts = await response.json()
            toggleFetching(false)
        })()
        setCurrentBlock(currentBlock + 10)
    }
    return (
        <div className="wrapper">
            <div className="container">
                <div className={s.inputBlock}>
                    <InputBlock state={{state, setState}}/>
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
