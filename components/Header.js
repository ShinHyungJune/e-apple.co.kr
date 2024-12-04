import Link from "next/link";
import $ from 'jquery';
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
// 리덕스
import {useDispatch, useSelector} from "react-redux";
import {actions} from "@/app/store";


const Header = () => {
    
    return (
        <>
            <header>
                해드
            </header>
        </>

    );
};

export default Header;