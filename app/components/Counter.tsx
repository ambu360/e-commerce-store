'use client'

import { useCallback, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
    label:string;
    subtitle:string;
    value:number;
    onChange:(value:number)=>void
}

const Counter:React.FC<CounterProps> = ({
    label,
    subtitle,
    value,
    onChange
}) =>{

    const [customvalue,setCustomvalue] = useState(value)

    const onAdd = useCallback(()=>{
        setCustomvalue(Number(customvalue) + 1)
        onChange(customvalue)
    },[onChange,value])

    const onReduce = useCallback(()=>{
        if( customvalue<=1){
            return 
        }
        setCustomvalue(Number(customvalue)-1)
        onChange(customvalue)
    },[onChange,value])


    const handleInputChange = useCallback((e:any)=>{
        setCustomvalue( e.target.value )
        onChange(customvalue)
    },[])
    return (
        <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col">
                <div className="font-medoum">{label}</div>
                <div className="font-light text-gray-600">{subtitle}</div>
            </div>
            <div className="flex flex-rpw items-center gap-4">
                <div
                    onClick={onReduce}
                    className="
                        w-10
                        h-10
                        rounded-full
                        border-[1px]
                        border-neutral-600
                        flex
                        items-center
                        justify-center
                        text-neutral-600
                        cursor-pointer
                        hover:opacity:60
                        transition
                    "
                >
                    <AiOutlineMinus size={18}/>
                </div>
                <div className="font-light text-xl text-neutral-600 flex  justify-around">
                    <input
                    onChange={(e)=>handleInputChange(e)}
                        value={customvalue}
                       className="w-14 pl-1 text-center"
                    />
                </div>
                <div
                    onClick={onAdd}
                    className="
                        w-10
                        h-10
                        rounded-full
                        border-[1px]
                        border-neutral-600
                        flex
                        items-center
                        justify-center
                        text-neutral-600
                        cursor-pointer
                        hover:opacity:60
                        transition
                    "
                >
                    <AiOutlinePlus size={18}/>
                </div>
            </div>
        </div>
    )
}

export default Counter;