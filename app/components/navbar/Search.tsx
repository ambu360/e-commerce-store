"use client";
import { MouseEvent, useCallback, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const params = useSearchParams();
  const router = useRouter();

  const handleSearch = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      if (searchTerm.length !== 0) {
        const updatedQuery: any = {
          search: searchTerm,
        };

        const url = qs.stringifyUrl(
          {
            url: "/",
            query: updatedQuery,
          },
          { skipNull: true }
        );
        router.push(url);
      }
    },
    [searchTerm, router]
  );

  return (
    <div className="h-full w-full md:w-2/5 lg:w-2/6">
      <div
        className="
        bg-[#fcf9f3]
        opacity-100
        w-full
        py-3 
        px-4
        rounded-full
        shadow-sm
        hover:shadow-lg
        transition
        cursour-pointer"
      >
        <div
          className="flex
          
        flex-row
        items-center
        gap-2
        justify-center
        px-2
        "
        >
          <div className="w-full flex items-center">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="
            rounded-full 
            w-full 
            h-9 
            border-[2px] 
            bg-slate-50
            px-4 
            py-3 
            border-neutral-200 
            outline-0  
            focus:border-amber-400
            placeholder-gray-100
            placeholder:text-center
            "
              placeholder="Search..."
            />
          </div>
          <div className="py-2 flex items-center group rounded-xl ">
            <HiOutlineSearch
              onClick={(e) => handleSearch(e)}
              size={24}
              className="group-hover:scale-105 transition hover:cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
