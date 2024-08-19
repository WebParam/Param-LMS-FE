"use client";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import Modal from "./Modal";
import { useState } from "react";
import { useParams } from "next/navigation";
import KnowledgeModuleModal from "./KnowledgeModuleModal";
import PracticalModuleModal from "./PracticalModuleModal";
import WorkBookModal from "./WorkBookModal";

export default function PageHeader({ title }: { title: string }) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openPracticalModuleModal, setOpenPracticalModuleModal] =
    useState(false);
  const [openKnowledgeModuleModal, setOpenKnowledgeModuleModal] =
    useState(false);
    const [openWorkBookModal, setOpenWorkBookModal] =
    useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const name = searchParams.get("title");
  const moduleTitle = searchParams.get("moduleTitle") || "";
  const topicTitle = searchParams.get("topicTitle");
  const studentName = searchParams.get("studentName") || "";

  let isModule = false;
  let isKnowledgeModule = false;
  let isPracticalModule = false;
  let isAllCourse = false;
  let isViewCourseApplicants = false;
  let isViewEnrolledStudents = false;
  let isCreateModule = false;
  let isEditModule = false;
  let isEditKnowledgeModules = false;
  let isEditPracticalModules = false;
  let isEditCourse = false;
  let isCourse = false;
  let isEditDocument = false;
  let isEditKnowledgeTopic = false;
  let isWorkBook = false;
  let isAllWorkBook = false;
  const { id } = useParams<{ id: string }>();

  const arrUrl = pathname.split("/");
  const suffixPath = arrUrl.pop() || "";

  const actionLinks = [
    "paraphrase-document",
    "confirm-audio",
    "upload-link",
    "generate-quizzes",
    "questions",
    "edit-question",
    "topic-elements",
    "profiles",
    "contacts",
    "demographics",
    "document",
    "employment",
    "regional",
    "sor",
    "assessment",
    "assignment",
    "internship-details",
  ];
  const arrLink = [
    "edit",
    "documents",
    "audios",
    "videos",
    "quizzes",
    "assessments",
    "knowledge-topics",
    "course-applicants",
  ];

  const stepperMap: any = {
    "paraphrase-document": "Paraphrase Sections",
    "confirm-audio": "Confirm Audio",
    "upload-link": "Upload Link",
    "generate-quizzes": "Generate Quizzes",
    documents: "Modules",
    audios: "Audios",
    videos: "Videos",
    edit: "Edit",
    assessments: "Assessments",
    questions: "Questions",
    "edit-question": "Edit Question",
    "knowledge-topics": "Knowledge Topics",
    quizzes: "Quizzes",
    "topic-elements": "Topic Elements",
    profiles: "Student Profile",
    contacts: "Student Contacts",
    demographics: "Student Demographics",
    document: "Student Documents",
    employment: "Student Employment",
    regional: "Student Region",
    sor: "SOR",
    assessment: "Assessments",
    assignment: "Assignments",
    "internship-details": "Internship Details",
  };

  const urlDocumentMap: any = {
    "paraphrase-document": "documents",
    "confirm-audio": "audios",
    "upload-link": "videos",
    "generate-quizzes": "quizzes",
    questions: "assessments",
    "topic-elements": "knowledge-topics",
  };

  let backUrl = "";
  let newTitle = null;

  if (pathname == "/protected/admin/courses") {
    title = "Courses";
    isCourse = true;
  } else if (pathname == `/protected/admin/courses/${id}`) {
    isEditCourse = true;
  } else if (pathname == `/protected/admin/courses/${id}/course-applicants`) {
    title = `Course Applicants - ${name}`;
    isAllCourse = true;
  } else if (pathname == `/protected/admin/courses/${id}/enrollments`) {
    title = `Enrolled Students - ${name}`;
    isAllCourse = true;
  } else if (pathname.indexOf("/modules/create") !== -1) {
    title = `Create Unit Standard`;
    isCreateModule = true;
  }else if (pathname.indexOf(`/protected/admin/courses/${id}/workbook`) !== -1) {
    title = `Create Workbook`;
    isWorkBook = true;
  }
  else if (pathname.includes(`/protected/admin/courses/0/workbook/0`)) {
    title = `Workbook`;
    isAllWorkBook = true;
  }
  // Backward Compatibility for Unit Standard
  else if (pathname.indexOf("/modules") !== -1) {
    title = `${name}`;
    if ([...arrLink, ...actionLinks].indexOf(suffixPath) === -1) {
      isModule = true;
    } else {
      if (actionLinks.indexOf(suffixPath) !== -1) {
        const arr = pathname.split("/");
        const urlSlice = arr.slice(0, -3);
        backUrl = `${urlSlice.join("/")}/${
          urlDocumentMap[suffixPath]
        }?title=${title}`;
        isEditDocument = true;
      } else if (arrLink.indexOf(suffixPath) !== -1) isEditModule = true;

      title =
        name + " - " + (stepperMap[suffixPath] ? stepperMap[suffixPath] : "");
    }
  } else if (pathname.indexOf("/knowledge-modules") !== -1) {
    title = `${name}`;
    if ([...arrLink, ...actionLinks].indexOf(suffixPath) === -1) {
      isKnowledgeModule = true;
    } else {
      if (actionLinks.indexOf(suffixPath) !== -1) {
        const arr = pathname.split("/");
        const urlSlice = arr.slice(0, -3);
        backUrl = `${urlSlice.join("/")}/${
          urlDocumentMap[suffixPath]
        }?title=${title}&moduleTitle=${moduleTitle}`;
        isEditKnowledgeTopic = true;
        newTitle = (
          <div className="d-flex">
            <p
              style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                maxWidth: "560px",
                whiteSpace: "nowrap",
              }}
            >
              {topicTitle}
            </p>{" "}
            - {stepperMap[suffixPath] ? stepperMap[suffixPath] : ""}
          </div>
        );
      } else if (arrLink.indexOf(suffixPath) !== -1) {
        isEditKnowledgeModules = true;
        newTitle = (
          <div className="d-flex">
            <p
              style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                maxWidth: "560px",
                whiteSpace: "nowrap",
              }}
            >
              {moduleTitle}
            </p>{" "}
            - {stepperMap[suffixPath] ? stepperMap[suffixPath] : ""}
          </div>
        );
      }
    }
  } else if (pathname.indexOf("/practical-modules") !== -1) {
    title = `${name}`;
    if ([...arrLink, ...actionLinks].indexOf(suffixPath) === -1) {
      isPracticalModule = true;
    } else {
      if (actionLinks.indexOf(suffixPath) !== -1) {
        const arr = pathname.split("/");
        const urlSlice = arr.slice(0, -3);
        backUrl = `${urlSlice.join("/")}/${
          urlDocumentMap[suffixPath]
        }?title=${title}&moduleTitle=${moduleTitle}`;
        isEditKnowledgeTopic = true;
        newTitle = (
          <div className="d-flex">
            <p
              style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                maxWidth: "560px",
                whiteSpace: "nowrap",
              }}
            >
              {topicTitle}
            </p>{" "}
            - {stepperMap[suffixPath] ? stepperMap[suffixPath] : ""}
          </div>
        );
      } else if (arrLink.indexOf(suffixPath) !== -1) {
        isEditPracticalModules = true;
        newTitle = (
          <div className="d-flex">
            <p
              style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                maxWidth: "560px",
                whiteSpace: "nowrap",
              }}
            >
              {moduleTitle}
            </p>{" "}
            - {stepperMap[suffixPath] ? stepperMap[suffixPath] : ""}
          </div>
        );
      }
    }
  } else if (pathname.indexOf("/course-applicants") !== -1) {
    title = `${name}`;
    if ([...arrLink, ...actionLinks].indexOf(suffixPath) === -1) {
      isAllCourse = true;
    } else {
      if (actionLinks.indexOf(suffixPath) !== -1) {
        const arr = pathname.split("/");
        const urlSlice = arr.slice(0, -3);
        backUrl = `${urlSlice.join("/")}/${
          urlDocumentMap[suffixPath]
        }?title=${title}&moduleTitle=${moduleTitle}`;
        isViewCourseApplicants = true;
        newTitle = (
          <div className="d-flex">
            <p
              style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                maxWidth: "560px",
                whiteSpace: "nowrap",
              }}
              className="mr-2"
            >
              {studentName}
            </p>
            - {stepperMap[suffixPath] ? stepperMap[suffixPath] : ""}
          </div>
        );
      }
    }
  } else if (pathname.indexOf("/enrollments") !== -1) {
    title = `${name}`;
    if ([...arrLink, ...actionLinks].indexOf(suffixPath) === -1) {
      isAllCourse = true;
    } else {
      if (actionLinks.indexOf(suffixPath) !== -1) {
        const arr = pathname.split("/");
        const urlSlice = arr.slice(0, -3);
        backUrl = `${urlSlice.join("/")}/${
          urlDocumentMap[suffixPath]
        }?title=${title}&moduleTitle=${moduleTitle}`;
        isViewEnrolledStudents = true;
        newTitle = (
          <div className="d-flex">
            <p
              style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                maxWidth: "560px",
                whiteSpace: "nowrap",
              }}
              className="mr-2"
            >
              {studentName}
            </p>
            - {stepperMap[suffixPath] ? stepperMap[suffixPath] : ""}
          </div>
        );
      }
    }
  }

  return (
    <>
      <Modal
        show={openModal}
        onHide={() => setOpenModal(false)}
        courseId={id}
        title={name}
      />

      <KnowledgeModuleModal
        show={openKnowledgeModuleModal}
        onHide={() => setOpenKnowledgeModuleModal(false)}
        courseId={id}
        title={name}
      />

      <PracticalModuleModal
        show={openPracticalModuleModal}
        onHide={() => setOpenPracticalModuleModal(false)}
        courseId={id}
        title={name}
      />

       <WorkBookModal
        show={openWorkBookModal}
        onHide={() => setOpenWorkBookModal(false)}
        courseId={id}
        title={name}
      />
      <div className="border-bottom-2 py-32pt position-relative z-1">
        <div className="container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left">
          <div className="flex d-flex justify-content-between flex-column flex-sm-row align-items-center mb-24pt mb-md-0">
            <div
              style={{ width: "700px" }}
              className="mb-24pt mb-sm-0 mr-sm-24pt"
            >
              <h2
                className="mb-0"
                style={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  width: "700px",
                  whiteSpace: "nowrap",
                }}
              >
                {newTitle ? newTitle : title}
              </h2>

              <ol className="breadcrumb p-0 m-0">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>

                <li className="breadcrumb-item active">{title}</li>
              </ol>
            </div>
            <div>
              {isCourse && (
                <Link
                  className="btn btn-success"
                  href={`/protected/admin/courses/create`}
                >
                  Create Course
                </Link>
              )}
              {isEditCourse && (
                <Link
                  className="btn btn-success"
                  href={`/protected/home/courses`}
                >
                  All Courses
                </Link>
              )}
              {isEditModule && (
                <Link
                  className="btn btn-success"
                  href={`/protected/admin/courses/${id}/modules?title=${name}`}
                >
                  Unit Standards
                </Link>
              )}
              {isEditKnowledgeModules && (
                <Link
                  className="btn btn-success"
                  href={`/protected/admin/courses/${id}/knowledge-modules?title=${name}`}
                >
                  Knowledge Modules
                </Link>
              )}
              {isEditPracticalModules && (
                <Link
                  className="btn btn-success"
                  href={`/protected/admin/courses/${id}/practical-modules?title=${name}`}
                >
                  Practical Modules
                </Link>
              )}
              {isModule && (
                <button
                  className="btn btn-success"
                  onClick={() => setOpenModal(true)}
                >
                  Create Unit Standard
                </button>
              )}
              {isKnowledgeModule && (
                <button
                  className="btn btn-success"
                  onClick={() => setOpenKnowledgeModuleModal(true)}
                >
                  Create Knowledge Module
                </button>
              )}
              {isPracticalModule && (
                <button
                  className="btn btn-success"
                  onClick={() => setOpenPracticalModuleModal(true)}
                >
                  Create Practical Module
                </button>
              )}
               {isWorkBook && (
                <button
                  className="btn btn-success"
                  onClick={() => setOpenWorkBookModal(true)}
                >
                  Create Workbook
                </button>
              )}
              {isAllCourse && (
                <Link
                  className="btn btn-success"
                  href={`/protected/home/courses`}
                >
                  All Courses
                </Link>
              )}
              {isViewCourseApplicants && (
                <Link
                  className="btn btn-success"
                  href={`/protected/admin/courses/${id}/course-applicants?title=${name}`}
                >
                  Course Applicants
                </Link>
              )}
              {isViewEnrolledStudents && (
                <Link
                  className="btn btn-success"
                  href={`/protected/admin/courses/${id}/enrollments?title=${name}`}
                >
                  Enrolled Students
                </Link>
              )}
              {isEditDocument && (
                <Link className="btn btn-success" href={backUrl}>
                  Documents
                </Link>
              )}
              {isEditKnowledgeTopic && (
                <Link className="btn btn-success" href={backUrl}>
                  Knowledge Topic
                </Link>
              )}
               {isAllWorkBook && (
                <Link className="btn btn-success" href={backUrl}>
                  Workbook
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
