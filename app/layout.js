
export const metadata = {
    title: '열매나무 - 신선한 과일 전문몰',
    description: '열매나무에서 신선하고 맛있는 제철 과일을 만나보세요. 사과, 배, 감, 복숭아, 샤인머스캣 등 엄선된 과일을 산지 직송으로 배송해드립니다.',
    keywords: '과일, 사과, 배, 감, 복숭아, 샤인머스캣, 포도, 과일쇼핑몰, 제철과일, 산지직송',
    authors: [{ name: '열매나무' }],
    creator: '열매나무',
    publisher: '열매나무',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    // Open Graph 태그 및 다른 메타 정보
    openGraph: {
        title: '열매나무 - 신선한 과일 전문몰',
        description: '열매나무에서 신선하고 맛있는 제철 과일을 만나보세요. 사과, 배, 감, 복숭아, 샤인머스캣 등 엄선된 과일을 산지 직송으로 배송해드립니다.',
        url: 'https://e-apple.co.kr',
        siteName: '열매나무',
        locale: 'ko_KR',
        type: 'website',
        // images: ['/image/thumbnail-wide.png'],
    },
    alternates: {
        canonical: 'https://e-apple.co.kr',
        types: {
            'application/rss+xml': 'https://e-apple.co.kr/rss.xml',
        },
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
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


