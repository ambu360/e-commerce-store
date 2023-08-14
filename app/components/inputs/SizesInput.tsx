"use client";

import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import CounterInput from "./CounterInput";

interface SizeInputProps {
  label: string;
  subTitle: string;
  sizeOptions: {
    size: string;
    isSelected: boolean;
  }[];
  setSizeOption: Dispatch<
    SetStateAction<
      {
        size: string;
        isSelected: boolean;
      }[]
    >
  >;
  setCustomValue: (id: string, value: any) => void;
  required?: boolean;
  sizes: {
    name: string;
    inventory: number;
  }[];
}

export interface sizeType {
  name: string;
  inventory: number;
}

const SizezInput: React.FC<SizeInputProps> = ({
  label,
  subTitle,
  sizeOptions,
  required,
  sizes,
  setSizeOption,
  setCustomValue,
}) => {
  const [sizeInfo, setSizeInfo] = useState<sizeType[]>([]);

  useEffect(()=>{
    setCustomValue('sizes',sizeInfo)
    let quantity = 0
    sizeInfo.forEach((item) => (
      quantity += item.inventory
    ))
    setCustomValue('quantity',quantity)
  },[sizeInfo])
  const onSelected = useCallback(
    (value: { size: string; isSelected: boolean }) => {
      const alreadyExists = sizeInfo.find((size) => size.name == value.size);

      if (!alreadyExists) {
        setSizeInfo([...sizeInfo, { name: value.size, inventory: 0 }]);
        setSizeOption(
          sizeOptions.map((option) =>
            option.size !== value.size
              ? { ...option }
              : { size: option.size, isSelected: true }
          )
        );
        
      } else {
        setSizeInfo(sizeInfo.filter((size) => size.name != value.size));
        setSizeOption(
          sizeOptions.map((option) =>
            option.size !== value.size
              ? { ...option }
              : { size: option.size, isSelected: false }
          )
        );
      }
   
    },
    [sizeInfo,sizeOptions,sizes]
  );

  return (
    <div className="flex flex-col gap-3 justify-start">
    <div>
        <span className="font-semibold lext-lg">{label}</span>
      {required && (
        <span className="text-lg text-rose-600">
          *
        </span>
      )}
      </div>
      <span className="font-light text-neutral-500">{subTitle}</span>
      <div className="flex flex-row gap-6 items-center ">
        {sizeOptions.map((size) => (
          <div
            onClick={() => onSelected(size)}
            key={size.size}
            className={`
            p-2 
            border-[1px] 
            rounded-lg 
            hover:cursor-pointer
          hover:bg-amber-200
          hover:border-amber-400
            ${size.isSelected?
              'bg-amber-100':'bg-white'}
          `}

          >
            <span className="p-1 text-md font-light text-neutral-600">
              {size.size}
            </span>
          </div>
        ))}
      </div>
      {sizeInfo.length >= 1 &&
        sizeInfo.map((size) => (
          <div key={size.name}>
            <CounterInput size={size} setSizeInfo={setSizeInfo} sizeInfo={sizeInfo} />
          </div>
        ))}
    </div>
  );
};

export default SizezInput;
