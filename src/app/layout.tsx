import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Providers } from "./providers";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "PMB Aero Club - Flight Training & Aviation Services | Pietermaritzburg",
    template: "%s | PMB Aero Club"
  },
  description: "Premier flight training school in Pietermaritzburg, South Africa. Offering private pilot license, commercial pilot training, aircraft rental, and aviation services. Experienced instructors, modern aircraft fleet, and comprehensive ground school.",
  keywords: [
    "flight training",
    "pilot license",
    "aviation school",
    "Pietermaritzburg",
    "South Africa",
    "private pilot",
    "commercial pilot",
    "flight instructor",
    "aircraft rental",
    "ground school",
    "aviation training",
    "pilot certification",
    "flight school",
    "aeroclub",
    "aviation services"
  ],
  authors: [{ name: "PMB Aero Club" }],
  creator: "PMB Aero Club",
  publisher: "PMB Aero Club",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.pmbaeroclub.co.za"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: "https://www.pmbaeroclub.co.za",
    siteName: "PMB Aero Club",
    title: "PMB Aero Club - Premier Flight Training in Pietermaritzburg",
    description: "Professional flight training school offering private and commercial pilot licenses. Modern aircraft fleet, experienced instructors, and comprehensive aviation education in Pietermaritzburg, South Africa.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PMB Aero Club - Flight Training School",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PMB Aero Club - Flight Training & Aviation Services",
    description: "Premier flight training school in Pietermaritzburg, South Africa. Professional pilot training, aircraft rental, and aviation services.",
    images: ["/twitter-image.jpg"],
    creator: "@pmbaeroclub",
    site: "@pmbaeroclub",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "Aviation & Flight Training",
  classification: "Flight Training School",
  other: {
    "geo.region": "ZA",
    "geo.placename": "Pietermaritzburg",
    "geo.position": "-29.6000;30.3796",
    "ICBM": "-29.6000, 30.3796",
    "DC.title": "PMB Aero Club",
    "DC.creator": "PMB Aero Club",
    "DC.subject": "Flight Training, Aviation, Pilot License",
    "DC.description": "Premier flight training school in Pietermaritzburg, South Africa",
    "DC.publisher": "PMB Aero Club",
    "DC.contributor": "PMB Aero Club",
    "DC.date": "2025",
    "DC.type": "Service",
    "DC.format": "text/html",
    "DC.identifier": "https://www.pmbaeroclub.co.za",
    "DC.language": "en",
    "DC.coverage": "Pietermaritzburg, South Africa",
    "DC.rights": "Copyright © 2025 PMB Aero Club. All rights reserved.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#f6d57f" />
        <meta name="msapplication-TileColor" content="#f6d57f" />
        <meta name="theme-color" content="#f6d57f" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "PMB Aero Club",
              "alternateName": "Pietermaritzburg Aero Club",
              "description": "Premier flight training school offering private and commercial pilot licenses in Pietermaritzburg, South Africa.",
              "url": "https://www.pmbaeroclub.co.za",
              "logo": "https://www.pmbaeroclub.co.za/logo.png",
              "image": "https://www.pmbaeroclub.co.za/og-image.jpg",
              "telephone": "+27-33-123-4567",
              "email": "info@pmbaeroclub.co.za",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Pietermaritzburg Airport",
                "addressLocality": "Pietermaritzburg",
                "addressRegion": "KwaZulu-Natal",
                "postalCode": "3201",
                "addressCountry": "ZA"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -29.6000,
                "longitude": 30.3796
              },
              "openingHours": "Mo-Fr 08:00-17:00, Sa 08:00-12:00",
              "sameAs": [
                "https://www.facebook.com/pmbaeroclub",
                "https://www.instagram.com/pmbaeroclub",
                "https://www.linkedin.com/company/pmb-aero-club"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Flight Training Programs",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Course",
                      "name": "Private Pilot License",
                      "description": "Learn to fly for personal use and recreation"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Course",
                      "name": "Commercial Pilot License",
                      "description": "Professional pilot training for commercial operations"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Course",
                      "name": "Flight Instructor Rating",
                      "description": "Become a certified flight instructor"
                    }
                  }
                ]
              },
              "foundingDate": "1990",
              "areaServed": {
                "@type": "Country",
                "name": "South Africa"
              }
            })
          }}
        />
      </head>
      <body className={font.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
