import { api } from '@/lib/api/api';

export async function GET() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://e-apple.co.kr';
        
        // Get all products for sitemap
        const products = await api('/api/products?itemsPerPage=1000');
        
        // Static pages
        const staticPages = [
            '',
            '/login',
            '/signup',
            '/mypage',
            '/cart',
            '/order',
            '/products/apple',
            '/products/pear',
            '/products/persimmon',
            '/products/peach',
            '/products/shine_muscat',
            '/products/grape',
            '/products/md_packages',
            '/inquiry',
            '/notices',
            '/about',
            '/terms',
            '/privacy'
        ];
        
        const staticUrls = staticPages.map(page => `
        <url>
            <loc>${baseUrl}${page}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>${page === '' ? 'daily' : 'weekly'}</changefreq>
            <priority>${page === '' ? '1.0' : '0.8'}</priority>
        </url>
    `).join('');
        
        const productUrls = products.data.map(product => `
        <url>
            <loc>${baseUrl}/products/${product.category}/${product.slug || product.id}</loc>
            <lastmod>${new Date(product.updated_at || product.created_at).toISOString()}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.6</priority>
        </url>
    `).join('');

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticUrls}
    ${productUrls}
</urlset>`;

        return new Response(sitemap, {
            headers: {
                'Content-Type': 'application/xml',
                'Cache-Control': 'public, max-age=3600'
            }
        });
    } catch (error) {
        console.error('Sitemap generation error:', error);
        
        // Return basic sitemap on error
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://e-apple.co.kr';
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${baseUrl}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
</urlset>`;
        
        return new Response(sitemap, {
            headers: {
                'Content-Type': 'application/xml'
            }
        });
    }
}