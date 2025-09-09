import withBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {
    // 프로덕션 빌드 최적화
    swcMinify: true,
    compress: true,
    
    // 이미지 최적화
    images: {
        domains: ['api.e-apple.co.kr', 'localhost'],
        formats: ['image/avif', 'image/webp'],
        minimumCacheTTL: 60,
    },
    
    // 빌드 출력 최적화
    output: 'standalone',
    
    // React Strict Mode
    reactStrictMode: true,
    
    // 불필요한 페이지 사전 렌더링 방지
    experimental: {
        optimizeCss: false, // critters 모듈 없어서 비활성화
        scrollRestoration: true,
    },
    
    // Webpack 최적화
    webpack: (config, { isServer }) => {
        // 클라이언트 사이드 번들 최적화
        if (!isServer) {
            config.optimization.splitChunks = {
                chunks: 'all',
                cacheGroups: {
                    default: false,
                    vendors: false,
                    // 공통 모듈 분리
                    commons: {
                        name: 'commons',
                        chunks: 'all',
                        minChunks: 2,
                    },
                    // React 관련 라이브러리 분리
                    react: {
                        name: 'react',
                        test: /[\\/]node_modules[\\/](react|react-dom|react-router)[\\/]/,
                        chunks: 'all',
                        priority: 10,
                    },
                    // 큰 라이브러리들 개별 분리
                    lib: {
                        test: /[\\/]node_modules[\\/]/,
                        name(module) {
                            const match = module.context.match(
                                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                            );
                            if (!match) return 'npm.lib';
                            const packageName = match[1];
                            return `npm.${packageName.replace('@', '')}`;
                        },
                        priority: 5,
                        reuseExistingChunk: true,
                    },
                },
            };
        }
        
        // 모듈 교체로 번들 사이즈 감소
        config.resolve.alias = {
            ...config.resolve.alias,
            // Lodash 최적화
            'lodash': 'lodash-es',
        };
        
        return config;
    },
    
    // 환경 변수 설정
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
        NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
    },
};

// Bundle Analyzer 설정 (ANALYZE=true npm run build 로 실행)
const withAnalyzer = withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
});

export default withAnalyzer(nextConfig);