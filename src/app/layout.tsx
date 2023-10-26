import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast';
import ToasterLayout from './component/ToasterLayout';
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NextAuth App',
  description: 'An app for learning authentication in next js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* <Toaster/> */}
      {/* <ToasterLayout></ToasterLayout> */}
      <body className={inter.className}>{children}</body>
    </html>
  )
}
