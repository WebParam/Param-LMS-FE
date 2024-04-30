import { IAssessment } from '@/app/interfaces/assessment'
import { ICourse } from '@/app/interfaces/courses'
import React from 'react'

interface HeaderProps {
    courseAssessment : IAssessment
    courseInfo : ICourse
    currentQuestion : number

}

const Header = ({courseAssessment,
    courseInfo,
    currentQuestion}:HeaderProps) => {
  return (
   <>
   <div className="bg-primary pb-lg-64pt py-32pt">
                        <div className="container page__container">
                            <h2 className='header'>Course Assessment</h2>
                            <h5 className='subheader'>{courseInfo?.description}</h5>
                            <nav className="course-nav">
                                {courseAssessment?.questions?.map((q: any, i: number) => (
                                    <a
                                        data-toggle="tooltip"
                                        data-placement="bottom"
                                        data-title={q?.name}
                                        data-original-title
                                        title={q?.name}
                                        key={i}
                                    >
                                        <span className="material-icons">check_circle</span>
                                    </a>
                                ))}
                            </nav>
                            <div className="d-flex flex-wrap align-items-end justify-content-end mb-16pt">
                                <h1 className="text-white flex m-0">Question {currentQuestion + 1} of {courseAssessment?.questions?.length}</h1>
                            </div>
                            <p className="hero__lead measure-hero-lead text-white-50">
                                {courseAssessment?.questions[currentQuestion]?.questionDescription}
                            </p>
                        </div>
                    </div>
                    <div
                        className="navbar navbar-expand-md navbar-list navbar-light bg-white border-bottom-2 "
                        style={{ whiteSpace: "nowrap" }}
                    >
                        <div className="container page__container">
                            <ul className="nav navbar-nav flex navbar-list__item">
                                <li className="nav-item">
                                    <i className="material-icons text-50 mr-8pt">tune</i>
                                    Choose the correct answer below:
                                </li>
                            </ul>
                            <div className="nav navbar-nav ml-sm-auto navbar-list__item">
                                <div className="nav-item d-flex flex-column flex-sm-row ml-sm-16pt">
                                    <a
                                        className="btn justify-content-center btn-outline-secondary w-100 w-sm-auto mb-16pt mb-sm-0"
                                    >
                                        Skip Assessment
                                    </a>
                                    <a
                                        className="btn justify-content-center btn-outline-secondary w-100 w-sm-auto mb-16pt mb-sm-0 ml-sm-16pt"
                                    >
                                        Review Course
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

   </>
  )
}

export default Header
