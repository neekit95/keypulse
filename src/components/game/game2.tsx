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
//     return ()
//         document.removeEventListener('keydown', handleKeyPress);
//     };
// }, [isGameStarted, isGameEnd]); // Зависимости useEffect
