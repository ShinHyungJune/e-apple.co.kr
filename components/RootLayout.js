'use client'

import {Provider, useDispatch} from "react-redux";
import store, {actions} from '../app/store';
import Message from "@/components/Message";
import Loading from "@/components/Loading";
import {Suspense, useEffect} from "react";

export default function RootLayout({children}) {

    return (
        <html lang="ko">
        <body>
        <Provider store={store}>
            <Message/>
            <Loading/>
            <Suspense>
                {children}
            </Suspense>
        </Provider>
        </body>
        </html>
    );
}