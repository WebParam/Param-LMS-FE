"use client";
import Link from "next/link";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";

export default function PageHeader({ title }: { title: string }) {
  const router = useRouter();
  const {id} = useParams<{
    id :string
  }>();
  const searchParams = useSearchParams();
  const home_title = searchParams.get("homeTitle");
  const buttonTitle = searchParams.get("button-title") ?? "Go Back";
  const companyName = searchParams.get("company-name");
  const pathName = usePathname();
  const isCompanyStudents = pathName === `/protected/admin/host-companies/companies/${id}`
  return (
    <>
      <div className="border-bottom-2 py-32pt position-relative z-1">
        <div className="container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left">
          <div className="flex d-flex justify-content-between flex-column flex-sm-row align-items-center mb-24pt mb-md-0">
            <div className="mb-24pt mb-sm-0 mr-sm-24pt">
              <h2 className="mb-0">Host Companies { companyName && `- ${companyName}` } </h2>

              <ol className="breadcrumb p-0 m-0">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>

                <li className="breadcrumb-item active">Host Companies</li>

{
  companyName && 
                <li className="breadcrumb-item active">${companyName}</li>
}

              </ol>
            </div>
          </div>
          {isCompanyStudents && (
            <button onClick={() => router.back()} className="btn btn-success">
              Companies
            </button>
          )}
        </div>
        
      </div>
    </>
  );
}
