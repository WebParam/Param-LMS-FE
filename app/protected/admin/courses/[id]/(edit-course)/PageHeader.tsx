"use client";
import KnowledgeModuleModal from "@/components/course/KnowledgeModuleModal";
import PracticalModuleModal from "@/components/course/PracticalModuleModal";
import WorkBookModal from "@/components/course/WorkBookModal";
import Link from "next/link";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

interface Tabs {
  [id: string]: string;
}

export default function PageHeader() {
  const { id } = useParams<{ id: string }>();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const title = searchParams.get("title");

  const tabs = {
    "knowledge-modules": "Knowledge Modules",
    "practical-modules": "Practical Skills Modules",
    workbook: "Workbook",
    logbook: "Logbook",

  } as Tabs;

  const subPath = pathname.split("/").at(-1) || "/";
  const subPathName = subPath == id ? "Edit Course" : tabs[subPath];
  const [openPracticalModuleModal, setOpenPracticalModuleModal] =
    useState(false);
  const [openKnowledgeModuleModal, setOpenKnowledgeModuleModal] =
    useState(false);
  const [openWorkBookModal, setOpenWorkBookModal] = useState(false);

  return (
    <>
      <KnowledgeModuleModal
        show={openKnowledgeModuleModal}
        onHide={() => setOpenKnowledgeModuleModal(false)}
        courseId={id}
        title={title}
      />
      <PracticalModuleModal
        show={openPracticalModuleModal}
        onHide={() => setOpenPracticalModuleModal(false)}
        courseId={id}
        title={title}
      />
      <WorkBookModal
        show={openWorkBookModal}
        onHide={() => setOpenWorkBookModal(false)}
        courseId={id}
        title={title}
      />
      <div className="border-bottom-2 py-32pt position-relative z-1">
        <div className="container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left">
          <div className="flex d-flex justify-content-between flex-column flex-sm-row align-items-center mb-24pt mb-md-0">
            <div
              style={{ width: "850px" }}
              className="mb-24pt mb-sm-0 mr-sm-24pt"
            >
              <h2 className="mb-0">{subPathName}</h2>

              <ol className="breadcrumb p-0 m-0">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>

                <li className="breadcrumb-item active">{subPathName}</li>
              </ol>
            </div>
            <div>
              {subPath == id && (
                <Link
                  className="btn btn-success"
                  href={`/protected/home/courses`}
                >
                  All Courses
                </Link>
              )}
              {subPath == "knowledge-modules" && (
                <button
                  className="btn btn-success"
                  onClick={() => setOpenKnowledgeModuleModal(true)}
                >
                  Create Knowledge Module
                </button>
              )}
              {subPath == "practical-modules" && (
                <button
                  className="btn btn-success"
                  onClick={() => setOpenPracticalModuleModal(true)}
                >
                  Create Practical Module
                </button>
              )}
              {subPath == "workbook" && (
                <button
                  className="btn btn-success"
                  onClick={() => setOpenWorkBookModal(true)}
                >
                  Create Workbook
                </button>
              )}
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
}
