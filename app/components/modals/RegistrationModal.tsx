'use client';
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import { useState } from "react";
import { SubmitHandler, FieldValues, useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import Heading from "../Heading";
import Input from "../inputs/Input";

const RegistrationModal = () => {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("api/register", data)
      .then(() => {
        registerModal.onClose();
      })
      .catch((erros) => {
        toast.error("something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-2">
      <Heading title="Welcome to the store" subTitle="Create an account" />
      <Input 
        id='email'
        label='email'
        disabled={isLoading}
        errors={errors}
        register={register}
      />
      <Input 
        id='name'
        label='name'
        disabled={isLoading}
        errors={errors}
        register={register}
      />
      <Input 
        id='password'
        type='password'
        label='password'
        disabled={isLoading}
        errors={errors}
        register={register}
      />
    </div>
  );

  return (
  <Modal 
    disabled={isLoading}
    isOpen={registerModal.isOpen}
    title="register"
    body={bodyContent}
    onClose={registerModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    actionLabel="Registration" 
  />)
};

export default RegistrationModal;
