import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Modal from 'react-modal';
import {calculateSpeed, updateSpeed} from '../../redux/slices/speedSlice';
import {
    addError,
    correctError,
    endGame,
    incrementCorrectSymbols,
    nextText,
    startGame,
    updateInputText,
} from '../../redux/slices/textsSlice';
import {resetTimer, startTimerThunk, stopTimerThunk} from '../../redux/slices/timerSlice';
import style from './game.module.scss';
import {updateAccuracy} from '../../redux/slices/accuracySlice';
import {AppDispatch, RootState} from "../../redux/store";

Modal.setAppElement('#root'); // Устанавливаем элемент для aria

const Game = () => {
    const text: string = useSelector((state: RootState) => state.texts.value);
    const {
        inputText, currentError, currentIndex, isGameEnd, correctSymbols, isGameStarted, errorCount
    } = useSelector((state: RootState) => state.texts);
    const timer: number = useSelector((state: RootState) => state.timer.value);
    const dispatch: AppDispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const gameRef = useRef<HTMLDivElement>(null);
    const modalButtonRef = useRef<HTMLButtonElement>(null);
    const accuracy: number = Number(((correctSymbols / (correctSymbols + errorCount)) * 100).toFixed(1));
    const [currentLanguage, setCurrentLanguage] = useState<string>('');
    const [showLanguageWarning, setShowLanguageWarning] = useState<boolean>(false);

    // Фокусировка на игре при загрузке страницы и начале игры
    useEffect(() => {
        if (gameRef.current) {
            gameRef.current.focus();
        }
    }, []);

    // Фокусировка на кнопке начать заново при окончании игры
    useEffect(() => {
        if (isModalOpen) {
            setTimeout(() => {
                if (modalButtonRef.current) {
                    modalButtonRef.current.focus();
                }
            }, 0);
        }
    }, [isModalOpen]);

    // При окончании игры конец таймера, подсчет скорости. При начале игры обновление точности.
    useEffect(() => {
        if (correctSymbols === text.length) {
            dispatch(stopTimerThunk());
            dispatch(endGame());
            dispatch(calculateSpeed({correctSymbols, timer}));
            setIsModalOpen(true);
        } else if (timer > 0 && !isGameEnd) {
            dispatch(updateAccuracy(accuracy));
        }
    }, [correctSymbols, timer, isGameEnd, text.length, dispatch, accuracy]);

    // Начало игры, старт таймера при вводе символа. Обработка неверно введенного символа.
    const handleKeyPress = (e: React.KeyboardEvent) => {
        const char = e.key;

        // Если игра не начата и не завершена, запускаем игру и таймер
        if (!isGameStarted && !isGameEnd) {
            dispatch(startGame());
            dispatch(startTimerThunk());
        }

        // Проверяем нажатую клавишу на соответствие текущему символу текста
        if (char !== text[currentIndex]) {
            dispatch(addError(currentIndex)); // Если символ неверный, добавляем ошибку
            return;
        }
        // Если символ верный, обновляем состояние
        dispatch(correctError()); // Убираем текущую ошибку, если была
        dispatch(incrementCorrectSymbols()); // Увеличиваем количество верных символов
        dispatch(updateInputText(inputText + char)); // Обновляем введенный текст
        dispatch(updateSpeed(Math.round(correctSymbols / (timer / 10) * 60)));  // Рассчитываем и обновляем скорость при каждом верно введенном символе
    };

    // Рестарт игры, переход к следующему тексту, обнуление таймера, фокус на игре.
    const handleRestart = () => {
        dispatch(nextText()); // Переход к следующему тексту при перезапуске
        dispatch(resetTimer()); // Сброс таймера
        setIsModalOpen(false); // Закрытие модального окна

        // Фокусировка на игре после перезапуска, если элемент gameRef существует
        if (gameRef.current) {
            gameRef.current.focus();
        }
    };

    // useEffect(() => {
    //     const handleKeyPress: EventListener = (event) => {
    //         const keyboardEvent = event as KeyboardEvent; // Приведение типа к KeyboardEvent
    //
    //         if (!isGameStarted || isGameEnd) return; // Проверка, идет ли игра и не завершена ли она
    //
    //         const char = keyboardEvent.key;
    //
    //         if (/[.,\/#!$%\^&\*;:{}=\-_`~()"'\s\t\n1234567890]/.test(char)) {
    //             setCurrentLanguage('sign');
    //         }
    //             // Проверяем, является ли символ знаком пунктуации или пробелом
    //             // if (/[.,\/#!$%\^&\*;:{}=\-_`~()"`' 1234567890]/.test(char)) {
    //             //     setCurrentLanguage('sign');
    //             // }
    //         // Проверяем, принадлежит ли символ русскому алфавиту
    //         else if ((char >= 'а' && char <= 'я') || char === 'ё' || (char >= 'А' && char <= 'Я')) {
    //             setCurrentLanguage('Russian');
    //         } else {
    //             setCurrentLanguage('English');
    //             setShowLanguageWarning(true);
    //             setTimeout(() => {
    //                 setShowLanguageWarning(false);
    //             }, 1500); // Уведомление будет показываться 1.5 секунды
    //         }
    //     };
    //
    //     // Добавляем обработчик события keydown
    //     document.addEventListener('keydown', handleKeyPress);
    //
    //     // Очистка обработчика при размонтировании компонента
    //     return () => {
    //         document.removeEventListener('keydown', handleKeyPress);
    //     };
    // }, [isGameStarted, isGameEnd]); // Зависимости useEffect


    useEffect(() => {
        const handleKeyPress: EventListener = (event) => {
            const keyboardEvent = event as KeyboardEvent; // Приведение типа к KeyboardEvent

            if (!isGameStarted || isGameEnd) return; // Проверка, идет ли игра и не завершена ли она

            const char = keyboardEvent.key;

            // Проверяем, является ли символ английской буквой
            if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) {
                setCurrentLanguage('English');
                setShowLanguageWarning(true);
                setTimeout(() => {
                    setShowLanguageWarning(false);
                }, 1500); // Уведомление будет показываться 1.5 секунды
            }
            // Проверяем, принадлежит ли символ русскому алфавиту
            else if ((char >= 'а' && char <= 'я') || char === 'ё' || (char >= 'А' && char <= 'Я')) {
                setCurrentLanguage('Russian');
            }
            // Проверяем, является ли символ знаком пунктуации или пробелом
            else if (/[.,\/#!$%\^&\*;:{}=\-_`~()"'\s\t\n1234567890]/.test(char)) {
                setCurrentLanguage('sign');
            }
        };

        // Добавляем обработчик события keydown
        document.addEventListener('keydown', handleKeyPress);

        // Очистка обработчика при размонтировании компонента
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [isGameStarted, isGameEnd]);

    // Разбиение текста на слова
    const words = text.split(' ');

    const getAbsoluteIndex = (wordIndex: number, charIndex: number) => {
        return words.slice(0, wordIndex).join('').length + charIndex + wordIndex;
    };

    return (
        <div className={style.theGame} tabIndex={0} onKeyPress={(e: React.KeyboardEvent) => handleKeyPress(e)}
             ref={gameRef}>
            <div className={`${style.language} ${showLanguageWarning ? style.show : ''}`}>
                Переключите язык
            </div>

            <p className={style.text}>
                {words.map((word: string, wordIndex: number) => (
                    <React.Fragment key={wordIndex}>
                        {wordIndex > 0 && (
                            <span
                                className={
                                    getAbsoluteIndex(wordIndex - 1, words[wordIndex - 1].length) === currentError
                                        ? style.error
                                        : getAbsoluteIndex(wordIndex - 1, words[wordIndex - 1].length) === currentIndex
                                            ? style.nextChar
                                            : getAbsoluteIndex(wordIndex - 1, words[wordIndex - 1].length) < inputText.length
                                                ? style.correct
                                                : ''
                                }
                            >
                            {' '}
                          </span>
                        )}
                        <span className={style.word}>
                            {word.split('').map((char, charIndex) => {
                                const absoluteIndex = getAbsoluteIndex(wordIndex, charIndex);

                                return (
                                    <span
                                        key={absoluteIndex}
                                        className={
                                            absoluteIndex === currentError
                                                ? style.error
                                                : absoluteIndex === currentIndex
                                                    ? style.nextChar
                                                    : absoluteIndex < inputText.length
                                                        ? style.correct
                                                        : ''
                                        }
                                    >
                                {char}
                              </span>
                                );
                            })}
                        </span>
                    </React.Fragment>
                ))}
            </p>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={handleRestart}
                contentLabel="Результаты игры"
                className={style.modal}
                overlayClassName={style.overlay}
            >
                <h2>Результаты игры</h2>
                <div className={style.results}>
                    <p>
                        Количество ошибок: <span>{errorCount}</span>
                    </p>
                    <p>
                        Точность (%): <span>{accuracy}</span>
                    </p>
                    <p>
                        Скорость (зн/мин): <span>{useSelector((state: RootState) => state.speed.value)}</span>
                    </p>
                </div>
                <button onClick={handleRestart} ref={modalButtonRef}>
                    Начать заново
                </button>
            </Modal>
        </div>
    );
};

export default Game;