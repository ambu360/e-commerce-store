'use client';
import Image from'next/image'
const Avatar = () =>{
    return (
        <Image
            className='rounded-full'
            alt='Avatar'
            src='/images/placeholder.jpg'
            width='30'
            height='30'
        >

        </Image>
    )
}

export default Avatar;