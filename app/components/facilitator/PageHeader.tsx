"use client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function PageHeader({
  title,
}: {
  title: string;
 
}) {
  return (
    <>
      <div className="border-bottom-2 py-32pt position-relative z-1">
        <div className="container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left">
          <div className="flex d-flex justify-content-between flex-column flex-sm-row align-items-center mb-24pt mb-md-0">
            <div className="mb-24pt mb-sm-0 mr-sm-24pt">
              <h2 className="mb-0">Facilitator Dashboard</h2>

              <ol className="breadcrumb p-0 m-0">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>

                <li className="breadcrumb-item active">Facilitator Dashboard</li>
              </ol>

              <h5 className="mt-2">Facilitator : MS K Ngubani</h5>
            </div>
          </div>
                 </div>
      </div>
    </>
  );
}