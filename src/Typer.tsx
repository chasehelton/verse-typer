import React, { useState, useEffect } from 'react';

type Verse = {
  ref: string,
  charArray: string[] | undefined,
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
  const [timeElapsedWhole, setTimeElapsedWhole] = useState<number>(0);
  const [timeElapsedDecimal, setTimeElapsedDecimal] = useState<number>(0);
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [finalTime, setFinalTime] = useState<string>('');
  const [startedTyping, setStartedTyping] = useState<boolean>(false);
  // const [wholeInterval, setWholeInterval] = useState<ReturnType<typeof setInterval>>();
  // const [decimalInterval, setDecimalInterval] = useState<ReturnType<typeof setInterval>>();
  var wholeInterval: any;
  var decimalInterval: any;

  useEffect(() => {
    if (props.verse) {
      setTyping('');
      setTypingIndex(0);
      setErrorMap({});
      setIsFinished(false);
    }
  }, [props.verse]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    let keyPressed: string = e.key;
    if (
      keyPressed === 'Shift' ||
      keyPressed === 'Enter' ||
      keyPressed === 'CapsLock'
    )
      return;
    // If the user hasn't started typing yet and they
    if (!startedTyping) {
      setStartedTyping(true);
      setInterval(
        () =>
          (wholeInterval = setTimeElapsedWhole(
            Math.round((new Date().getTime() - startTime.getTime()) / 1000)
          )),
        1000
      );
      setInterval(
        () =>
          (decimalInterval = setTimeElapsedDecimal(
            Math.round((new Date().getTime() - startTime.getTime()) % 1000)
          )),
        100
      );
    }

    if (charArray !== undefined && typingIndex === charArray.length - 1) {
      clearInterval(wholeInterval);
      clearInterval(decimalInterval);
      setIsFinished(true);
      setFinalTime(timeElapsedWhole + '.' + timeElapsedDecimal);
      return;
    } else if (charArray === undefined) return;

    if (!acceptedKeys.includes(keyPressed)) return;

    if (charArray !== undefined && keyPressed !== charArray[typingIndex]) {
      if (keyPressed !== 'Backspace')
        setErrorMap({ ...errorMap, [typingIndex]: true });
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
    setTyping(typing + keyPressed);
    setTypingIndex(typingIndex + 1);
  };

  const reset = () => {
    setTyping('');
    setTypingIndex(0);
    setErrorMap({});
    setIsFinished(false);
    setStartedTyping(false);
    setTimeElapsedWhole(0);
    setTimeElapsedDecimal(0);
    setStartTime(new Date());
    clearInterval(wholeInterval);
    clearInterval(decimalInterval);
  };

  return (
    <div className='text-center mx-auto w-full sm:w-96 mt-4 mb-12'>
      {!isFinished && (
        <div>
          <div>
            {timeElapsedWhole}.{timeElapsedDecimal}
          </div>
          <h2>{props?.verse?.ref}</h2>
          <div>
            <div className='h-48 w-96 mx-auto overflow-scroll'>
              {charArray?.map((letter, index) => (
                <span
                  key={index}
                  className={
                    (index === typingIndex && 'text-blue-500 underline') ||
                    (errorMap[index] && 'bg-red-300 text-red-500') ||
                    (index < typingIndex && 'text-green-500')
                  }
                >
                  {letter}
                </span>
              ))}
            </div>
            <textarea
              autoFocus
              placeholder={charArray?.join('').substring(0, 11) + '...'}
              className='p-0 w-96 border-2 border-slate-200 bg-slate-50'
              value={typing}
              onKeyDown={(e) => handleKeyDown(e)}
            ></textarea>
          </div>
        </div>
      )}
      {isFinished && (
        <div>
          <p>
            Nice job! Your final time for {props?.verse?.ref} was (
            {finalTime}) seconds.
          </p>
          <button
            onClick={() => {
              reset();
              window.location.reload();
            }}
            className='text-blue-400'
          >
            Pick another verse!
          </button>
        </div>
      )}
    </div>
  );
};

export default Typer;
