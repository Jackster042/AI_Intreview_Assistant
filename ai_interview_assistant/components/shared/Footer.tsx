"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <section className="flex flex-col items-center justify-center mt-8 gap-4">
      <hr className="w-full border-t border-gray-700" />
      <Link
        href="/"
        className="flex items-center gap-2"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <Image src="/logo.svg" alt="logo" width={38} height={32} />
        <h1 className="text-primary-100">Ask Guru</h1>
      </Link>

      <p className="text-sm text-gray-500 pb-4">
        &copy; {new Date().getFullYear()} Ask Guru. All rights reserved.
      </p>
      <hr className="w-full border-t border-gray-700" />
    </section>
  );
};

export default Footer;
