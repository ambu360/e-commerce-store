"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoryProps {
  label: string;
  icon: IconType;
  description: string;
  isSelected?: boolean;
}

const CategoryBox: React.FC<CategoryProps> = ({
  label,
  icon: Icon,
  description,
  isSelected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };
    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, params, router]);
  return (
    <div
      onClick={handleClick}
      className={`
                flex
                flex-col
                items-center
                justify-center
                gap-2
                px-3
                py-2
                mx-2
                my-1
                border-y-2
                transition
                hover:text-neutral-700
                hover:shadow-amber-500
                rounded-xl
                hover:shadow-sm
                cursor-pointer
                ${isSelected ? "text-neutral-900" : "text-neutral-500"}
                ${isSelected ? "border-y-amber-400" : "border-transparent"}
            `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
