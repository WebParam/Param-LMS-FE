"use client";
import { useSearchParams } from "next/navigation";
import PageHeader from "@/app/components/PageHeaders/assessments/PageHeader";

function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { assessmentId: string };
}) {
  const searchParams = useSearchParams();
  const title = searchParams.get("title")!;

  return (
    <>
      <div className="mdk-header-layout__content page-content ">
        <div className="mdk-header-layout__content page-content ">
          <PageHeader />

          <div className="container page__container page__container page-section">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
