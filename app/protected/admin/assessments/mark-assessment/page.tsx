"use client"
import "../assessments.css"
import { TiTick } from "react-icons/ti";
import { IoCheckmarkSharp } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";
import NumberInput from 'react-number-input';
import { useState } from "react";
export default function GradeAssessment() {

  const [count, setCount] = useState<number>(0);


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
          <div className="flex d-flex flex-row flex-sm-row align-items-center">
            <div className="mb-24pt mb-sm-0 mr-sm-24pt">
                <div>
                <h2 className="mb-0">
              Assessements
              </h2>
              <ol className="breadcrumb p-0 m-0">
                <li className="breadcrumb-item">
                  <a href="#index.html">Home</a>
                </li>
                <li className="breadcrumb-item active">Grade Assessments</li>
              </ol>

                    </div>


            </div>
         
          </div>
          
        </div>
     
        <div className="grade-details">
    <p>
<strong>
Kwanele Ndaba
</strong>
    </p>
    <p>
    <strong>
    Course Name
        </strong> : React JS
    </p>
     </div>
     <div className="container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left percentage">
            <p>
                87%
            </p>
         </div>
      

         <div className="container page__container flex-column flex-md-row align-items-center text-center text-sm-left question_container">
            <h5>
                Question 1 
            </h5>
            <p>
                What is the difference between Next JS and React JS?
            </p>

            <h5>Answer</h5>
           <div className="answer-section">
           <p className="answer">
            Next JS is used to create web applications and performs server-side rendering, whereas React JS focuses on rendering towards the DOM.
            </p>

           <div className="mark-section">
         <p>
         
          <input type = "text" placeholder="1"
          
          style={{width: "80px"}}
          />
              </p>
            <div className = "icons">
        <p>
        <IoCheckmarkSharp  className="tick-icon"/>
        </p>
            <p 
            className="x-icon"
            style={{paddingTop:"2px", marginLeft:"2px"}}
            ><FaXmark/></p>
            </div>
           </div>
           </div>
         </div>
      </div>

    </div>  
  </div>
  )
}
