'use client'
import Image from "next/image";
import '@fontsource/lobster';

import { useEffect, useState } from "react";
import { FaWallet, FaRegHeart } from "react-icons/fa6";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ChainfessFormData, Form } from "@/app/component/form";
import Web3 from 'web3';
import MaskedTextField from "./component/masked_textfield";
import Fess from "./component/fess";
import crypto from 'crypto';


export default function Home() {
  const contractAddress = "0x54E8dc13e24D70A37D26B20Ce3AF69296ac37A77"
  const [selectedSection, setSelectedSection] = useState<string>('Confess')
  const [account,setAccount] = useState<null|string>(null)
  const [web3, setWeb3] = useState<any>(null)
  const [fire, setFire] = useState<boolean>(false)
  const [fess, setFess] = useState<any []>([])

  const shouldFire = () => {
    setFire(prev => !prev)
  }

  const contractABI = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "sender",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "content",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "receiver",
          "type": "string"
        }
      ],
      "name": "createZKFess",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "getOwnerZKFess",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "getOwnerZKFessCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "getOwnerZKFessList",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "getZKFess",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "helperZKFessList",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "sender",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "content",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "receiver",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            }
          ],
          "internalType": "struct ChainFess.ZKFess[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "ownerZKFessList",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "tokenCounter",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "zkFessToOwner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "zkFesses",
      "outputs": [
        {
          "internalType": "string",
          "name": "sender",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "content",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "receiver",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
  function generateSHA256HashSync(text : string) {
    const hash = crypto.createHash('sha256');
    hash.update(text);
    return hash.digest('hex');
}
  useEffect(()=>{
    connectWallet()
  },[])

  useEffect(()=>{
    if(account != null && web3 != null){
      try{
        helperZKFessList() 
        
      }
      catch(err){
        toast.info('Please allow hedera service')
        changeToHedera()
      }
      
    }
  },[account, fire ])

  async function helperZKFessList() {
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        const zkFessList = await contract.methods.helperZKFessList().call({ from: account });
        const lst : any [] = []
        zkFessList.forEach((fessData : any)=>{
          lst.push({
            content: fessData.content,
            receiver: fessData.receiver,
            sender: fessData.sender,
            timestamp: fessData.timestamp
          })
        })
        setFess(lst)
}

const changeToHedera = async () => {
  const windowWithEthereum = window as Window & { ethereum?: any };
  try {
    await windowWithEthereum.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: '0x128',
          chainName: 'Hedera Testnet',
          rpcUrls: ['https://testnet.hashio.io/api'] /* ... */,
        },
      ],
    });
    shouldFire()
  } catch (error) {
    // This error code indicates that the chain has not been added to MetaMask.
    shouldFire()
    // handle other "switch" errors
  }
}

  async function getZKFess(id: any) {
    try {
      const contract = new web3.eth.Contract(contractABI, contractAddress);
      const zkFess = await contract.methods.getZKFess(id).call();
      console.log(zkFess);
      return zkFess;
    } catch (error) {
      console.error("Error fetching ZKFess: ", error);
    }
}


  async function createZKFess(sender : string, content : string, receiver: string) {
      sender = generateSHA256HashSync(sender)
      receiver = generateSHA256HashSync(receiver)
      console.log(sender)

      const contract = new web3.eth.Contract(contractABI, contractAddress);
      await contract.methods.createZKFess(sender, content, receiver)
        .send({ from: account });
      console.log("ZKFess created successfully");
  }

  async function connectWallet() {
      const windowWithEthereum = window as Window & { ethereum?: any };

      if (typeof window !== 'undefined' && windowWithEthereum.ethereum){
        try {
          const accounts = await windowWithEthereum.ethereum.request({ method: 'eth_requestAccounts' });
          setAccount(accounts[0])
          setWeb3(new Web3(windowWithEthereum.ethereum));
          console.log(accounts[0])
          
      } catch (error) {
          console.error("Error connecting to MetaMask", error);
          toast.error(`Error connecting to MetaMask: ${error}`)
      }
      }
       else {
        toast.error(`Please install MetaMask to use this feature.`)
    }
}
 
  return (
    <div className="flex min-h-screen w-screen overflow-x-hidden flex-col items-center bg-slate-950 px-4 pb-4 pt-16">
      <ToastContainer />
      <div className="fixed top-0 left-0 z-30 flex items-center w-screen bg-gray-950">
        <div className="mx-auto w-full max-w-5xl p-4 flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-white tracking-wider" style={{ fontFamily: 'Lobster' }}>Chainfess</h1>
          <div className="text-pink-500">
            <FaRegHeart size={24}/>
          </div>
        </div>
      </div>
      <div className="max-w-5xl w-full items-center grow overflow-x-hidden text-sm flex flex-col">
        {account && <div className="flex w-full justify-center mt-2">
          <div className="w-full max-w-md">
            <MaskedTextField strKey="Your Account Address" value={account}/>
          </div>
        </div>
        }
        {
          <div className="flex flex-col items-center w-full grow overflow-x-hidden  ">
           <div className="flex justify-center items-center w-full space-x-2 mx-auto p-4 overflow-x-hidden  md:max-w-96">
           <button onClick={()=>{ 
            setSelectedSection('Confess')
        }} className={`px-3 py-2 w-1/2 rounded-md flex items-center justify-center
        text-center ${selectedSection == 'Confess'? 'bg-pink-500' : 'bg-gray-900'}`}><h1>Confession</h1></button>
        <button onClick={()=> {
            setSelectedSection('Create Confess')
        }} className={`px-3 py-2 w-1/2 rounded-md flex items-center justify-center
        text-center ${selectedSection == 'Create Confess'? 'bg-pink-500' : 'bg-gray-900'}`}><h1>Create Confess</h1></button>
           </div> 
           {
            selectedSection == 'Create Confess' && account && <Form submitCallback={async (data)=>{
              await createZKFess(data.sender, data.message, data.receiver)
              shouldFire()
              setSelectedSection('Confess')
            }}/>
           }
           {
            selectedSection == 'Confess' && account &&
            <div className="flex flex-col w-full grow overflow-x-hidden ">
              { fess.length == 0 &&
                <div className="mx-auto my-auto pb-12">
                <div>
                  <h1 className="text-white text-center mb-4 font-semibold">There is no confession yet</h1>
                </div>
              </div>
              }
              {
                fess.length != 0 && fess.map((fessData, index)=>{
                  return <Fess key={index} receiver={fessData.receiver} sender={fessData.sender} content={fessData.content} timestamp={fessData.times}/>
                })
              }
             
            </div>
           }




           {
              
              !account && <div className="mx-auto my-auto pb-12">
                <div>
                  <h1 className="text-white text-center mb-4 font-semibold">You are not authenticated. Please Sign in.</h1>
                </div>
                  <button onClick={connectWallet} className="bg-gray-900 w-full justify-center flex items-center text-pink-500 font-bold rounded-md px-6 py-3 hover:bg-gray-800 transition duration-300">
                            <FaWallet size={24} />
                            <h1 className='ml-3 text-lg font-bold'>Sign In</h1>
                        </button>
              </div>
            }
          </div>
        }
        
      </div>
    </div>
  );
}
