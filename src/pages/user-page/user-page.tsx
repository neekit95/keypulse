import React, {useState} from 'react';
import style from './user-page.module.scss'

const UserPage = () => {
    const [name, setName] = useState('Рыбалкин Никита');
    const [bestAccuracy, setBestAccuracy] = useState(100);
    const [middleAccuracy, setMiddleAccuracy] = useState(96.3);
    const [bestSpeed, setBestSpeed] = useState(324)
    const [middleSpeed, setMiddleSpeed] = useState(301);
    const [rang, setRang] = useState('Gold');

    return (
        <div className={style.container}>
            <div className={style.wrapper}>
                <div className={style.profile}>
                    <h1>
                        {name}
                    </h1>
                    <h2>
                        Ваш ранг: <span> {rang} </span>
                    </h2>
                    <h2>
                        Лучший результат:
                        <p>Точность: <span>{bestSpeed}</span> %</p>
                        <p>Скорость: <span>{bestAccuracy}</span> зн/м</p>
                    </h2>
                    <h2 className={style.h2NotBottom}>
                        Средний результат:
                        <p>Точность: <span>{middleAccuracy}</span> %</p>
                        <p>Скорость: <span>{middleSpeed}</span> зн/м</p>
                    </h2>
                </div>

                <div className={style.lastResults}>

                </div>


            </div>
        </div>
    );
};

export default UserPage;

