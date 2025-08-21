"use client";

import Head from "next/head";
import { ReactNode } from "react";

interface PageSEOProps {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "profile" | "book";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  children?: ReactNode;
}

export default function PageSEO({
  title,
  description,
  keywords = [],
  canonical,
  ogImage = "/og-image.jpg",
  ogType = "website",
  publishedTime,
  modifiedTime,
  author = "PMB Aero Club",
  section,
  tags = [],
  children,
}: PageSEOProps) {
  const fullTitle = title.includes("PMB Aero Club") ? title : `${title} | PMB Aero Club`;
  const fullDescription = description.length > 160 ? description.substring(0, 157) + "..." : description;
  const canonicalUrl = canonical || `https://www.pmbaeroclub.co.za${typeof window !== "undefined" ? window.location.pathname : ""}`;
  
  // Default keywords for aviation/flight training
  const defaultKeywords = [
    "flight training",
    "pilot license",
    "aviation school",
    "Pietermaritzburg",
    "South Africa",
    "PMB Aero Club"
  ];
  
  const allKeywords = [...new Set([...defaultKeywords, ...keywords])];

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={allKeywords.join(", ")} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={`https://www.pmbaeroclub.co.za${ogImage}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:site_name" content="PMB Aero Club" />
      <meta property="og:locale" content="en_ZA" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={`https://www.pmbaeroclub.co.za${ogImage}`} />
      <meta name="twitter:site" content="@pmbaeroclub" />
      <meta name="twitter:creator" content="@pmbaeroclub" />
      
      {/* Article-specific meta tags */}
      {ogType === "article" && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
          {section && <meta property="article:section" content={section} />}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Additional Meta Tags */}
      <meta name="application-name" content="PMB Aero Club" />
      <meta name="apple-mobile-web-app-title" content="PMB Aero Club" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      
      {/* Geographic Meta Tags */}
      <meta name="geo.region" content="ZA" />
      <meta name="geo.placename" content="Pietermaritzburg" />
      <meta name="geo.position" content="-29.6000;30.3796" />
      <meta name="ICBM" content="-29.6000, 30.3796" />
      
      {/* DC Meta Tags */}
      <meta name="DC.title" content={fullTitle} />
      <meta name="DC.creator" content={author} />
      <meta name="DC.subject" content={allKeywords.join(", ")} />
      <meta name="DC.description" content={fullDescription} />
      <meta name="DC.publisher" content="PMB Aero Club" />
      <meta name="DC.date" content={new Date().toISOString()} />
      <meta name="DC.type" content={ogType === "article" ? "Text" : "Service"} />
      <meta name="DC.format" content="text/html" />
      <meta name="DC.identifier" content={canonicalUrl} />
      <meta name="DC.language" content="en" />
      <meta name="DC.coverage" content="Pietermaritzburg, South Africa" />
      <meta name="DC.rights" content="Copyright © 2025 PMB Aero Club. All rights reserved." />
      
      {children}
    </Head>
  );
}
