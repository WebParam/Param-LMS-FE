"use client"

import { useRouter, useSearchParams } from "next/navigation";

interface PageHeaderProps {
  title : string
}

export default function PageHeader({ title } : { title: string }) {
    const searchParams = useSearchParams();
  const studentName = searchParams.get("studentname");
  const buttonTitle = searchParams.get("btn-title");
const router = useRouter();
    
  return (
    <>
      <div className="border-bottom-2 py-32pt position-relative z-1">
        <div className="container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left">
          <div className="flex d-flex flex-column flex-sm-row align-items-center mb-24pt mb-md-0">
            <div className="mb-24pt mb-sm-0 mr-sm-24pt">
              <h2 className="mb-0">{title}</h2>

              <ol className="breadcrumb p-0 m-0">
                <li className="breadcrumb-item">
                  <a href="#">Dashboard</a>
                </li>

                <li className="breadcrumb-item active">{title} </li>
              </ol>
            </div>
          </div>
            {
          buttonTitle &&   <button onClick = {() => router.back()}className = "btn btn-success">
        {buttonTitle}
          </button>
        }
        </div>
      </div>
    </>
  );
};



