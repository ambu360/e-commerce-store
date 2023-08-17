"use client";
import { IconType } from "react-icons/lib";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}
const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
                relative
                disabled:opacity-70
                disabled:cursor-not-allowed
                rounded-lg
                hover:opacity-80
                transition
                group
                w-full
                ${outline ? "bg-white" : "bg-rose-500"}
                ${outline ? "border-black" : "border-rose-500"}
                ${outline ? "text-black" : "text-white"}
                ${
                  small
                    ? "py-1 text-sm font-light border-[1px]"
                    : "py-3 text-md font-semibold border-2"
                }
            `}
    >
      <span
        className="
      flex 
      items-center 
      justify-center 
      group-hover:scale-110 
      transition 
      duration-150"
      >
        {Icon ? (
          <Icon size={22} className="absolute  " />
        ) : (
          <span className="">{label}</span>
        )}
      </span>
    </button>
  );
};

export default Button;
