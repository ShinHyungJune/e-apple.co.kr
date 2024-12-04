'use client'
import { useEffect } from 'react';
import Head from 'next/head';

import "../../../public/admin/css/reset.css";
import "../../../public/css/module.css";
import "../../../public/admin/css/swiper.min.css";
import "../../../public/admin/css/style.css";
import Header from "@/public/admin/components/Header";
import Sidebar from "@/public/admin/components/Sidebar";

export default function RootLayout({ children }) {

  

  return (
    <>
        {children}
    </>
  );
}
