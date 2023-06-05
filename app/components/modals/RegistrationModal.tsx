import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import { useState } from "react";

const RegistrationModal = () =>{
    const registerModal = useRegisterModal()
    const [isLoading,setIsLoading] = useState(false)
    return (
        <Modal 
            actionLabel='Registration'
        />
    )
}

export default RegistrationModal;