import { metaKeywords } from './keywords';
import type { Metadata } from 'next';
import { siteConfig } from './site';
const baseURL = 'https://jazila-bazar.vercel.app/';

export const defaultMetadata = {
  metadataBase: new URL(baseURL),
  title: {
    default: 'Jazila-bazar - Multi-Vendor E-commerce Shop',
    template: '%s | Jazila-bazar',
  },
  description:
    'Welcome to Jazila-Bazaar, your ultimate online shopping destination! We are your one-stop marketplace for a diverse range of products, all conveniently curated from a multitude of trusted sellers.',
  keywords: metaKeywords.join(', '),
  creator: 'SM Tanimur Rahman',
  publisher: 'SM Tanimur Rahman',
  applicationName: 'Jazila-bazar',
  viewport: 'width=device-width, initial-scale=1.0',
  colorScheme: 'light',
  category: 'Islamic E-commerce',
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  authors: [
    {
      name: 'SM Tanimur Rahman',
      url: 'https://smtanimur.vercel.app',
    },
  ],
  themeColor: '#ffffff',
  appLinks: {
    web: {
      url: baseURL,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseURL,
    siteName: 'Jazila-bazar',
    title: 'Jazila-bazar - Islamic E-commerce Shop',
    description:
      'Welcome to Jazila-Bazaar, your ultimate online shopping destination! We are your one-stop marketplace for a diverse range of products, all conveniently curated from a multitude of trusted sellers.',
    images: [
      {
        url: `${baseURL}/images/seo_image.png`,
        width: 800,
        height: 600,
        alt: 'Jazila-bazar - Islamic E-commerce Shop',
      },
    ],
    emails: ['mushfiqurtanim@gmail.com'],
    phoneNumbers: ['+880 1648138404'],
    countryName: 'Bangladesh',
  },
  // icons: {
  //   // TODO: Add icons
  //   icon: {},
  // },
  twitter: {
    creator: '@SMTanimur',
    site: '@Jazila-bazar',
    card: 'summary_large_image',
    title: 'Jazila-bazar - Islamic E-commerce Shop',
    description:
      'Welcome to Jazila-Bazaar, your ultimate online shopping destination! We are your one-stop marketplace for a diverse range of products, all conveniently curated from a multitude of trusted sellers.',
    images: [
      {
        url: `${baseURL}/images/seo_image.png`,
        width: 800,
        height: 600,
        alt: 'Jazila-bazar - Multi-Vendor E-commerce Shop',
      },
    ],
  },
} as Metadata;
