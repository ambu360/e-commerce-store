
interface ContainerProps {
    children: React.ReactNode;
    border?:string
}
const Container: React.FC<ContainerProps> = ({ children,border }) => {

    return (
        <div className={`
            mx-auto
            max-w-[2520px]
            xl:px-20
            md:px-10
            sm:px-2
            px-4
            ${border?border:'border-none'}
             `}>
            {children}
        </div>
    )
}

export default Container;