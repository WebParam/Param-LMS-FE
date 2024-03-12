"use client"

import { Api } from "@/app/lib/restapi/endpoints";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Link from 'next/link';
import { IAssessment } from "@/app/interfaces/assessment";
import { ICourse, IStudentCourses } from "@/app/interfaces/courses";

const CourseAssessments = () => {



    const [student, setStudent] = useState();
    const [studentEnrolledCourses,setStudentEnrolledCourses] = useState<any>();
    const [assessmentList, setAssessmentList] = useState<IAssessment[]>();
    const [courses, setCourses] = useState<any>();


    const studentAssessmentsByCourses = async (ids:string) => {
        console.log("payload UI", ids)
       const assessments = await Api.GET_StudentAssessmentsByCourses(ids)!;
       setAssessmentList(assessments.data)
       console.log("mase", assessments)
        console.log("courses", assessments)
        //setAssessmentList(assessments);
    }

    const  getStudentCourses = async () => {
        try {
        const cookies = new Cookies();
          var student = cookies.get('param-lms-user');
          console.log("Id ", student.id)
          const course = await Api.GET_StudentCoursesById(student.id);
            const enrolled = await Api.GET_EnrolledCoursesByStudentId(student.id);
            const enrolledCourses = course.data;
           setStudentEnrolledCourses(course.data!.enrolledCourses)
            setCourses(course?.data?.allCourses)
           const pluck = (property:any) => (element:any) => element[property]
           
            const arrayList = course.data!.enrolledCourses.map(pluck('id'))
            var params = new URLSearchParams();

            // Add each item in the list as a 'courses' parameter
            arrayList.forEach(function(id) {
                params.append('courses', id);
            });

            // Get the final query string
            var queryString = params.toString();

            console.log("queryString", queryString)

           studentAssessmentsByCourses(queryString);
        } catch (error) {
          console.error('Error:', error);        }
      }  

      const handleClick = () => {
 
      };

    useEffect(() => {

        const cookies = new Cookies();

        const userData = cookies.get("param-lms-user");
        console.log("userData", userData);
        setStudent(userData);
        getStudentCourses();
        

    }, []);

  

    return (
        <div className="page__container page-section">
        <div className="page-separator">
          <div className="page-separator__text">Assessments</div>
        </div>
        <div className="card dashboard-area-tabs p-relative o-hidden mb-lg-32pt">
          <div className="card-header p-0 nav">
            <div className="row no-gutters" role="tablist">
              <div className="col-auto">
                <a
                  href="#"
                  data-toggle="tab"
                  role="tab"
                  aria-selected="true"
                  className="dashboard-area-tabs__tab card-body d-flex flex-row align-items-center justify-content-start active"
                >
                  <span className="h2 mb-0 mr-3">3</span>
                  <span className="flex d-flex flex-column">
                    <strong className="card-title">Active</strong>
                    <small className="card-subtitle text-50">Ongoing Assessment</small>
                  </span>
                </a>
              </div>
              <div className="col-auto border-left border-right">
                <a
                  href="#"
                  data-toggle="tab"
                  role="tab"
                  aria-selected="false"
                  className="dashboard-area-tabs__tab card-body d-flex flex-row align-items-center justify-content-start"
                >
                  <span className="h2 mb-0 mr-3">2</span>
                  <span className="flex d-flex flex-column">
                    <strong className="card-title">Archived</strong>
                    <small className="card-subtitle text-50">Past Projects</small>
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div
            className="table-responsive"
            data-toggle="lists"
            data-lists-sort-by="js-lists-values-date"
            data-lists-sort-desc="true"
            data-lists-values='["js-lists-values-lead", "js-lists-values-project", "js-lists-values-status", "js-lists-values-budget", "js-lists-values-date"]'
          >
            <table className="table mb-0 thead-border-top-0 table-nowrap">
              <thead>
                <tr>
                  <th style={{ width: 18 }} className="pr-0">
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input js-toggle-check-all"
                        data-target="#projects"
                        id="customCheckAll"
                        data-domfactory-upgraded="toggle-check-all"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheckAll"
                      >
                        <span className="text-hide">Toggle all</span>
                      </label>
                    </div>
                  </th>
                  <th style={{ width: 150 }}>
                    <a
                      href="javascript:void(0)"
                      className="sort"
                      data-sort="js-lists-values-project"
                    >
                      Title
                    </a>
                  </th>
                  <th>
                    <a
                      href="javascript:void(0)"
                      className="sort"
                      data-sort="js-lists-values-lead"
                    >
                    Instructor
                    </a>
                  </th>
                  <th style={{ width: 48 }}>
                    <a
                      href="javascript:void(0)"
                      className="sort"
                      data-sort="js-lists-values-status"
                    >
                      Status
                    </a>
                  </th>
                  <th style={{ width: 48 }}>
                    {/* <a
                      href="javascript:void(0)"
                      className="sort"
                      data-sort="js-lists-values-budget"
                    >
                      Budget
                    </a> */}
                  </th>
                  {/* <th style={{ width: 48 }}>
                    <a
                      href="javascript:void(0)"
                      className="sort desc"
                      data-sort="js-lists-values-date"
                    >
                      Due
                    </a>
                  </th> */}
                  <th style={{ width: 24 }} />
                </tr>
              </thead>
              <tbody className="list" id="projects">
                {
                assessmentList?.map((item:any, index:number) => (
                    <tr key={index}>
                    <td className="pr-0">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input js-check-selected-row"
                          id="customCheck1_1"
                          data-domfactory-upgraded="check-selected-row"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheck1_1"
                        >
                          <span className="text-hide">Check</span>
                        </label>
                      </div>
                    </td>
                    <td>
                      <div
                        className="media flex-nowrap align-items-center"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        <div className="avatar avatar-sm mr-8pt">
                          <span className="avatar-title rounded bg-primary text-white">
                          
                          </span>
                        </div>
                        <div className="media-body">
                          <div className="d-flex flex-column">
                            <small className="js-lists-values-project">
                              <strong>{courses?.filter((obj:any) => obj.id = item?.data.id).title ? courses?.filter((obj:any) => obj.id = item?.data.id).title : 'Sample Course'}</strong>
                            </small>
                            {/* <small className="js-lists-values-location text-50">
                              Twitter
                            </small> */}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div
                        className="media flex-nowrap align-items-center"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        <div className="avatar avatar-32pt mr-8pt">
                          {/* <span className="avatar-title rounded-circle">BN</span> */}
                        </div>
                        <div className="media-body">
                          <div className="d-flex align-items-center">
                            <div className="flex d-flex flex-column">
                              <p className="mb-0">
                                <strong className="js-lists-values-lead">
                                {courses?.filter((obj:any) => obj.id = item?.data.createdByUserId).instructor ? courses?.filter((obj:any) => obj.id = item?.data.createdByUserId).instructor : 'John Doe'}
                                </strong>
                              </p>
                              <small className="js-lists-values-email text-50">
                                {/* Quality Assurance */}
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex flex-column">
                        <small className="js-lists-values-status text-50 mb-4pt">
                          Completed
                        </small>
                        <span className="indicator-line rounded bg-warning" />
                      </div>
                    </td>
                    <td>
                      <div className="d-flex flex-column">
                        <small className="js-lists-values-budget">
                          <strong></strong>
                          <button className="btn btn-primary">
                          <Link href={{ pathname: '/protected/student/assessment', query: {assessment: item?.data.id} }}>
                            
                            <span style={{color:'white'}}>Take Assessment</span>
                          </Link>
                            </button>
                          
                        </small>
                        {/* <small className="text-50">Invoice Sent</small> */}
                      </div>
                    </td>
                    <td>
                      <div className="d-flex flex-column">
                        <small className="js-lists-values-date">
                          {/* <strong>19/02/2019</strong> */}
                        </small>
                        {/* <small className="text-50">18 days</small> */}
                      </div>
                    </td>
                    <td className="text-right">
                      <a href="" className="text-50">
                        <i className="material-icons">more_vert</i>
                      </a>
                    </td>
                  </tr>
                ))
                }
               
                {/* <tr>
                  <td className="pr-0">
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input js-check-selected-row"
                        id="customCheck1_2"
                        data-domfactory-upgraded="check-selected-row"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheck1_2"
                      >
                        <span className="text-hide">Check</span>
                      </label>
                    </div>
                  </td>
                  <td>
                    <div
                      className="media flex-nowrap align-items-center"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      <div className="avatar avatar-sm mr-8pt">
                        <span className="avatar-title rounded bg-accent text-white">
                          PM
                        </span>
                      </div>
                      <div className="media-body">
                        <div className="d-flex flex-column">
                          <small className="js-lists-values-project">
                            <strong>Project Management App</strong>
                          </small>
                          <small className="js-lists-values-location text-50">
                            Github
                          </small>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div
                      className="media flex-nowrap align-items-center"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      <div className="avatar avatar-32pt mr-8pt">
                        <span className="avatar-title rounded-circle">TP</span>
                      </div>
                      <div className="media-body">
                        <div className="d-flex align-items-center">
                          <div className="flex d-flex flex-column">
                            <p className="mb-0">
                              <strong className="js-lists-values-lead">
                                Tony Parks
                              </strong>
                            </p>
                            <small className="js-lists-values-email text-50">
                              iOS Development
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex flex-column">
                      <small className="js-lists-values-status text-50 mb-4pt">
                        Finished
                      </small>
                      <span className="indicator-line rounded bg-accent" />
                    </div>
                  </td>
                  <td>
                    <div className="d-flex flex-column">
                      <small className="js-lists-values-budget">
                        <strong>$12,500</strong>
                      </small>
                      <small className="text-50">Paid</small>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex flex-column">
                      <small className="js-lists-values-date">
                        <strong>18/02/2019</strong>
                      </small>
                      <small className="text-danger">Overdue</small>
                    </div>
                  </td>
                  <td className="text-right">
                    <a href="" className="text-50">
                      <i className="material-icons">more_vert</i>
                    </a>
                  </td>
                </tr> */}
                
              </tbody>
            </table>
          </div>
          <div className="card-footer p-8pt">
            <ul className="pagination justify-content-start pagination-xsm m-0">
              <li className="page-item disabled">
                <a className="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true" className="material-icons">
                    chevron_left
                  </span>
                  <span>Prev</span>
                </a>
              </li>
              <li className="page-item dropdown">
                <a
                  className="page-link dropdown-toggle"
                  data-toggle="dropdown"
                  href="#"
                  aria-label="Page"
                >
                  <span>1</span>
                </a>
                <div className="dropdown-menu">
                  <a href="" className="dropdown-item active">
                    1
                  </a>
                  <a href="" className="dropdown-item">
                    2
                  </a>
                  <a href="" className="dropdown-item">
                    3
                  </a>
                  <a href="" className="dropdown-item">
                    4
                  </a>
                  <a href="" className="dropdown-item">
                    5
                  </a>
                </div>
              </li>
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Next">
                  <span>Next</span>
                  <span aria-hidden="true" className="material-icons">
                    chevron_right
                  </span>
                </a>
              </li>
            </ul>
          </div>
          {/* <div class="card-body bordet-top text-right">
        15 <span class="text-50">of 1,430</span> <a href="#" class="text-50"><i class="material-icons ml-1">arrow_forward</i></a>
      </div> */}
        </div>
        </div>
       
    )
    

}

export default CourseAssessments;