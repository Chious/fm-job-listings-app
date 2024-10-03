import React from "react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full fixed top-0 -z-10 bg-desaturate-dark-cyan">
      <Image
        src="/assets/bg-header-desktop.svg"
        alt="logo"
        width={100}
        height={100}
        className="w-full"
      />
    </header>
  );
}
