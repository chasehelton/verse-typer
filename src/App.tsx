import React, { useState } from 'react';
import Typer from './Typer';
import Copyright from './Copyright';
import { getVersesByReference } from './api/bible';

type Verse = {
  ref: string;
  charArray: string[] | undefined;
};

const App: React.FC = () => {
  const [verse, setVerse] = useState<Verse | undefined>();
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      ref: { value: string };
    };
    const ref = target.ref.value;
    setVerse(await getVersesByReference(ref));
  };

  return (
    <div className='text-center'>
      {!verse && (
        <>
          <h1 className='text-2xl'>Search by Reference</h1>
          <form
            className='flex flex-col justify-center'
            onSubmit={handleSubmit}
          >
            <div className='flex flex-col justify-center w-96 mx-auto'>
              <div className='flex flex-row justify-between mx-5 my-2'>
                <label htmlFor='ref'>Reference</label>
                <input
                  className='border-slate-200 border-2 rounded-md ml-2 w-48'
                  required
                  type='text'
                  name='ref'
                  id='ref'
                  placeholder='e.g. Psalm 1:1-6'
                />
              </div>
            </div>
            <button
              className='w-24 mx-auto bg-blue-500 hover:bg-blue-400 text-white px-4 rounded-md'
              type='submit'
            >
              Submit
            </button>
          </form>
        </>
      )}

      {verse && <Typer verse={verse} setVerse={setVerse} />}
      <Copyright />
    </div>
  );
};

export default App;
