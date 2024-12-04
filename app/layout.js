
export const metadata = {
    title: 'title',
    description: 'description',
    // Open Graph 태그 및 다른 메타 정보
    openGraph: {
        title: 'title',
        description: 'description',
        // images: ['/image/thumbnail-wide.png'],
        // url: 'https://janginart.co.kr',
    },
    // icons: {
    //     icon: "/image/favicon.ico",
    //     apple: [
    //         '/image/apple-icon-57x57.png',
    //         '/image/apple-icon-60x60.png',
    //         '/image/apple-icon-72x72.png',
    //         '/image/apple-icon-76x76.png',
    //         '/image/apple-icon-114x114.png',
    //         '/image/apple-icon-120x120.png',
    //         '/image/apple-icon-144x144.png',
    //         '/image/apple-icon-152x152.png',
    //         '/image/apple-icon-180x180.png',
    //     ],
    //     favicon: [
    //         '/image/favicon-32x32.png',
    //         '/image/favicon-96x96.png',
    //         '/image/favicon-16x16.png',
    //     ],
    //     android: '/image/android-icon-192x192.png',
    // },
    themeColor: '#ffffff',
};

import RootLayout from "@/components/RootLayout";

export default function MainLayout({ children }) {
    return <RootLayout>{children}</RootLayout>;
}


