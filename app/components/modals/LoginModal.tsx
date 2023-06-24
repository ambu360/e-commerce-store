"use client";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { SubmitHandler, FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const LoginModal = () => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success("Logged In");
        router.refresh();
        loginModal.onClose();
      }
      if (callback?.error) {
        toast.error(callback.error);
        console.log(callback.error)
      }
    });
  };

  const bodyContent = (
    <div className="flex flex-col gap-2">
      <Heading title="Welcome to the store" subTitle="Login to your account" />
      <Input
        id="email"
        label="email"
        disabled={isLoading}
        errors={errors}
        register={register}
      />
      <Input
        id="password"
        type="password"
        label="password"
        disabled={isLoading}
        errors={errors}
        register={register}
      />
    </div>
  );

  const footercontent = (
    <div className="flex flex-col mt-3 gap-3">
      <hr />
      <Button
        label="Sign in using google"
        outline
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
     
      <div
        className="
        text-neutral-500
        text-center
        mt-4
        font-light
      "
      >
        <div
          className="
          flex
          justify-center
          flex-row
          items-center
          gap-2
        "
        >
          <div>Need an account?</div>
          <div
            onClick={registerModal.onClose}
            className=" text-neutral-800 cursor-pointer hover:underline"
          >
            Register
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      body={bodyContent}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel="Countinue"
      footer={footercontent}
    />
  );
};

export default LoginModal;
