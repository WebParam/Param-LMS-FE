"use client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function PageHeader({
  title,
}: {
  title: string;
 
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const home_title = searchParams.get("homeTitle");
  const buttonTitle = searchParams.get("button-title");
  const pathName = usePathname();
  const isDashboard = pathName.includes("/protected/admin/facilitator")  && true;
  return (
    <>
      <div className="border-bottom-2 py-32pt position-relative z-1">
        <div className="container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left">
          <div className="flex d-flex justify-content-between flex-column flex-sm-row align-items-center mb-24pt mb-md-0">
            <div className="mb-24pt mb-sm-0 mr-sm-24pt">
              <h2 className="mb-0">{title}</h2>

              <ol className="breadcrumb p-0 m-0">
                <li className="breadcrumb-item">
                  <a href="#">{home_title}</a>
                </li>

                <li className="breadcrumb-item active">{title}</li>
              </ol>

              <h5 className="mt-2">Facilitator : MS K Ngubani</h5>
            </div>
          </div>
          {!isDashboard && (
            <button onClick={() => router.back()} className="btn btn-success">
              {buttonTitle}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
