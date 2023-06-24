'use client'

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface TextAreaProps {
    id:string;
    label?:string;
    disabled?:boolean;
    required?:boolean;
    type?:string
    register:UseFormRegister<FieldValues>;
    errors:FieldErrors;
}


const TextArea:React.FC<TextAreaProps> = ({
    id,
    label,
    type,
    disabled,
    required,
    register,
    errors
}) =>{

    return (
        <div className="w-full relative">
            <textarea
                id={id}
                disabled={disabled}
                {...register(id,{required})}
                placeholder=" "
                className={`
                    peer
                    w-full
                    p-4
                    pl-4
                    pt-6
                    font-light
                    bg-white
                    border-2
                    rounded-md
                    outline-none
                    transition
                    disabled:opacity-70 
                    disabled:cursor-not-allowed
                    
                    ${errors[id]?'border-rose-500 focus:border-rose-500':'border-neutral-300 focus:border-black-300'}
                `}
            />
            <label className={`
                absolute
                text-md
                duration-150
                transform
                -translate-y-1
                top-5
                z-10
                origin-[0]
                left-4
                peer-placeholder-shown:scale-100
                peer-placeholder-shown:translate-y-0
                peer-focus:scale-75
                peer-focus:-translate-y-4
                ${errors[id]?'text-rose-500':'text-zinc-400'}
            `}>
            {label}
            </label>
        </div>
    )
}

export default TextArea;