import { useRef } from "react";

type FormProps = {
    submitCallback: (data: ChainfessFormData) => void,
}
export type ChainfessFormData = {
  sender: string | null,
  receiver: string | null,
  message: string | null,
  timestamp: string
}

function getISO8601Timestamp() : string {
  const now = new Date();
  const isoTimestamp = now.toISOString();
  return isoTimestamp;
}

const Form: React.FC<FormProps> = ({ submitCallback }) => {

  const senderRef = useRef<HTMLInputElement>(null)
  const receiverRef = useRef<HTMLInputElement>(null)
  const messageRef  = useRef<HTMLTextAreaElement>(null)
  const submitForm = async () => {
    console.log('SUBMITTING')
    const data : ChainfessFormData = {
      sender: senderRef.current? senderRef.current.value : '',
      receiver: receiverRef.current? receiverRef.current.value : '',
      message: messageRef.current? messageRef.current.value : '', 
      timestamp: getISO8601Timestamp()
    }
    submitCallback(data)
  }

  return (
    <form onSubmit={submitForm} className="w-full max-w-lg p-8 bg-slate-950 rounded-lg shadow-lg">
      <div className="mb-4">
        <label className="block text-gray-400 text-sm font-semibold mb-2">Sender</label>
        <input required
          ref={senderRef}
          type="text"
          className=" p-3 border border-neutral-700 rounded-md w-full text-white px-3 py-3 mt-1 bg-neutral-900"
          placeholder="Your name"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-400 text-sm font-semibold mb-2">Receiver</label>
        <input required
          ref={receiverRef}
          type="text"
          className="w-full p-3 border border-neutral-700 rounded-md text-white px-3 py-3 mt-1 bg-neutral-900"
          placeholder="Recipient's name"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-400 text-sm font-semibold mb-2">Message</label>
        <textarea required
          ref={messageRef}
          className="p-3 h-32 border border-neutral-700 rounded-md w-full text-white px-3 py-3 mt-1 bg-neutral-900"
          placeholder="Your confession..."
        ></textarea>
      </div>
      <button type="submit" className="w-full bg-pink-500 text-white font-bold p-3 rounded hover:bg-pink-600 transition duration-300">
        Create Confession <span className="text-lg">♡</span>
      </button>
    </form>
  );
};


export {Form}


