// In Next.js, a robots.txt file tells search engines which parts of your site should or shouldn’t be crawled or indexed.
// ✅ When You Need robots.txt
//
// Use it when:
// 	•	You want to allow/disallow indexing of certain paths (e.g., /admin)
// 	•	You have a public site and want better SEO
// 	•	You want to block crawling in staging environments

import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const runtime = 'edge'; // optional for performance

export async function GET(req: NextRequest) {
    const isProduction = process.env.NODE_ENV === 'production';
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';

    const content = `
User-agent: *
Disallow: ${isProduction ? '' : '/'}
Allow: /
Sitemap: ${baseUrl}/sitemap.xml
  `.trim();

    return new NextResponse(content, {
        headers: {
            'Content-Type': 'text/plain',
        },
    });
}