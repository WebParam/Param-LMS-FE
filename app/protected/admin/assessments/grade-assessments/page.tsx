"use client"
import { Api } from "@/app/lib/restapi/endpoints";
import "../assessments.css"
import {useRouter} from "next/navigation"
import { useEffect } from "react";
export default function ViewAssessments() {

const router = useRouter();

const goToAssessments = () => {
  router.push("/protected/admin/assessments/mark-assessment")
}


const getComments = async () => {
  const comments = await Api.GET_GetAllComments();
  console.log("Comments",comments)
}

useEffect(() => {
  getComments();
},[])

  return (
    <div
    style={{ width: "100%" }}
    className="mdk-drawer-layout js-mdk-drawer-layout"
    data-push=""
    data-responsive-width="992px"
    data-domfactory-upgraded="mdk-drawer-layout"
  >
    <div
      className="mdk-drawer-layout__content page-content"
      style={{ transform: "translate3d(0px, 0px, 0px)" }}
    >
     
      <div className="pt-32pt">
        <div className="container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left">
          <div className="flex d-flex flex-column flex-sm-row align-items-center">
            <div className="mb-24pt mb-sm-0 mr-sm-24pt">
              <h2 className="mb-0">
              Assessements
              </h2>
              <ol className="breadcrumb p-0 m-0">
                <li className="breadcrumb-item">
                  <a href="index.html">Home</a>
                </li>
                <li className="breadcrumb-item active">Assessments</li>
              </ol>
            </div>
         
          </div>
          
        </div>
        <div className="container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left header-titles">
                <h5>
                    Name
                </h5>
                <h5>
                    Surname
                </h5>
                <h5>
                    Course
                </h5>

            </div>

            <div className="container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left assessment-details">


            <p>
                    Kwanele
                </p>
                <p>
                    Ndaba
                </p>
                <p style={{alignSelf:"flex-end"}}>
                    Mastering React

                    <a
                       onClick={goToAssessments}
                          className="btn btn-outline-secondary btn-grade"
                        >
                          Grade Assessment
                        </a>
                </p>

                {/* <a
                          href="#"
                          className="btn btn-outline-secondary"
                        >
                          Grade Assessment
                        </a> */}

            </div>
         
            <div className="container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left assessment-details">


            <p>
                    Kwanele
                </p>
                <p>
                    Ndaba
                </p>
                <p style={{alignSelf:"flex-end"}}>
                    Mastering React

                    <a
                          href="#"
                          className="btn btn-outline-secondary btn-grade"
                        >
                          Grade Assessment
                        </a>
                </p>

                {/* <a
                          href="#"
                          className="btn btn-outline-secondary"
                        >
                          Grade Assessment
                        </a> */}

            </div>
         
            <div className="container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left assessment-details">


            <p>
                    Kwanele
                </p>
                <p>
                    Ndaba
                </p>
                <p style={{alignSelf:"flex-end"}}>
                    Mastering React

                    <a
                          href="#"
                          className="btn btn-outline-secondary btn-grade"
                        >
                          Grade Assessment
                        </a>
                </p>

                {/* <a
                          href="#"
                          className="btn btn-outline-secondary"
                        >
                          Grade Assessment
                        </a> */}

            </div>
         
      </div>

    </div>  
  </div>
  )
}
