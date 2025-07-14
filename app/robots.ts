import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://casadamenina.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/sobre', '/transparencia', '/contato'],
        disallow: ['/admin', '/admin/*', '/_next/', '/api/', '/*.json'],
        crawlDelay: 1,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
