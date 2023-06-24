'use client';
import {GiAmpleDress, GiConverseShoe, GiMonclerJacket, GiShorts, GiTShirt, GiTopHat, GiTrousers} from 'react-icons/gi'
import Container from "../Container";
import {MdSportsVolleyball} from 'react-icons/md';
import CategoryBox from '../CategoryBox';
import { usePathname, useSearchParams } from 'next/navigation';

export const categories = [
    {
        label:'T-shirt',
        icon:GiTShirt,
        description:'Tshirt'
    },
    {
        label:'Trousers',
        icon:GiTrousers,
        description:'Trousers'
    },
    {
        label:'Shorts',
        icon:GiShorts,
        description:'shorts'
    },
    {
        label:'Jackets',
        icon:GiMonclerJacket,
        description:'Jackets'
    },
    {
        label:'Shoes',
        icon:GiConverseShoe,
        description:'shoes'
    },
    {
        label:'Hats',
        icon:GiTopHat,
        description:'hats'
    },
    {
        label:'Sportswear',
        icon:MdSportsVolleyball,
        description:'sportswear'
    },
    {
        label:'Dress',
        icon:GiAmpleDress,
        description:'dress'
    }
]
const Categories = () =>{

    const params = useSearchParams();
    const category = params?.get('category');
    const pathName = usePathname();

    const isMainpage = pathName ==='/';
    if(!isMainpage) return null;
    return (
        <Container border='border-t-2 border-t-amber-400'>
            <div className="
                
                flex
                flex-row
                items-center
                justify-between
                overflow-x-auto
                
               
            ">
                {categories.map((item)=>(
                    <CategoryBox
                        key={item.label}
                        label={item.label}
                        icon={item.icon}
                        isSelected={category === item.label}
                        description = {item.description}
                    />
                ))}
            </div>

        </Container>
    )
}

export default Categories;