import React, { useState } from 'react';
import Typer from './Typer';
import Copyright from './Copyright';
import { getBible } from './api/bible';

type Verse = {
  canonical: string;
  parsed: any;
  passage_meta: any;
  passages: string[];
  query: string;
};

const App: React.FC = () => {
  const [verse, setVerse] = useState<Verse | undefined>();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      book: { value: string };
      chapter: { value: string };
      verse: { value: string };
    };
    const book = target.book.value;
    const chapter = target.chapter.value;
    const verse = target.verse.value;
    const returnedVerse = await getBible(book, chapter, verse);
    setVerse(returnedVerse);
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
                <label htmlFor='book'>Book</label>
                <input
                  className='border-slate-200 border-2 rounded-md ml-2 w-48'
                  required
                  type='text'
                  name='book'
                  id='book'
                  placeholder="'John'"
                />
              </div>
              <div className='flex flex-row justify-between mx-5 my-2'>
                <label htmlFor='chapter'>Chapter(s)</label>
                <input
                  className='border-slate-200 border-2 rounded-md ml-2 w-48'
                  required
                  type='text'
                  name='chapter'
                  id='chapter'
                  placeholder="'1-2', '3'"
                />
              </div>
              <div className='flex flex-row justify-between mx-5 my-2'>
                <label htmlFor='verse'>Verse(s)</label>
                <input
                  className='border-slate-200 border-2 rounded-md ml-2 w-48'
                  type='text'
                  name='verse'
                  id='verse'
                  placeholder="'1-2', '3'"
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
