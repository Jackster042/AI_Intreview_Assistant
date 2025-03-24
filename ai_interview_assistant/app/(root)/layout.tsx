import React from "react";
import Link from "next/link";
import { Toaster } from "sonner";
import Image from "next/image";
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="root-layout">
      <nav>
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="logo" width={38} height={32} />
          <h1 className="text-primary-100">Ask Guru</h1>
        </Link>
      </nav>
      {children}
      <Toaster />
    </div>
  );
};

export default RootLayout;
