"use client";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import PageHeader from "./PageHeader";

function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const searchParams = useSearchParams();
  const name = searchParams.get("title");

  const pathname = usePathname();

  return (
    <>
      <PageHeader />
      <div className="container page__container page__container page-section">
        <div className="card p-relative o-hidden mb-0">
          <div
            className="card-header card-header-tabs-basic nav px-0"
            role="tablist"
          >
          
          </div>
        </div>
        {children}
      </div>
    </>
  );
}

export default Layout;
