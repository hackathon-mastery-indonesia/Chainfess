import { useRef, useState } from "react"
import { FaFaceDizzy, FaFaceGrin, FaFaceLaughWink, FaFaceRollingEyes } from "react-icons/fa6"
import crypto from 'crypto';


type FessProp = {
    receiver: string,
    sender: string,
    content: string,
    timestamp: any
    
}

function generateSHA256HashSync(text : string) {
    const hash = crypto.createHash('sha256');
    hash.update(text);
    return hash.digest('hex');
}

const Fess: React.FC<FessProp> = ({receiver, sender, content, timestamp}) => {

    const senderRef = useRef<HTMLInputElement>(null)
    const [senderMode, setSenderMode] = useState<string>('QUESTION')
    const [receiverMode, setReceiverMode] = useState<string>('QUESTION')
    const [senderTimeOutId, setSenderTimeoutId] = useState<any>(null)
    const [receiverTimeOutId, setReceiverTimeOutId] = useState<any>(null)
    const receiverRef = useRef<HTMLInputElement>(null)

    const guessSender = () => {
        let guess = senderRef.current? senderRef.current.value : ''
        guess = generateSHA256HashSync(guess)

        if(guess === sender){
            if(senderTimeOutId){
                clearTimeout(senderTimeOutId)
            }
            setSenderMode('TRUE_ANSWER')
            const timeOutId =  setTimeout(()=>{
                setSenderMode('QUESTION')
            }, 5000 )
            setSenderTimeoutId(timeOutId)
        }
        else{
            if(senderTimeOutId){
                clearTimeout(senderTimeOutId)
            }
            setSenderMode('FALSE_ANSWER')
            const timeOutId =  setTimeout(()=>{
                setSenderMode('QUESTION')
            }, 5000 )
            setSenderTimeoutId(timeOutId)
        }

    }
    const guessReceiver = () => {
        let guess = receiverRef.current? receiverRef.current.value : ''
        guess = generateSHA256HashSync(guess)
        if(guess === receiver){
            if(receiverTimeOutId){
                clearTimeout(receiverTimeOutId)
            }
            setReceiverMode('TRUE_ANSWER')
            const timeOutId =  setTimeout(()=>{
                setReceiverMode('QUESTION')
            }, 5000 )
            setReceiverTimeOutId(timeOutId)
        }
        else{
            if(receiverTimeOutId){
                clearTimeout(receiverTimeOutId)
            }
            setReceiverMode('FALSE_ANSWER')
            const timeOutId =  setTimeout(()=>{
                setReceiverMode('QUESTION')
            }, 5000 )
            setReceiverTimeOutId(timeOutId)
        }

    }
    return <div className="w-full mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 min-h-24 bg-pink-500 gap-4 p-4 rounded-md">
        <div className=" col-span-1 lg:col-span-3 ">
         <div className="">
        <label className="block text-gray-200 text-sm font-semibold mb-1">Message</label>
        <div
          className="p-3 min-h-32 h-auto text-justify border border-neutral-700 rounded-md w-full text-white px-3 py-3 mt-1 bg-neutral-900"
          style={{ height: 'auto' }}
        >{content}</div>
      </div>
        </div>
        <div className="col-span-1 lg:col-span-2 ">
        <div className="mb-4">
        <label className="block text-gray-200 text-sm font-semibold mb-1">Sender : {sender}</label>
        <div className="flex items-center space-x-2">
        <input required
          ref={senderRef}
          type="text"
          className="grow p-3 border border-neutral-700 rounded-md text-white px-3 py-3 mt-1 bg-neutral-900"
          placeholder="Guess Sender Address"
        />
        <div className={`${senderMode == 'QUESTION'? 'text-white' : senderMode == 'TRUE_ANSWER'? 'text-green-500' : 'text-red-800'}`} onClick={guessSender}>
        {
            senderMode == 'QUESTION'? <FaFaceRollingEyes   size={24}/> :  senderMode == 'TRUE_ANSWER'?<FaFaceGrin size={24}/>:
            <FaFaceDizzy size={24}/>
        }
        
        </div>
        </div>
        
      </div>
      <div className="mb-4">
        <label className="block text-gray-200 text-sm font-semibold mb-1">Receiver : {receiver}</label>
        <div className="flex items-center space-x-2">
        <input required
          ref={receiverRef}
          type="text"
          className="grow p-3 border border-neutral-700 rounded-md text-white px-3 py-3 mt-1 bg-neutral-900"
          placeholder="Guess Receiver Address"
        />
        <div className={`${receiverMode == 'QUESTION'? 'text-white' : receiverMode == 'TRUE_ANSWER'? 'text-green-500' : 'text-red-800'}`} onClick={guessReceiver}>
        {
            receiverMode == 'QUESTION'? <FaFaceRollingEyes   size={24}/> :  receiverMode == 'TRUE_ANSWER'?<FaFaceGrin size={24}/>:
            <FaFaceDizzy size={24}/>
        }
        
        </div>

        </div>
        
      </div>
        </div>
    </div>
}

export default Fess