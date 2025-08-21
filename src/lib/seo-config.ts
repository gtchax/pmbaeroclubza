export const SEO_CONFIG = {
  // Base configuration
  baseUrl: "https://www.pmbaeroclub.co.za",
  siteName: "PMB Aero Club",
  siteDescription:
    "Premier flight training school in Pietermaritzburg, South Africa. Offering private pilot license, commercial pilot training, aircraft rental, and aviation services.",

  // Default metadata
  defaultTitle:
    "PMB Aero Club - Flight Training & Aviation Services | Pietermaritzburg",
  defaultDescription:
    "Premier flight training school in Pietermaritzburg, South Africa. Offering private pilot license, commercial pilot training, aircraft rental, and comprehensive ground school.",

  // Contact information
  contact: {
    phone: "+27-33-123-4567",
    email: "info@pmbaeroclub.co.za",
    address: {
      street: "Pietermaritzburg Airport",
      city: "Pietermaritzburg",
      province: "KwaZulu-Natal",
      postalCode: "3201",
      country: "South Africa",
    },
    coordinates: {
      latitude: -29.6,
      longitude: 30.3796,
    },
  },

  // Social media
  social: {
    facebook: "https://www.facebook.com/pmbaeroclub",
    instagram: "https://www.instagram.com/pmbaeroclub",
    linkedin: "https://www.linkedin.com/company/pmb-aero-club",
    twitter: "@pmbaeroclub",
    youtube: "https://www.youtube.com/@pmbaeroclub",
  },

  // Keywords by category
  keywords: {
    primary: [
      "flight training",
      "pilot license",
      "aviation school",
      "flight school",
      "pilot training",
    ],
    location: [
      "Pietermaritzburg",
      "South Africa",
      "KwaZulu-Natal",
      "PMB",
      "Durban",
    ],
    services: [
      "private pilot license",
      "commercial pilot license",
      "flight instructor rating",
      "aircraft rental",
      "ground school",
      "aviation training",
    ],
    aircraft: [
      "Cessna 152",
      "Cessna 172",
      "Piper PA-28",
      "training aircraft",
      "light aircraft",
    ],
    certifications: [
      "CAA approved",
      "flight training organization",
      "aviation authority",
      "pilot certification",
    ],
  },

  // Page-specific SEO data
  pages: {
    home: {
      title: "PMB Aero Club - Premier Flight Training in Pietermaritzburg",
      description:
        "Professional flight training school offering private and commercial pilot licenses. Modern aircraft fleet, experienced instructors, and comprehensive aviation education in Pietermaritzburg, South Africa.",
      keywords: [
        "flight training",
        "pilot license",
        "aviation school",
        "Pietermaritzburg",
      ],
      canonical: "/",
    },
    flightSchool: {
      title:
        "Flight School - Private & Commercial Pilot Training | PMB Aero Club",
      description:
        "Professional flight training programs including Private Pilot License, Commercial Pilot License, and Flight Instructor Rating. Modern aircraft fleet and experienced instructors in Pietermaritzburg.",
      keywords: [
        "private pilot license",
        "commercial pilot training",
        "flight instructor",
        "flight school",
      ],
      canonical: "/flight-school",
    },
    pilotResources: {
      title:
        "Student Pilot Resources - Training Materials & Guides | PMB Aero Club",
      description:
        "Comprehensive student pilot resources including training materials, study guides, safety information, and regulatory updates for aspiring pilots in South Africa.",
      keywords: [
        "student pilot resources",
        "pilot training materials",
        "aviation study guides",
        "flight safety",
      ],
      canonical: "/pilot-resources",
    },
    visitingAircraft: {
      title:
        "Visiting Aircraft - Information for Visiting Pilots | PMB Aero Club",
      description:
        "Essential information for visiting pilots including airport procedures, facilities, fuel availability, and local attractions in Pietermaritzburg, South Africa.",
      keywords: [
        "visiting aircraft",
        "pietermaritzburg airport",
        "pilot information",
        "airport procedures",
      ],
      canonical: "/visiting-aircraft",
    },
    about: {
      title: "About PMB Aero Club - Our History & Mission | Pietermaritzburg",
      description:
        "Learn about PMB Aero Club's rich history, mission, and commitment to aviation excellence. Serving Pietermaritzburg and South Africa since 1990.",
      keywords: [
        "about PMB Aero Club",
        "aviation history",
        "flight training mission",
        "Pietermaritzburg",
      ],
      canonical: "/about",
    },
    contact: {
      title: "Contact PMB Aero Club - Get in Touch | Pietermaritzburg",
      description:
        "Contact PMB Aero Club for flight training inquiries, aircraft rental, or general aviation questions. Located at Pietermaritzburg Airport, South Africa.",
      keywords: [
        "contact PMB Aero Club",
        "flight training inquiry",
        "aircraft rental",
        "aviation contact",
      ],
      canonical: "/contact",
    },
    register: {
      title:
        "Register for Flight Training - Start Your Aviation Journey | PMB Aero Club",
      description:
        "Begin your aviation journey with PMB Aero Club. Register for private or commercial pilot training programs in Pietermaritzburg, South Africa.",
      keywords: [
        "flight training registration",
        "pilot course enrollment",
        "aviation school registration",
        "pilot license",
      ],
      canonical: "/register",
    },
  },

  // Structured data templates
  structuredData: {
    organization: {
      "@type": "EducationalOrganization",
      name: "PMB Aero Club",
      alternateName: "Pietermaritzburg Aero Club",
      description:
        "Premier flight training school offering private and commercial pilot licenses in Pietermaritzburg, South Africa.",
      url: "https://www.pmbaeroclub.co.za",
      logo: "https://www.pmbaeroclub.co.za/logo.png",
      image: "https://www.pmbaeroclub.co.za/og-image.jpg",
      telephone: "+27-33-123-4567",
      email: "info@pmbaeroclub.co.za",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Pietermaritzburg Airport",
        addressLocality: "Pietermaritzburg",
        addressRegion: "KwaZulu-Natal",
        postalCode: "3201",
        addressCountry: "ZA",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -29.6,
        longitude: 30.3796,
      },
      openingHours: "Mo-Fr 08:00-17:00, Sa 08:00-12:00",
      foundingDate: "1990",
      areaServed: {
        "@type": "Country",
        name: "South Africa",
      },
    },

    courses: {
      privatePilot: {
        "@type": "Course",
        name: "Private Pilot License",
        description:
          "Learn to fly for personal use and recreation. Comprehensive training program covering all aspects of private aviation.",
        provider: {
          "@type": "Organization",
          name: "PMB Aero Club",
          sameAs: "https://www.pmbaeroclub.co.za",
        },
        coursePrerequisites:
          "Medical certificate, minimum age 17, English proficiency",
        educationalLevel: "Professional",
        inLanguage: "en",
        isAccessibleForFree: false,
        courseMode: "blended",
        timeRequired: "P6M",
        teaches: [
          "Flight navigation",
          "Aircraft control",
          "Safety procedures",
          "Weather interpretation",
          "Emergency procedures",
        ],
      },

      commercialPilot: {
        "@type": "Course",
        name: "Commercial Pilot License",
        description:
          "Professional pilot training for commercial operations. Advanced training for career pilots.",
        provider: {
          "@type": "Organization",
          name: "PMB Aero Club",
          sameAs: "https://www.pmbaeroclub.co.za",
        },
        coursePrerequisites:
          "Private Pilot License, medical certificate, minimum age 18",
        educationalLevel: "Professional",
        inLanguage: "en",
        isAccessibleForFree: false,
        courseMode: "blended",
        timeRequired: "P12M",
        teaches: [
          "Advanced flight operations",
          "Commercial procedures",
          "Multi-engine operations",
          "Instrument flying",
          "Commercial regulations",
        ],
      },

      flightInstructor: {
        "@type": "Course",
        name: "Flight Instructor Rating",
        description:
          "Become a certified flight instructor. Learn to teach others the art of flying.",
        provider: {
          "@type": "Organization",
          name: "PMB Aero Club",
          sameAs: "https://www.pmbaeroclub.co.za",
        },
        coursePrerequisites:
          "Commercial Pilot License, minimum flight hours, medical certificate",
        educationalLevel: "Professional",
        inLanguage: "en",
        isAccessibleForFree: false,
        courseMode: "blended",
        timeRequired: "P3M",
        teaches: [
          "Teaching methodologies",
          "Flight instruction techniques",
          "Student evaluation",
          "Safety management",
          "Educational psychology",
        ],
      },
    },

    services: {
      aircraftRental: {
        "@type": "Service",
        name: "Aircraft Rental",
        description:
          "Professional aircraft rental service for qualified pilots. Well-maintained fleet available for training and personal use.",
        provider: {
          "@type": "Organization",
          name: "PMB Aero Club",
          sameAs: "https://www.pmbaeroclub.co.za",
        },
        areaServed: {
          "@type": "Country",
          name: "South Africa",
        },
        serviceType: "Aircraft Rental",
        offers: {
          "@type": "Offer",
          price: "Contact for pricing",
          priceCurrency: "ZAR",
          availability: "https://schema.org/InStock",
        },
      },

      groundSchool: {
        "@type": "Service",
        name: "Ground School",
        description:
          "Comprehensive ground school training covering aviation theory, regulations, and safety procedures.",
        provider: {
          "@type": "Organization",
          name: "PMB Aero Club",
          sameAs: "https://www.pmbaeroclub.co.za",
        },
        areaServed: {
          "@type": "Country",
          name: "South Africa",
        },
        serviceType: "Educational Service",
        offers: {
          "@type": "Offer",
          price: "Contact for pricing",
          priceCurrency: "ZAR",
          availability: "https://schema.org/InStock",
        },
      },
    },
  },

  // Local SEO configuration
  localSEO: {
    businessName: "PMB Aero Club",
    businessType: "Flight Training School",
    industry: "Aviation & Flight Training",
    serviceArea: "Pietermaritzburg, KwaZulu-Natal, South Africa",
    localKeywords: [
      "flight training Pietermaritzburg",
      "pilot school South Africa",
      "aviation training KwaZulu-Natal",
      "flight instructor Pietermaritzburg",
      "pilot license Pietermaritzburg",
      "aviation school South Africa",
    ],
  },

  // Performance optimization
  performance: {
    imageOptimization: {
      ogImage: {
        width: 1200,
        height: 630,
        format: "jpg",
      },
      twitterImage: {
        width: 1200,
        height: 600,
        format: "jpg",
      },
    },
    preconnect: ["https://fonts.googleapis.com", "https://fonts.gstatic.com"],
  },
};

export default SEO_CONFIG;
