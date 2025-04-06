import React from "react";
import Link from "next/link";
import Image from "next/image";
import { isAuthenticated, getCurrentUser } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();
  const isUserAuthenticated = await isAuthenticated();

  if (!isUserAuthenticated) {
    redirect("/sign-in");
  }

  console.log(user, "user from HEADER PROFILE");

  return (
    <div className="root-layout">
      <nav className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="logo" width={38} height={32} />
          <h1 className="text-primary-100">Ask Guru</h1>
        </Link>

        <Button className="btn-primary">User Profile</Button>
      </nav>
      {children}
      <Footer />
    </div>
  );
};

export default RootLayout;
