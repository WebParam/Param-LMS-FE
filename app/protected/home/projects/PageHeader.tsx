"use client";
import { useRouter } from "next/navigation";


export default function PageHeader({length}:any) {
  const router = useRouter();

  return (
    <>
      <div className="border-bottom-2 py-32pt position-relative z-1">
        <div className="container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left">
          <div className="flex d-flex justify-content-between flex-column flex-sm-row align-items-center mb-24pt mb-md-0">
            <div
              style={{ width: "850px" }}
              className="mb-24pt mb-sm-0 mr-sm-24pt"
            >
              <h2 className="mb-0">Projects</h2>

              <ol className="breadcrumb p-0 m-0">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>

                <li className="breadcrumb-item active">Projects</li>
              </ol>
            </div>
            <div>
              <button 
              onClick={() => {
                router.replace(`/protected/home/projects/create`)
              }}
              disabled = {length >= 2 ? true : false}
              className= {length >= 2 ? "btn btn-secondary" : "btn btn-success"}>
               Create Project
              </button>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
}
