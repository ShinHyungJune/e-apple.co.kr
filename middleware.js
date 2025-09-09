import {NextResponse} from "next/server";
export function middleware(request){
    const user = request.cookies.get('user') ? JSON.parse(request.cookies.get('user').value) : null;

    const { pathname } = request.nextUrl;
    const pathnameWithParams = request.nextUrl.pathname + request.nextUrl.search;

    if(pathname === "/login" || pathname === '/admin/login' || pathname === '/mypage/carts' || pathname === '/mypage/orders/guest' || pathname === '/mypage/orders/exchangeReturns' || pathname === '/mypage/orders/exchangeReturns/result' )
        return NextResponse.next();

    if (pathname.startsWith('/admin')) {
        if (!user || !user.is_admin)
            return NextResponse.redirect(new URL('/admin/login?redirect=' + pathnameWithParams, request.url));
    }

    if (pathname.startsWith('/mypage')) {
        if (!user)
            return NextResponse.redirect(new URL('/login?redirect=' + pathnameWithParams, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [ // 해당 url들은 검사 대상자들
        "/admin",
        "/admin/:path*", // "/admin/programs", "/admin/programs/create" 등 /admin/ 뒤에 뭐가 붙던 다 대상자라는 의미

        "/mypage/:path*",
    ],
};