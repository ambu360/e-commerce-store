"use client";

import useSellModal from "@/app/hooks/useSellModal";
import Modal from "./Modal";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import Input from "../inputs/Input";
import TextArea from "../inputs/TextArea";
import Counter from "../Counter";
import ImageUpload from "../inputs/Imageupload";
import axios from "axios";
import { toast } from "react-hot-toast";
import getAllCategories from "@/app/actions/getCategories";
import TagsInput from "../inputs/TagsInput";
import SizesInput from "../inputs/SizesInput";

interface SellModalProps {
  categories_prisma?: {
    id: string;
    name: string;
  }[];
}
const SellModal: React.FC<SellModalProps> = ({ categories_prisma }) => {
  enum STEPS {
    CATEGORY = 0,
    INFO_1 = 1,
    INFO_2 = 2,
    IMAGES = 3,

    PRICE = 4,
  }

  const router = useRouter();

  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    control,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      title: "",
      brand: "",
      description: "",
      quantity: 1,
      imageSrc: "",
      price: "",
      tags: [""],
      sizes: [{ name: "", inventory: 0 }],
    },
  });

  const [isLoading, setIsloading] = useState(false);
  const [sizeOptions, setSizeOption] = useState([
    {
      size: "small",
      isSelected: false,
    },
    {
      size: "medium",
      isSelected: false,
    },
    {
      size: "large",
      isSelected: false,
    },
    {
      size: "xLarge",
      isSelected: false,
    },
  ]);

  //watch for current step
  const category = watch("category");
  const quantity = watch("quantity");
  const imageSrc = watch("imageSrc");
  const tags = watch("tags");
  const sizes = watch("sizes");

  const sellModal = useSellModal();

  //set the custom value for the field
  const setCustomvalue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  //set functionality for back button
  const onBack = () => {
    setStep((value) => value - 1);
  };

  //set functionality for next button
  const onNext = () => {
    setStep((value) => value + 1);
  };

  //handle form submit
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    setIsloading(true);
    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listing created");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        sellModal.onClose();
      })
      .catch(() => {
        toast.error("something went wrong");
      })
      .finally(() => {
        setIsloading(false);
        setSizeOption([
          {
            size: "small",
            isSelected: false,
          },
          {
            size: "medium",
            isSelected: false,
          },
          {
            size: "large",
            isSelected: false,
          },
          {
            size: "xLarge",
            isSelected: false,
          },
        ]);
      });
  };

  //handle action
  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "NEXT";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "back";
  }, [step]);

  //make dynamic body content than can be changed based on current STEP
  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your item"
        subTitle="Pick a category"
      />
      <div
        className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-3
                max-h-[50vh]
                overflow-y-auto
            "
      >
        {categories.map((item) => {
          const category_prisma = categories_prisma?.find(
            (category) => item.label === category.name
          );

          return (
            <CategoryInput
              key={category_prisma?.id}
              label={item.label}
              selected={category === category_prisma?.id}
              id={category_prisma?.id}
              icon={item.icon}
              onClick={(category) => setCustomvalue("category", category)}
            />
          );
        })}
      </div>
    </div>
  );

  //step for getting ifno-name,description,quanity
  if (step === STEPS.INFO_1) {
    bodyContent = (
      <div>
        <Heading
          title="share some information about your product"
          subTitle="give us them deets!!"
        />
        <div className=" flex flex-col gap-8 mt-2">
          <Input
            id="title"
            label="Name of  the product"
            register={register}
            errors={errors}
            required
          />
          <hr />
          <Input
            id="brand"
            label="Brand of  the product"
            register={register}
            errors={errors}
            required
          />
          <hr />

          <TextArea
            id="description"
            label="Description of item"
            register={register}
            errors={errors}
            required
          />
        </div>
      </div>
    );
  }

  if (step == STEPS.INFO_2) {
    bodyContent = (
      <div className=" flex flex-col gap-8">
        <Heading
          title="Informarion"
          subTitle="Tell us more about your product"
        />
        <hr />
        <TagsInput
          id="tags"
          label="enter your tags"
          setCustomValue={setCustomvalue}
          required
          tags={tags}
        />

        <hr />
        {/*Refactor counter to sum inventory
        <hr />
           <Counter
            label="Quantity"
            subtitle="How many do you have in your Inventory"
            value={quantity}
            onChange={(value) => setCustomvalue("quantity", value)}
          /> 
    <hr />*/}
        <SizesInput
          label="Sizes"
          subTitle="What sizes do you offer and what are there inventory amounts"
          sizeOptions={sizeOptions}
          setSizeOption={setSizeOption}
          setCustomValue={setCustomvalue}
          required
          sizes={sizes}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Image upload" subTitle="upload your product images" />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomvalue("imageSrc", value)}
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Pricing" subTitle="How much are you going to charge?" />
        <Input
          id="price"
          label="price"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <div>
      <Modal
        isOpen={sellModal.isOpen}
        onClose={sellModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        body={bodyContent}
      />
    </div>
  );
};

export default SellModal;
