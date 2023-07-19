'use client';
import Image from 'next/image'
import { useRouter } from 'next/navigation';

const Logo = () =>{
    const router = useRouter();
    return (
        <Image
        onClick = {()=> router.push('/')}
            alt='logo'
            className='hidden md:block cursor-pointer rounded-full shadow-sm hover:scale-105 hover:shadow-md'
            height='50'
            width='50'
            src='/images/storefront1.png'
        />
    )
}

export default Logo;