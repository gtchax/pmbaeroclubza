# SEO Components & Implementation Guide

This directory contains comprehensive SEO components and utilities for the PMB Aero Club website to improve search engine visibility and user experience.

## Components Overview

### 1. PageSEO

Comprehensive SEO component that provides all necessary meta tags for individual pages.

### 2. StructuredData

JSON-LD structured data component for different content types to improve search engine understanding.

## Implementation

### Basic Page SEO

```tsx
import { PageSEO } from "@/components/seo";

export default function FlightSchoolPage() {
  return (
    <>
      <PageSEO
        title="Flight School - Private & Commercial Pilot Training"
        description="Professional flight training programs including Private Pilot License, Commercial Pilot License, and Flight Instructor Rating. Modern aircraft fleet and experienced instructors in Pietermaritzburg."
        keywords={[
          "private pilot license",
          "commercial pilot training",
          "flight instructor",
        ]}
        canonical="/flight-school"
      />
      {/* Page content */}
    </>
  );
}
```

### Article SEO

```tsx
import { PageSEO } from "@/components/seo";

export default function BlogPost() {
  return (
    <>
      <PageSEO
        title="How to Choose the Right Flight School"
        description="Essential guide for aspiring pilots on selecting the perfect flight school. Learn what to look for in training programs, instructors, and facilities."
        keywords={[
          "flight school selection",
          "pilot training guide",
          "aviation education",
        ]}
        ogType="article"
        publishedTime="2025-01-15T10:00:00Z"
        modifiedTime="2025-01-15T10:00:00Z"
        author="PMB Aero Club"
        section="Aviation Education"
        tags={["flight training", "pilot education", "aviation tips"]}
      />
      {/* Article content */}
    </>
  );
}
```

### Structured Data

```tsx
import { StructuredData } from "@/components/seo";

export default function CoursePage() {
  return (
    <>
      <StructuredData
        type="course"
        data={{
          name: "Private Pilot License",
          description: "Learn to fly for personal use and recreation",
          prerequisites: "Medical certificate, minimum age 17",
          duration: "P6M",
          skills: [
            "Flight navigation",
            "Aircraft control",
            "Safety procedures",
          ],
        }}
      />
      {/* Course content */}
    </>
  );
}
```

## SEO Features Implemented

### 1. Meta Tags

- **Title**: Dynamic titles with brand suffix
- **Description**: Optimized descriptions (max 160 characters)
- **Keywords**: Relevant aviation and location-based keywords
- **Author**: PMB Aero Club attribution
- **Robots**: Search engine crawling instructions

### 2. Open Graph

- **Title**: Social media sharing titles
- **Description**: Social media descriptions
- **Image**: Custom OG images for each page
- **Type**: Content type specification
- **Locale**: South African locale (en_ZA)

### 3. Twitter Cards

- **Card Type**: Large image cards
- **Title**: Twitter-optimized titles
- **Description**: Twitter-optimized descriptions
- **Image**: Twitter-specific images
- **Handle**: @pmbaeroclub

### 4. Geographic Meta Tags

- **Region**: ZA (South Africa)
- **Place**: Pietermaritzburg
- **Coordinates**: -29.6000, 30.3796
- **ICBM**: Geographic positioning

### 5. Dublin Core Meta Tags

- **Title**: Page title
- **Creator**: Content creator
- **Subject**: Keywords and topics
- **Description**: Page description
- **Publisher**: PMB Aero Club
- **Date**: Publication date
- **Type**: Content type
- **Format**: HTML format
- **Identifier**: Canonical URL
- **Language**: English
- **Coverage**: Geographic coverage
- **Rights**: Copyright information

### 6. Structured Data (JSON-LD)

- **Organization**: Educational organization schema
- **Course**: Flight training course schema
- **Service**: Aviation service schema
- **Article**: Blog post schema
- **Breadcrumb**: Navigation schema
- **FAQ**: Frequently asked questions schema

## SEO Best Practices

### 1. Title Optimization

- Include primary keyword near the beginning
- Keep under 60 characters
- Include brand name when appropriate
- Use action words for conversion

### 2. Description Optimization

- Include primary and secondary keywords
- Keep under 160 characters
- Include call-to-action when appropriate
- Make it compelling and informative

### 3. Keyword Strategy

- **Primary Keywords**: flight training, pilot license, aviation school
- **Location Keywords**: Pietermaritzburg, South Africa, KwaZulu-Natal
- **Service Keywords**: private pilot, commercial pilot, flight instructor
- **Long-tail Keywords**: flight training Pietermaritzburg, pilot license South Africa

### 4. Image Optimization

- Use descriptive alt text
- Optimize file sizes
- Use appropriate dimensions for social sharing
- Include relevant keywords in filenames

### 5. Internal Linking

- Link between related pages
- Use descriptive anchor text
- Create logical content hierarchy
- Implement breadcrumb navigation

## Technical SEO

### 1. Performance

- Optimize images and assets
- Minimize CSS and JavaScript
- Use Next.js optimization features
- Implement lazy loading

### 2. Mobile Optimization

- Responsive design
- Mobile-first approach
- Touch-friendly navigation
- Fast loading on mobile devices

### 3. Security

- HTTPS implementation
- Secure headers
- Content Security Policy
- XSS protection

### 4. Accessibility

- Semantic HTML structure
- ARIA labels
- Keyboard navigation
- Screen reader compatibility

## Monitoring & Analytics

### 1. Search Console

- Monitor search performance
- Track keyword rankings
- Identify technical issues
- Monitor mobile usability

### 2. Analytics

- Track user behavior
- Monitor conversion rates
- Analyze traffic sources
- Identify popular content

### 3. Performance Monitoring

- Core Web Vitals
- Page load speed
- Mobile performance
- User experience metrics

## Local SEO

### 1. Google My Business

- Complete business profile
- Regular updates and posts
- Customer reviews
- Local keyword optimization

### 2. Local Citations

- Consistent business information
- Local business directories
- Industry-specific listings
- Social media profiles

### 3. Local Keywords

- "flight training Pietermaritzburg"
- "pilot school South Africa"
- "aviation training KwaZulu-Natal"
- "flight instructor Pietermaritzburg"

## Content Strategy

### 1. Blog Posts

- Regular aviation content
- Pilot training tips
- Industry news and updates
- Student success stories

### 2. Landing Pages

- Course-specific pages
- Service pages
- Location-based pages
- Conversion-optimized pages

### 3. Resource Pages

- Pilot resources
- Training materials
- Safety information
- Regulatory updates

## Implementation Checklist

- [ ] Meta tags on all pages
- [ ] Open Graph tags for social sharing
- [ ] Twitter Card optimization
- [ ] Structured data implementation
- [ ] Sitemap generation
- [ ] Robots.txt configuration
- [ ] Canonical URLs
- [ ] Image optimization
- [ ] Internal linking strategy
- [ ] Local SEO optimization
- [ ] Performance optimization
- [ ] Mobile optimization
- [ ] Accessibility compliance
- [ ] Security implementation
- [ ] Analytics setup
- [ ] Search Console verification

## Resources

- [Google Search Console](https://search.google.com/search-console)
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [Schema.org](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
