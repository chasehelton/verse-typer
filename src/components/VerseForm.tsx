interface VerseFormProps {
    handleSubmit: (event: React.SyntheticEvent) => void;
}

const VerseForm: React.FC<VerseFormProps> = (props: VerseFormProps) => {
  return (
    <form className='flex flex-col justify-center mt-2' onSubmit={props.handleSubmit}>
      <div className='flex flex-col justify-center w-96 mx-auto'>
        <div className='flex flex-row w-full justify-between bg-slate-100 p-1 rounded-md'>
          <input
            className='px-2 rounded-md w-64'
            required
            type='text'
            name='ref'
            id='ref'
            placeholder='Reference (e.g. Psalm 1:1-6)'
          />
          <button
            className='w-24 px-2 bg-blue-500 hover:bg-blue-400 text-white rounded-md'
            type='submit'
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default VerseForm;