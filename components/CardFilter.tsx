"use client";

import React, { ComponentProps, useState, useRef, useEffect } from "react";
import DropdownButton from "./ui/Dropdown-Button";
import clsx from "clsx";

type CardFilterProps = {
  vals: string[];
  setVals: React.Dispatch<React.SetStateAction<string[]>>;
  options: string[];
};

export default function CardFilter({
  vals,
  setVals,
  options,
}: CardFilterProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (val: string) => {
    if (vals.includes(val)) {
      setVals(vals.filter((v) => v !== val));
    } else {
      setVals([...vals, val]);
    }
  };

  const clearFilter = () => {
    setVals([]);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div className=" w-full relative" ref={menuRef}>
      <div
        className="bg-white rounded-md w-full h-fit p-4 flex flex-row gap-3 mb-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="h-fit flex-1 outline-none flex gap-2">
          {vals &&
            vals.map((val, index) => (
              <DropdownButton
                key={index}
                onClick={() => {
                  handleChange(val);
                }}
              >
                {val}
              </DropdownButton>
            ))}
        </div>
        <button
          className=" text-dark-grayish-cyan"
          onClick={(e) => {
            clearFilter();
            e.stopPropagation();
          }}
        >
          Clear
        </button>
      </div>
      <div
        className={clsx(
          "dropdown-menu absolute z-20 bg-white w-full flex flex-col shadow-md max-h-40 overflow-scroll",
          isOpen ? "visible" : "hidden"
        )}
      >
        {options &&
          options.map((option, index) => (
            <DropdownItem
              key={index}
              vals={vals}
              val={option}
              onClick={() => {
                handleChange(option);
              }}
            >
              {option}
            </DropdownItem>
          ))}
      </div>
    </div>
  );
}

type DropdownItemProps = ComponentProps<"button"> & {
  vals: string[];
  val: string;
};

const DropdownItem = ({ val, vals, ...props }: DropdownItemProps) => {
  return (
    <button className="p-2" {...props}>
      <p
        className={clsx(
          "relative hover:text-desaturate-dark-cyan duration-200",
          vals.includes(val)
            ? "before:content-['V'] before:relative before:right-5"
            : ""
        )}
      >
        {props.children}
      </p>
    </button>
  );
};
