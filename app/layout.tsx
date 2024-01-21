'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";


const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <React.StrictMode>
      <html lang="en">
      <body className={inter.className +' overflow-x-hidden'}>{children}</body>
    </html>
    </React.StrictMode>
    
  );
}
