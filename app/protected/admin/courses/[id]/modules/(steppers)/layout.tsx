"use client";
import Stepper from "@/components/course/[id]/modules/Stepper";
import { useSearchParams, usePathname } from "next/navigation";

const Body = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const step = + (searchParams.get("step") || 0);

  return (
    <>
      <div className="card mb-0">
        <div
          className="table-responsive mb-1"
          data-toggle="lists"
          data-lists-sort-by="js-lists-values-employee-name"
          data-lists-values='["js-lists-values-employee-name", "js-lists-values-employer-name", "js-lists-values-projects", "js-lists-values-activity", "js-lists-values-earnings"]'
        >
          <Stepper step={step} currentPath={pathname} />
        </div>
      </div>

      {children}
    </>
  );
};

export default Body;
