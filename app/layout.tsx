
import Modal from './components/modals/Modal'
import Navbar from './components/navbar/Navbar'
import './globals.css'
import { DM_Sans } from 'next/font/google'

const dm_sans = DM_Sans({weight: ['400', '500', '700'], subsets: ['latin']} )

export const metadata = {
  title: 'Store',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={dm_sans.className}>
        <Navbar/>
       
        {children}
      </body>
    </html>
  )
}
