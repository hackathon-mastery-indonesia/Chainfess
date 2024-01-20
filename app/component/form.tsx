type FormProps = {
    onSubmit: () => void,

}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  return (
    <form className="w-full max-w-lg p-8 bg-slate-950 rounded-lg shadow-lg">
      <div className="mb-4">
        <label className="block text-gray-400 text-sm font-semibold mb-2">Sender</label>
        <input required
          type="text"
          className=" p-3 border border-neutral-700 rounded-md w-full text-white px-3 py-3 mt-1 bg-neutral-900"
          placeholder="Your name"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-400 text-sm font-semibold mb-2">Receiver</label>
        <input required
          type="text"
          className="w-full p-3 border border-neutral-700 rounded-md text-white px-3 py-3 mt-1 bg-neutral-900"
          placeholder="Recipient's name"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-400 text-sm font-semibold mb-2">Message</label>
        <textarea required
          className="p-3 h-32 border border-neutral-700 rounded-md w-full text-white px-3 py-3 mt-1 bg-neutral-900"
          placeholder="Your confession..."
        ></textarea>
      </div>
      <button className="w-full bg-pink-500 text-white font-bold p-3 rounded hover:bg-pink-600 transition duration-300">
        Create Confession <span className="text-lg">♡</span>
      </button>
    </form>
  );
};


export {Form}

