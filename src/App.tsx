import React, { useState } from 'react';
import VerseForm from './components/VerseForm';
import Typer from './components/Typer';
import Copyright from './Copyright';
import { getVersesByReference } from './api/bible';

type Verse = {
  ref: string;
  charArray: string[] | undefined;
};

const App: React.FC = () => {
  const [verse, setVerse] = useState<Verse | undefined>();
  const [showingForm, setShowingForm] = useState<boolean>(true);
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      ref: { value: string };
    };
    const ref = target.ref.value;
    setVerse(await getVersesByReference(ref));
    setShowingForm(false);
  };

  return (
    <div className='flex flex-col justify-center mx-4 sm:mx-0'>
      <h1 className='text-center text-2xl'>Verse Typer</h1>
      <div className='flex flex-row justify-around w-96 mx-auto'>
        {showingForm ? (
          <VerseForm handleSubmit={handleSubmit} />
        ) : (
          <button className="text-blue-400" onClick={() => setShowingForm(true)}>New Verse</button>
        )}
      </div>

      {verse && <Typer verse={verse} setVerse={setVerse} />}
      <Copyright />
    </div>
  );
};

export default App;
