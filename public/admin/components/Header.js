// components/Sidebar.js
'use client';
import React from 'react';
import { useRouter, useSearchParams } from "next/navigation";

// 상태관리
import {useDispatch} from "react-redux";
import {actions} from "@/app/store";

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // 로그아웃
  function logout(e) {
      e.preventDefault();

      dispatch(actions.logout());

      router.push('/admin/login');
  }

  return (
    <header className="header">
        <div className="fragment">
          <h3 className="title">
            안녕하세요, <span className="point"></span>님.
          </h3>
        </div>
        <div className="fragment">
          <a
            href="#"
            className=""
            style={{ textDecoration: "underline", color: "#777" }}
            onClick={logout}
          >
            로그아웃
          </a>
        </div>
      </header>
  );
};

export default Header;
