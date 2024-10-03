import React, { ComponentProps } from "react";

type DropdownButtonProps = ComponentProps<"div"> & {
  onClick: () => void;
};

export default function DropdownButton({
  onClick,
  ...props
}: DropdownButtonProps) {
  return (
    <div
      className="bg-desaturate-dark-cyan/20 flex w-fit rounded-md"
      {...props}
    >
      <p className="p-2 text-desaturate-dark-cyan font-bold">
        {props.children}
      </p>
      <button
        className="bg-desaturate-dark-cyan p-2 rounded-r-md hover:bg-black hover:text-white duration-200"
        onClick={onClick}
      >
        X
      </button>
    </div>
  );
}
