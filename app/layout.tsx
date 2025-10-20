import './globals.css'
import { Vazirmatn } from 'next/font/google'
import { ReactNode } from 'react'
import { ThemeProvider } from '@/components/theme-provider'
import type { Metadata } from 'next'

const fontSans = Vazirmatn({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['100', '300', '400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'دیوار | خرید و فروش با دیوار',
  description: 'ثبت رایگان آگهی خرید و فروش با دیوار - نیازمندی‌های رایگان، آگهی رایگان، بدون واسطه با دیوار',
  manifest: '/manifest.json',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'fa_IR',
    url: 'https://divar.ir',
    siteName: 'دیوار',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'دیوار | خرید و فروش با دیوار',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className={`${fontSans.variable} min-h-screen bg-background font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <div className="flex-1">
              <div className="container px-4 py-6 md:px-6 md:py-8">
                {children}
              </div>
            </div>
          </div>
        </ThemeProvider>
        <script src="/sw-register.js" />
      </body>
    </html>
  )
}