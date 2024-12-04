'use client'
import { useDispatch, useSelector } from "react-redux";
import { actions } from "@/app/store";

import {Suspense, useEffect} from 'react';
import Script from 'next/script';
import Head from 'next/head';

import "../../../public/admin/css/reset.css";
import "../../../public/css/module.css";
import "../../../public/admin/css/swiper.min.css";
import "../../../public/admin/css/style.css";
import Header from "@/public/admin/components/Header";
import Sidebar from "@/public/admin/components/Sidebar";

// api
// import categoriesApi from "@/lib/api/categoriesApi";
import usersApi from "@/lib/api/usersApi";


export default function RootLayout({ children }) {

  const dispatch = useDispatch(); // Redux dispatch 사용

  // function getCategories() {
  //     categoriesApi.index({}, (response) => {
  //         dispatch(actions.setCategories(response.data.data)); // Redux 상태에 카테고리 저장
  //     });
  // }

  // useEffect(()=>{
  //     getCategories()
  // },[])

  const user = useSelector(state => state.app.user);

  useEffect(()=>{
      dispatch(actions.setGuestId());

      if (user)
          usersApi.show();
  },[])

  return (
    <>
      <Script
        src="/admin/js/jquery.js"
        strategy="beforeInteractive"
      />
      <Script
        src="/admin/js/swiper.min.js"
        strategy="beforeInteractive"
      />
        <div id="wrap">
            <Header />

            <main id="main" className="main">
                <Sidebar />

                {children}
            </main>

            <footer className="footer"></footer>
        </div>

    </>
  );
}
