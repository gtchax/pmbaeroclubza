import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/dashboard/",
          "/_next/",
          "/private/",
          "/temp/",
          "/test/",
          "*.json",
          "*.xml",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/dashboard/",
          "/_next/",
          "/private/",
          "/temp/",
          "/test/",
        ],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/dashboard/",
          "/_next/",
          "/private/",
          "/temp/",
          "/test/",
        ],
      },
    ],
    sitemap: "https://www.pmbaeroclubza.vercel.app/sitemap.xml",
    host: "https://www.pmbaeroclubza.vercel.app",
  };
}
