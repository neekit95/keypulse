import React, {useState} from 'react';
import style from './user-page.module.scss'

const UserPage = () => {
    const [name, setName] = useState('Рыбалкин Никита');
    const [result, setResult] = useState('100%  320 зн/м');
    const [rang, setRang] = useState('Gold');

    return (
        <div className={style.container}>
            <div className={style.wrapper}>
                <div className={style.profile}>
                    <h1>
                        {name}
                    </h1>
                    <h2>Ваш ранг: <span> {rang}</span></h2>
                    <h2>
                        Лучший результат:
                        <p>Точность: <span>100</span> %</p>
                        <p>Скорость: <span>324</span> зн/м</p>
                    </h2>
                </div>

                <div className={style.lastResults}>

                </div>


            </div>
        </div>
    );
};

export default UserPage;

