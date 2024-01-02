import type { Metadata } from 'next'
import  GlobalState from '@/context'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ecommerce application',
  description: 'learning project ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalState >
          <Navbar/>
          <main className='text-black flex min-h-screen flex-col mt-[80px] bg-white'>{children}</main>
        </GlobalState>
      </body>
    </html>
  )
}
