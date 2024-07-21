"use client"
import Link from "next/link";
import { NextPage } from "next";
import { usePathname, useSearchParams } from "next/navigation";
import { ICourseAssessment } from "@/app/interfaces/assessments";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import SkeletonLoader from "@/components/skeleton/skeletonLoader";



const TableBody: NextPage<{ list: ICourseAssessment[] }> = ({ list }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [showDocumentModal, setShowDocumentModal] = useState(false)
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const assessmentName = searchParams.get("assessment-name")!;

  const align = {
    student_name: "pl-12pt text-center",
    student_surname: "pl-48pt text-left",
    assessment_name: "pl-48pt text-left",
    action: "text-center",
  };
  
const pdfVersion = "3.10.111";
const pdfWorkerUrl = `https://unpkg.com/pdfjs-dist@3.10.111/build/pdf.worker.min.js`;

  return (
    <>
      <Modal  
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered show={showDocumentModal} onHide={() => setShowDocumentModal(false)}
      >
      <Modal.Header closeButton>
        <Modal.Title>Document Preview</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Worker workerUrl={pdfWorkerUrl}>
          <Viewer
            fileUrl="https://khumla-development-user-read.azurewebsites.net/api/Documents/PreviewDocument/66754b17c66474c142f6b9f6"
            plugins={[defaultLayoutPluginInstance]}
          />
        </Worker>
      </Modal.Body>
    </Modal>
      <tbody className="list" id="staff">
        {list.length > 0 ? 
          list.map((data: ICourseAssessment) => (
            <tr key={data.assessmentId} className="selected">
              <td
                className={`${align.student_name} js-lists-values-projects small`}
              >
                {data.name}
              </td>
              <td className={`${align.action} js-lists-values-projects small`}>
                {data.userId.slice(0, 6) + "..."}
              </td>
              <td
                className={`${align.assessment_name} js-lists-values-projects small`}
              >
                {data.datesubmitted}
              </td>
              <td className={`${align.action} js-lists-values-projects small`}>
                <p
                  className={
                    data.factilitatorMark > 50 ? "text-success" : "text-danger"
                  }
                >
                  {data.factilitatorMark}/{data.totalMark}
                </p>
              </td>
              <td className={`${align.action} js-lists-values-projects small`}>
                <p
                  className={
                    data.moderatorMark > 50 ? "text-success" : "text-danger"
                  }
                >
                  {data.moderatorMark}/{data.totalMark}
                </p>
              </td>
              <td
                className={`${align.action} js-lists-values-projects small d-flex justify-content-center align-items-center`}
              >
                 <i  onClick={() => setShowDocumentModal(true)}  className="material-icons icon-holder--outline-success rounded-lg mr-8pt">
                visibility
              </i>

                <Link
                 
                  href={`${pathname}/${data.userId}?assessment_name=${assessmentName}&title=${data.name}&homeTitle=${assessmentName}`}
                >
                <i  className="material-icons icon-holder--outline-success rounded-lg mr-8pt">
                assignment_turned_in
              </i>
                </Link>
              </td>
            </tr>
          )) :   <>
          <tr className="selected">
         <td colSpan={10}>
           <SkeletonLoader width="100%" height="2em" />
         </td>
         
       </tr>
       <tr className="selected">
         <td colSpan={10}>
           <SkeletonLoader width="100%" height="2em" />
         </td>
         
       </tr> <tr className="selected">
         <td colSpan={10}>
           <SkeletonLoader width="100%" height="2em" />
         </td>
         
       </tr>
       </>
         }
      </tbody>
    </>
  );
};

export default TableBody;
