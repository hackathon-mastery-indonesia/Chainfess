'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import { MetaMaskProvider } from '@metamask/sdk-react';
import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <React.StrictMode>
      <html lang="en">
        <MetaMaskProvider debug={false} sdkOptions={{
      dappMetadata: {
        name: "Example React Dapp",
        url: window.location.href,
      }
    }}>
      <ToastContainer />
      <body className={inter.className}>{children}</body>
      </MetaMaskProvider>
      
    </html>
    </React.StrictMode>
    
  );
}
