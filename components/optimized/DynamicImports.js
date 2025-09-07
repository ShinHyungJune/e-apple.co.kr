import dynamic from 'next/dynamic';

// 무거운 컴포넌트들을 동적으로 로드
export const DynamicQuillEditor = dynamic(
    () => import('react-quill'),
    { 
        ssr: false,
        loading: () => <div className="editor-loading">에디터 로딩중...</div>
    }
);

export const DynamicSwiper = dynamic(
    () => import('swiper/react').then(mod => mod.Swiper),
    { 
        ssr: false,
        loading: () => <div className="swiper-loading">로딩중...</div>
    }
);

export const DynamicSwiperSlide = dynamic(
    () => import('swiper/react').then(mod => mod.SwiperSlide),
    { ssr: false }
);

// 모달 컴포넌트들 동적 로드
export const DynamicPopupOrder = dynamic(
    () => import('../popups/PopupOrder'),
    { 
        ssr: false,
        loading: () => null
    }
);

export const DynamicPopupDeliveryAddress = dynamic(
    () => import('../popups/PopupDeliveryAddress'),
    { 
        ssr: false,
        loading: () => null
    }
);

export const DynamicPopupCart = dynamic(
    () => import('../popups/PopupCart'),
    { 
        ssr: false,
        loading: () => null
    }
);