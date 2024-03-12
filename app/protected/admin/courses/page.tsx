'use client'
import Link from 'next/link';
import { Development } from "./Development"
import { useState } from "react";
import { ICourse } from "@/app/interfaces/courses"

const Page = () => {
  const [courses, setCourses] = useState<ICourse[] | any>();

  return (
    <>
      <div className="pt-32pt">
          <div className="container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left">
            <div className="flex d-flex flex-column flex-sm-row align-items-center mb-24pt mb-md-0">
              <div className="mb-24pt mb-sm-0 mr-sm-24pt">
                <h2 className="mb-0">Courses</h2>
                <ol className="breadcrumb p-0 m-0">
                  <li className="breadcrumb-item">
                    <a href="index.html">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Courses</li>
                </ol>
              </div>
            </div>
            <div className="row" role="tablist">
              <div className="col-auto">
                <Link
                  href="/protected/admin/create-course"
                  style={{ textDecoration: "none" }}
                  className="small"
                >
                  <span className="btn btn-outline-secondary">Add Course</span>
                </Link>
              </div>
            </div>
          </div>
      </div>
      
      <Development courses={courses} />
    </>
  )
}

export default Page