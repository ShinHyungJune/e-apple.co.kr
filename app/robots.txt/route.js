export async function GET() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://e-apple.co.kr';
    
    const robots = `User-agent: *
Allow: /
Disallow: /mypage/
Disallow: /cart
Disallow: /order
Disallow: /admin/

Sitemap: ${baseUrl}/sitemap.xml`;

    return new Response(robots, {
        headers: {
            'Content-Type': 'text/plain',
        }
    });
}