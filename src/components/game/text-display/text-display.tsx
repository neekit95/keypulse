import React from 'react';
// import style from './../game.module.scss';
import style from './text-display.module.scss'

interface TextDisplayProps {
    text: string;
    currentError: null | number;
    currentIndex: number;
    inputText: string;
}

const TextDisplay: React.FC<TextDisplayProps> = ({text, currentError, currentIndex, inputText}) => {
    const words = text.split(' ');
    const getAbsoluteIndex = (wordIndex: number, charIndex: number) => {
        return words.slice(0, wordIndex).join('').length + charIndex + wordIndex;
    };

    return (
        <div className={style.container}>
          
            <div className={style.text}>
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
            </div>
        </div>

    );
};

export default TextDisplay;