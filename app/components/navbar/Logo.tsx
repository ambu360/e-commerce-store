import Image from 'next/image'

const Logo = () =>{

    return (
        <Image
            alt='logo'
            className='hidden md:block cursor-pointer'
            height='50'
            width='50'
            src='/images/storefront1.png'
        />
    )
}

export default Logo;