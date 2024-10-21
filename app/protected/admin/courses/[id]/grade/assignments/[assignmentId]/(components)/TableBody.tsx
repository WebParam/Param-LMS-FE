import Link from "next/link";
import { NextPage } from "next";
import { usePathname, useSearchParams } from "next/navigation";
import SkeletonLoader from "@/components/skeleton/skeletonLoader";
import { useState } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { Modal } from "react-bootstrap";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const TableBody: NextPage<{ loading: boolean, list: any[] }> = ({ list, loading }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const title = searchParams.get("title")!;
  const assessmentName = searchParams.get("assessment-name")!;
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [showDocumentModal, setShowDocumentModal] = useState(false);

  
  const pdfVersion = "3.10.111";
  const pdfWorkerUrl = `https://unpkg.com/pdfjs-dist@3.10.111/build/pdf.worker.min.js`;

  const align = {
    student_name: "pl-48pt text-justify",
    student_surname: "pl-48pt text-left",
    assessment_name: "pl-48pt text-left",
    action: "text-center",
  };

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
        {!loading ? (
          <>
            {list.length > 0 ? list.map((data) => {
              const name = data.name !== " " ? data.name : "N/A";
              const facilitatorMark = data.facilitatorMark > 0 ? data.facilitatorMark : 0;
              const moderatorMark = data.moderatorMark > 0 ? data.moderatorMark : 0;
              return (
                <tr key={data.studentId} className="selected">
                  <td className={`${align.student_name} js-lists-values-projects small`}>
                    {name}
                  </td>
                  <td className={`${align.student_surname} js-lists-values-projects small`}>
                    {data.studentId && data.studentId.slice(0, 6) + "..."}
                  </td>
                  <td className={`${align.assessment_name} js-lists-values-projects small`}>
                    {data.submissionDate}
                  </td>
                  <td className={`${align.action} js-lists-values-projects small`}>
                    <p className={`m-0 ${facilitatorMark > 50 ? "text-success" : "text-danger"}`}>
                      {facilitatorMark}/{data.facilitatorMark}
                    </p>
                  </td>
                  <td className={`${align.action} js-lists-values-projects small`}>
                    <p className={`m-0 ${moderatorMark > 50 ? "text-success" : "text-danger"}`}>
                      {moderatorMark}/{data.moderatorMark}
                    </p>
                  </td>
                  <td className={`${align.action} js-lists-values-projects small`}>
              
                    <Link
                      className={`chip  icon-holder--outline-success chip-outline-success text`}
                      href={`${pathname}/student/${data.studentId}?title=${title}&assessment_name=${assessmentName}&studentName=${name}&homeTitle=${assessmentName}`}
                    >
                      Grade Assessment
                      <i className="material-icons ">assignment_turned_in</i>
                    </Link>
                    <i
                  onClick={() => setShowDocumentModal(true)}
                  className="material-icons icon-holder--outline-success rounded-lg mr-8pt"
                >
                  visibility
                </i>
                
                  </td>
                </tr>
              );
            }) : <tr className="selected">
              <td className="text-center js-lists-values-projects small" colSpan={10}>
                No Students Assessments
              </td>
            </tr>}
          </>
        ) : (
          <>
            <tr className="selected">
              <td colSpan={10}>
                <SkeletonLoader width="100%" height="2em" />
              </td>
            </tr>
            <tr className="selected">
              <td colSpan={10}>
                <SkeletonLoader width="100%" height="2em" />
              </td>
            </tr>
            <tr className="selected">
              <td colSpan={10}>
                <SkeletonLoader width="100%" height="2em" />
              </td>
            </tr>
          </>
        )}
      </tbody>
    </>
  );
};

export default TableBody;
