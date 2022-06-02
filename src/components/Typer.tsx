import React, { useState, useEffect, useRef } from 'react';
import { useStopwatch } from 'react-timer-hook';

type Verse = {
  ref: string;
  charArray: string[] | undefined;
};

interface TyperProps {
  verse: Verse | undefined;
  setVerse: (verse: Verse | undefined) => void;
}

const acceptedKeys: string[] = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  ' ',
  '.',
  '-',
  '_',
  '!',
  '@',
  '#',
  '$',
  '%',
  '^',
  '&',
  '*',
  '(',
  ')',
  '+',
  '=',
  '{',
  '}',
  '[',
  ']',
  ':',
  ';',
  '"',
  "'",
  '<',
  '>',
  '?',
  '/',
  '\\',
  '|',
  '`',
  '~',
  ',',
  'Backspace',
  'Shift',
  'Enter',
  'CapsLock',
];

const Typer: React.FC<TyperProps> = (props: TyperProps) => {
  const [typing, setTyping] = useState<string | undefined>('');
  const [typingIndex, setTypingIndex] = useState<number>(0);
  const charArray = props.verse?.charArray || [];
  const [errorMap, setErrorMap] = useState<any>({});
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [finalTime, setFinalTime] = useState<string>('');
  const [startedTyping, setStartedTyping] = useState<boolean>(false);
  const [totalErrors, setTotalErrors] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<string>('');
  const [wpm, setWpm] = useState<string>('');
  const [cpm, setCpm] = useState<string>('');
  const typingRef = useRef<HTMLInputElement>(null);
  const { seconds, minutes, isRunning, start, pause, reset } = useStopwatch({
    autoStart: false,
  });

  useEffect(() => {
    if (props.verse) {
      setTimeout(() => {
        if (typingRef.current) {
          typingRef.current.focus();
        }
      }, 400);
      setTyping('');
      setTypingIndex(0);
      setErrorMap({});
      setIsFinished(false);
    }
  }, [props.verse]);

  const handleRestart = () => {
    reset();
    pause();
    setTyping('');
    setTypingIndex(0);
    setErrorMap({});
    setIsFinished(false);
    setStartedTyping(false);
    setFinalTime('');
    setTotalErrors(0);
    setAccuracy('');
    setWpm('');
    setCpm('');
    setTimeout(() => {
      if (typingRef.current) {
        typingRef.current.focus();
      }
    }, 400);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    let keyPressed: string = e.key;
    if (
      keyPressed === 'Shift' ||
      keyPressed === 'Enter' ||
      keyPressed === 'CapsLock'
    ) {
      return;
    }
    if (!isFinished && !startedTyping) {
      setStartedTyping(true);
      reset();
      start();
    }

    setTyping(typing + keyPressed);
    setTypingIndex(typingIndex + 1);

    if (charArray !== undefined && typingIndex === charArray.length - 1) {
      setStartedTyping(false);
      setIsFinished(true);
      setAccuracy(
        (((charArray.length - totalErrors) / charArray.length) * 100).toFixed(
          0
        ) + '%'
      );
      setWpm(
        (charArray.length / 5 / ((seconds + minutes * 60) / 60)).toFixed(0) +
          ' wpm'
      );
      setCpm(
        (charArray.length / ((seconds + minutes * 60) / 60)).toFixed(0) + ' cpm'
      );
      setFinalTime(
        minutes.toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        }) +
          ':' +
          seconds.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })
      );
      if (isRunning) {
        pause();
      }
      return;
    } else if (charArray === undefined) return;

    if (!acceptedKeys.includes(keyPressed)) return;

    if (charArray !== undefined && keyPressed !== charArray[typingIndex]) {
      if (keyPressed !== 'Backspace') {
        setTotalErrors((totalErrors) => totalErrors + 1);
        setErrorMap({ ...errorMap, [typingIndex]: true });
      }
    }
    if (charArray !== undefined && keyPressed === charArray[typingIndex]) {
      setErrorMap({ ...errorMap, [typingIndex]: false });
      setTypingIndex(typingIndex + 1);
      setTyping(typing + keyPressed);
    }
    if (keyPressed === 'Backspace') {
      setTyping(typing?.slice(0, -1));
      if (typingIndex > 0) setTypingIndex(typingIndex - 1);
      if (errorMap[typingIndex])
        setErrorMap({ ...errorMap, [typingIndex]: false });
      return;
    }
  };

  return (
    <div className='mx-auto w-full sm:w-96 mt-2'>
      <div className='text-left'>
        <div className='flex flex-row justify-between p-1 rounded-md bg-blue-50'>
          <h2 className='font-bold'>{props?.verse?.ref}</h2>
          {!startedTyping && !isFinished ? (
            <p className='text-slate-400'>Start typing!</p>
          ) : (
            <button onClick={() => handleRestart()} className='text-blue-400'>
              Restart
            </button>
          )}
          <div className='font-bold w-16'>
            <p>
              {minutes.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false,
              })}
              {':'}
              {seconds.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false,
              })}
            </p>
          </div>
        </div>
        <div className='flex flex-col items-center'>
          <div
            className='w-full p-2'
            ref={typingRef}
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e)}
          >
            {charArray?.map((letter, index) => (
              <span
                key={index}
                className={
                  (index === typingIndex && 'text-blue-500 underline') ||
                  (errorMap[index] && 'bg-red-300 text-red-500') ||
                  (index <= typingIndex && 'text-green-500')
                }
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
      </div>
      {isFinished && (
        <div className='text-center'>
          <p>Final Time - ({finalTime})</p>
          <p>Accuracy - {accuracy}</p>
          <p>WPM - {wpm}</p>
          <p>CPM - {cpm}</p>
        </div>
      )}
    </div>
  );
};

export default Typer;
