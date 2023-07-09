import React, { Dispatch, SetStateAction, useState } from "react";
import Button from "../Button";

interface TagsInputProps {
  id: string;
  label: string;
  required?: boolean;
  setCustomValue: (id: string, value: any) => void;
  tags: string[];
}

const TagsInput: React.FC<TagsInputProps> = ({
  id,
  label,
  required,
  setCustomValue,
  tags
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const removeTag=(tag:string) =>{
    const updatedTags = tags.filter((item) => item !== tag)
    setCustomValue(id,updatedTags)
  }
  const handleAddTag = () => {
    if (inputValue.trim() !== "") {
      const updatedTags = [...tags, inputValue.trim()];
      if(updatedTags[0] ===''){
        updatedTags.shift()
      }
      setCustomValue(id, updatedTags);
      setInputValue("");
    }
  };

  return (
    <div>
      <label htmlFor={id} className="
      block 
      text-sm 
      font-medium 
      text-gray-700">
        {label}
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          id={id}
          value={inputValue}
          onChange={handleInputChange} 
          className="
          mt-1 
          p-2 
          border 
          border-gray-300 
          rounded-md 
          focus:outline-none 
          focus:ring-2 focus:ring-blue-500"
        />
        <Button outline label="Add" onClick={handleAddTag} />
      </div>
      {tags.length > 0 && (
        <div className="mt-2">
          {tags.map((tag) => (
            <span
              key={tag}
              onClick={()=>removeTag(tag)}
              className="inline-block bg-amber-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagsInput;
