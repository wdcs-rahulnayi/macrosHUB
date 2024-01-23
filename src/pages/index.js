import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });
import Login from "@/components/Login";
import Header from "@/components/Header";

export default function Home() {
  
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Login />
    </main>
  );
}
