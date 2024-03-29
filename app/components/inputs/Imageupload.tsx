'use client'
import { CldUploadWidget } from "next-cloudinary";
import { useCallback, useState } from "react";
import {TbPhotoPlus} from 'react-icons/tb'
import Image from "next/image";


declare global {
    var cloudinary:any;
}

interface ImageUploadProps{
    onChange:(value:string) => void;
    value:string
}
const ImageUpload:React.FC<ImageUploadProps> = ({
    value,
    onChange
}) =>{

    const [imageDimension,setImageDimension] = useState({width:0,height:0})
    const handleUpload = useCallback((result:any)=>{
        onChange(result.info.secure_url)
        setImageDimension({width:result.info.width,height:result.info.height})
    },[onChange])
    return (
        <div>
            <CldUploadWidget
                onUpload={handleUpload}
                uploadPreset="z4rehzqh"
                options={{maxFiles:4}}
            >
            {({open})=>{
                return (

            <div onClick={()=>open?.()}
                className="
                    relative
                    cursour-pointer
                    hover:opacity-70
                    transition
                    border-dashed
                    border-2
                    p-20
                    border-neutral-300
                    flex
                    flex-col
                    items-center
                    justify-center
                    gap-4
                    text-neutral-600
                "
            >
                <TbPhotoPlus size={50}/>
                <div className="font-semibold text-lg">
                    Click to upload
                </div>
                {value && <div className="absolute inset-0 w-full h-full">
                        <Image 
                            alt="Upload"
                            width={imageDimension.width}
                            height={imageDimension.height}
                            style={{objectFit:'contain'}}
                            src={value}
                        />
                    </div>}
            </div>
                )
            }}
            </CldUploadWidget>
        </div>
    )
}


export default ImageUpload;