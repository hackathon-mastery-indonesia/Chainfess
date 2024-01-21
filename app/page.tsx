'use client'
import Image from "next/image";
import '@fontsource/lobster';

import { useState } from "react";
import { FaWallet, FaRegHeart } from "react-icons/fa6";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ChainfessFormData, Form } from "@/app/component/form";
import Web3 from 'web3';


export default function Home() {

  const [selectedSection, setSelectedSection] = useState<string>('Confess')
  const [account,setAccount] = useState<null|string>(null)
  const [web3, setWeb3] = useState<any>(null)

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
    <div className="flex min-h-screen w-screen flex-col items-center bg-slate-950 px-4 pb-4 pt-16">
      <ToastContainer />
      <div className="fixed top-0 left-0  flex items-center w-screen bg-gray-950">
        <div className="mx-auto w-full max-w-5xl p-4 flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-white tracking-wider" style={{ fontFamily: 'Lobster' }}>Chainfess</h1>
          <div className="text-pink-500">
            <FaRegHeart size={24}/>
          </div>
        </div>
      </div>
      <div className="max-w-5xl w-full items-center grow  text-sm flex flex-col">
        {
          <div className="flex flex-col items-center w-full grow  ">
           <div className="flex justify-center items-center w-full space-x-2 mx-auto p-4  md:max-w-96">
           <button onClick={()=>{
            setSelectedSection('Confess')
            console.log('WOI LAH')
        }} className={`px-3 py-2 w-1/2 rounded-md flex items-center justify-center
        text-center ${selectedSection == 'Confess'? 'bg-pink-500' : 'bg-gray-900'}`}><h1>Confession</h1></button>
        <button onClick={()=> {
            setSelectedSection('Create Confess')
            console.log('WOI LAH')
        }} className={`px-3 py-2 w-1/2 rounded-md flex items-center justify-center
        text-center ${selectedSection == 'Create Confess'? 'bg-pink-500' : 'bg-gray-900'}`}><h1>Create Confess</h1></button>
           </div> 
           {
            selectedSection == 'Create Confess' && account && <Form submitCallback={(data)=>{
              //LAKUKAN SESUATU DENGAN DATA
              console.log(data)
            }}/>
           }


           {
            selectedSection == 'Create Confess' && 
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
