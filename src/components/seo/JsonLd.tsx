import React from "react";
import { PLACEHOLDER_ASTROLOGER } from "@/config/placeholderContent";

export interface LocalBusinessJsonLdProps {
  url?: string;
  name?: string;
  telephone?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
}

export function LocalBusinessJsonLd({
  url = "https://aapkaastro.com",
  name = "Aapka Astro — Vedic Astrology, Vastu & Gemstone Wisdom",
  telephone = "+91 98765 43210",
  address = {
    streetAddress: "Kashi Vishwanath Corridor, Dashashwamedh Ghat",
    addressLocality: "Varanasi",
    addressRegion: "Uttar Pradesh",
    postalCode: "221001",
    addressCountry: "IN",
  },
}: LocalBusinessJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name,
    url,
    telephone,
    priceRange: "₹₹",
    image: "https://aapkaastro.com/images/mandala-bg.png",
    address: {
      "@type": "PostalAddress",
      ...address,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 25.3176,
      longitude: 82.9739,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "07:00",
      closes: "23:00",
    },
    sameAs: [
      "https://instagram.com/aapka_astro",
      "https://youtube.com/@aapka_astro",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function PersonJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PLACEHOLDER_ASTROLOGER.displayName,
    jobTitle: "Principal Vedic Astrologer & Vastu Consultant",
    worksFor: {
      "@type": "Organization",
      name: "Aapka Astro",
      url: "https://aapkaastro.com",
    },
    description: PLACEHOLDER_ASTROLOGER.bio,
    image: PLACEHOLDER_ASTROLOGER.avatarUrl,
    url: "https://aapkaastro.com/about",
    knowsAbout: [
      "Vedic Astrology (Parashari & Jaimini)",
      "Vedic Vastu Shastra",
      "Ratna Vigyan (Vedic Gemology)",
      "Panchang Calculation",
      "Muhurat Shastra",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: Array<{ name: string; url: string }>;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
