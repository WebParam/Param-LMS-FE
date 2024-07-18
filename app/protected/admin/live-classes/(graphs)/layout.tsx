"use client";
import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

function Layout({ children, params }: { children: React.ReactNode; params: {id : string} }) {

  return (
    <>
      {children}
    </>
  );
}

export default Layout;
