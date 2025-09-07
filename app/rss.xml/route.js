import axios from 'axios';

export async function GET() {
    try {
        // Get recent products for RSS feed
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        const response = await axios.get(`${apiUrl}/api/products?itemsPerPage=30&sortBy=created_at&sortDesc=true`);
        const recentProducts = response.data;
        
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://e-apple.co.kr';
        
        const rssItems = recentProducts.data.map(product => `
        <item>
            <title>${escapeXml(product.name)}</title>
            <link>${baseUrl}/products/${product.category}/${product.slug || product.id}</link>
            <description>${escapeXml(product.description || product.name)}</description>
            <pubDate>${new Date(product.created_at).toUTCString()}</pubDate>
            <guid>${baseUrl}/products/${product.category}/${product.slug || product.id}</guid>
            ${product.img_info ? `<enclosure url="${product.img_info}" type="image/jpeg" />` : ''}
            <category>${escapeXml(product.category_name || product.category)}</category>
        </item>
    `).join('');

        const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>열매나무 - 신선한 과일 전문몰</title>
        <link>${baseUrl}</link>
        <description>열매나무에서 신선하고 맛있는 제철 과일을 만나보세요</description>
        <language>ko</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
        ${rssItems}
    </channel>
</rss>`;

        return new Response(rss, {
            headers: {
                'Content-Type': 'application/xml',
                'Cache-Control': 'public, max-age=3600'
            }
        });
    } catch (error) {
        console.error('RSS generation error:', error);
        
        // Return empty RSS on error
        const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
    <channel>
        <title>열매나무</title>
        <link>https://e-apple.co.kr</link>
        <description>RSS Feed</description>
    </channel>
</rss>`;
        
        return new Response(rss, {
            headers: {
                'Content-Type': 'application/xml'
            }
        });
    }
}

function escapeXml(text) {
    if (!text) return '';
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}