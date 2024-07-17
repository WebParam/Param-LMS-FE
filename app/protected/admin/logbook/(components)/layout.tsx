"use client";
import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

function Layout({ children}: { children: React.ReactNode; params: {id : string} }) {


  const path = "assessments" ?? "assignments"

  return (
    <>

      {children}
    </>
  );
}

export default Layout;