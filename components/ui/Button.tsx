import { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button">;

export default function Button({ ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className=" bg-light-grayish-cyan-background text-desaturate-dark-cyan p-2 hover:text-white hover:bg-desaturate-dark-cyan duration-200 font-bold rounded-md"
    >
      {props.children}
    </button>
  );
}
