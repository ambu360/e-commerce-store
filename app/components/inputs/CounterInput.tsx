"use client";

import {
  ChangeEvent,
  Dispatch,
  ReactElement,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { sizeType } from "./SizesInput";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
interface CounterInputProps {
  size: sizeType;
  setSizeInfo: Dispatch<SetStateAction<sizeType[]>>;
  sizeInfo: sizeType[];
}

const CounterInput: React.FC<CounterInputProps> = ({
  size,
  setSizeInfo,
  sizeInfo,
}) => {
  const [inputVaue, setInputValue] = useState("");
  const onAdd = useCallback(() => {
    setSizeInfo(
      sizeInfo.map((value) =>
        value.name !== size.name
          ? { ...value }
          : { name: size.name, inventory: value.inventory + 1 }
      )
    );
  }, [sizeInfo]);

  const onReduce = useCallback(() => {
    if (size.inventory > 0) {
      setSizeInfo(
        sizeInfo.map((value) =>
          value.name !== size.name
            ? { ...value }
            : { name: size.name, inventory: value.inventory - 1 }
        )
      );
    }
  }, [sizeInfo]);

  const handleInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation();
      setInputValue((prev) => prev + e.target.value);
    },
    [setInputValue]
  );

  return (
    <div className=" border-[2px] py-4 px-3 rounded-md  flex flex-row items-center justify-between gap-4">
      <div className=" font-light text-lg">{size.name}</div>

      <div className=" flex flex-row  items-center   gap-6">
        <span
          onClick={onReduce}
          className=" text-neutral-400 tex-md hover:text-neutral-900 hover:cursor-pointer"
        >
          <AiOutlineMinus size={28} className="hover:text-neutral-900" />
        </span>
        <div className="flex items-center justify-center  ">
          <input
            id={inputVaue}
            value={size.inventory}
            onChange={(e) => handleInput(e)}
            className="w-[40px]"
          />
        </div>
        <span
          onClick={onAdd}
          className="  text-neutral-400 hover:text-neutral-900 hover:cursor-pointer"
        >
          <AiOutlinePlus size={28} />
        </span>
      </div>
    </div>
  );
};

export default CounterInput;
