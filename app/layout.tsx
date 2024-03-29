
import Modal from './components/modals/Modal'
import Navbar from './components/navbar/Navbar'
import './globals.css'
import { DM_Sans,Poppins } from 'next/font/google'
import ToasterProvider from './providers/ToasterProvider'
import RegistrationModal from './components/modals/RegistrationModal'
import getCurrentUser from './actions/getCurrentUser'
import getAllCategories from './actions/getCategories'
import LoginModal from './components/modals/LoginModal'
import SellModal from './components/modals/SellModal'
import CartModal from './components/modals/CartModal'
import getCart from './actions/getCart'


const dm_sans = DM_Sans({weight: ['400', '500', '700'], subsets: ['latin']} )
const poppins = Poppins({weight: ["400" , "500" , "700" , "100" , "200" , "300" , "600" , "800", "900" ],subsets: ['latin']})

export const metadata = {
  title: 'Store',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser =await getCurrentUser();
  const categories_prisma = await getAllCategories();
  const cart = await getCart()
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ToasterProvider/>
        <LoginModal/>
        <RegistrationModal/>
        <SellModal categories_prisma = {categories_prisma}/>
        <CartModal currentUser = {currentUser} cart = {cart}/>
        <Navbar currentUser = {currentUser}/>   
      <div className='pb-28 pt-28'>

        {children}
      </div>
      </body>
    </html>
  )
}
