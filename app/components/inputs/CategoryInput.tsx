import { IconType } from "react-icons";


interface CategoryInputProps {
    label:string,
    icon:IconType,
    selected:boolean,
    id?:string 
    onClick:(value:string) =>void
}
const CategoryInput:React.FC<CategoryInputProps> = ({
    label,
    icon:Icon,
    selected,
    id,
    onClick
}) =>{

    return (
        <div
            onClick={()=>onClick(id?id:label)}
            className=
                {`rounded-xl
                border-2
                p-4
                flex
                flex-col
                hover:border-amber-300
                transition
                cursor-pointer
                ${selected?"border-amber-500":"border-neutral-200"}
                `}
               
        >
            <Icon size={30}/>
            <div className="font-semibold">{label}</div>
        </div>
    )
}


export default CategoryInput;