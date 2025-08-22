"use client";

import { ReactNode } from "react";

interface StructuredDataProps {
  type: "organization" | "course" | "service" | "article" | "breadcrumb" | "faq";
  data: Record<string, unknown>;
  children?: ReactNode;
}

export default function StructuredData({ type, data, children }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case "organization":
        return {
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
          "foundingDate": "1990",
          "areaServed": {
            "@type": "Country",
            "name": "South Africa"
          },
          ...data
        };

      case "course":
        return {
          "@context": "https://schema.org",
          "@type": "Course",
          "name": data.name || "Flight Training Course",
          "description": data.description || "Professional flight training course",
          "provider": {
            "@type": "Organization",
            "name": "PMB Aero Club",
            "sameAs": "https://www.pmbaeroclub.co.za"
          },
          "coursePrerequisites": data.prerequisites || "Medical certificate, minimum age requirements",
          "educationalLevel": "Professional",
          "inLanguage": "en",
          "isAccessibleForFree": false,
          "courseMode": "blended",
          "timeRequired": data.duration || "P6M",
          "teaches": data.skills || ["Flight navigation", "Aircraft control", "Safety procedures"],
          ...data
        };

      case "service":
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": data.name || "Aviation Service",
          "description": data.description || "Professional aviation service",
          "provider": {
            "@type": "Organization",
            "name": "PMB Aero Club",
            "sameAs": "https://www.pmbaeroclub.co.za"
          },
          "areaServed": {
            "@type": "Country",
            "name": "South Africa"
          },
          "serviceType": data.serviceType || "Flight Training",
          "offers": {
            "@type": "Offer",
            "price": data.price || "Contact for pricing",
            "priceCurrency": "ZAR",
            "availability": "https://schema.org/InStock"
          },
          ...data
        };

      case "article":
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": data.headline || "Aviation Article",
          "description": data.description || "Informative article about aviation",
          "image": data.image || "https://www.pmbaeroclub.co.za/og-image.jpg",
          "author": {
            "@type": "Organization",
            "name": "PMB Aero Club"
          },
          "publisher": {
            "@type": "Organization",
            "name": "PMB Aero Club",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.pmbaeroclub.co.za/logo.png"
            }
          },
          "datePublished": data.publishedTime || new Date().toISOString(),
          "dateModified": data.modifiedTime || new Date().toISOString(),
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": data.url || "https://www.pmbaeroclub.co.za"
          },
          ...data
        };

      case "breadcrumb":
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": data.items || [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.pmbaeroclub.co.za"
            }
          ]
        };

      case "faq":
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": data.questions || [
            {
              "@type": "Question",
              "name": "What courses do you offer?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We offer Private Pilot License, Commercial Pilot License, and Flight Instructor Rating courses."
              }
            }
          ]
        };

      default:
        return data;
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getStructuredData())
        }}
      />
      {children}
    </>
  );
}
