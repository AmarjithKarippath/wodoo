import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/next'
import { RegistrationProvider } from '@/components/wodoo/registration-provider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.wodoo.store'

const TITLE = 'Wodoo Store — Start your online store today, sell tomorrow'
const DESCRIPTION =
  'Wodoo Store is the all-in-one commerce platform to design your store, make your products shine, get paid, and sell everywhere your customers scroll.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: '%s · Wodoo Store',
  },
  description: DESCRIPTION,
  applicationName: 'Wodoo Store',
  keywords: [
    'online store builder',
    'ecommerce platform',
    'single product store',
    'cash on delivery store',
    'sell online',
    'launch a store',
    'Wodoo Store',
    'free online calculators',
    'EMI calculator',
    'XIRR calculator',
    'TDEE calculator',
    'retirement calculator',
  ],
  authors: [{ name: 'Wodoo Store' }],
  creator: 'Wodoo Store',
  publisher: 'Wodoo Store',
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  category: 'ecommerce',
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Wodoo Store',
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Wodoo Store — start your online store today',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/logo.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

const ORG_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Wodoo Store',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  sameAs: [] as string[],
}

const WEBSITE_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Wodoo Store',
  url: SITE_URL,
  description: DESCRIPTION,
  publisher: {
    '@type': 'Organization',
    name: 'Wodoo Store',
    url: SITE_URL,
  },
  hasPart: [
    {
      '@type': 'CollectionPage',
      name: 'Free online tools & calculators',
      url: `${SITE_URL}/tools`,
    },
    {
      '@type': 'Blog',
      name: 'Wodoo Store blog',
      url: `${SITE_URL}/blog`,
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} bg-background`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSONLD) }}
        />
      </head>
      <body className="font-sans antialiased">
        <RegistrationProvider>
          {children}
        </RegistrationProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ? (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        ) : null}
      </body>
    </html>
  )
}
