import React, { useState, useEffect } from 'react';

type Verse = {
    canonical: string;
    parsed: any;
    passage_meta: any;
    passages: string[];
    query: string;
};

interface TyperProps {
    verse: Verse | undefined;
    setVerse: (verse: Verse | undefined) => void;
};

const Typer: React.FC<TyperProps> = (props: TyperProps) => {

    const [typingIndex, setTypingIndex] = useState<number>(0);
    const [charArray, setCharArray] = useState<string[] | undefined>([]);
    const [typing, setTyping] = useState<string | undefined>('');
    const [errorMap, setErrorMap] = useState<any>({});
    const [isFinished, setIsFinished] = useState<boolean>(false);

    useEffect(() => {
        if (props.verse) {
            setCharArray(props.verse?.passages[0].replace(/(\r\n|\n|\r)/gm, "").replace(/\s\s+/g, ' ').trim().split(''));
            setTyping('');
            setTypingIndex(0);
            setErrorMap({});
            setIsFinished(false);
        }
    }, [props.verse]);

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (charArray !== undefined && typingIndex === charArray.length - 1) {
          setIsFinished(true);
          return;
        } else if (charArray === undefined) return;
        let keyPressed: string = e.key;
    
        if (keyPressed === 'Shift' || keyPressed === 'Enter') return;
        if (charArray !== undefined && keyPressed !== charArray[typingIndex]) {
          if (keyPressed !== 'Backspace') setErrorMap({ ...errorMap, [typingIndex]: true });
        }
        if (charArray !== undefined && keyPressed === charArray[typingIndex]) {
          setErrorMap({ ...errorMap, [typingIndex]: false });
          setTypingIndex(typingIndex + 1);
          setTyping(typing + keyPressed);
        }
        if (keyPressed === 'Backspace') {
          setTyping(typing?.slice(0, -1));
          if (typingIndex > 0) setTypingIndex(typingIndex - 1);
          if (errorMap[typingIndex]) setErrorMap({ ...errorMap, [typingIndex]: false });
          return;
        }
        setTyping(typing + keyPressed);
        setTypingIndex(typingIndex + 1);
      };
    
    return (
        <div className='text-center'>
            {!isFinished && (
            <div onKeyDown={(e) => handleKeyPress(e)} >
                <div>
                  <h2>{props?.verse?.canonical}</h2>
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
                <textarea placeholder={charArray?.join('').substring(0,11) + "..."} className="p-0 w-96 border-2 border-slate-200 bg-slate-50" value={typing} onKeyDown={(e) => handleKeyPress(e)} ></textarea>
              </div>
            )}
            {isFinished && (
              <div>
                  You did it! <button onClick={() => props.setVerse(undefined)} className="text-blue-400">Pick another verse!</button>
              </div>
            )}
        </div>
        
    );
}

export default Typer;