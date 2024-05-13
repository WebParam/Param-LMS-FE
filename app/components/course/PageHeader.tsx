"use client";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import Modal from "./Modal";
import { useState } from "react";

export default function PageHeader({ title }: { title: string }) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");
  const id = searchParams.get("id");
  const name = searchParams.get("title");
  let isModule = false;
  let isCreateModule = false;
  let isEditModule = false;
  let isEditCourse = false;
  let isEditDocument = false;

  const arrUrl = pathname.split("/");
  const suffixPath = arrUrl.pop() || "";

  const arrLink = ["paraphrase-document", "confirm-audio", "upload-link"];
  const stepperMap: any = {
    "paraphrase-document": "Paraphrase Sections",
    "confirm-audio": "Confirm Audio",
    "upload-link": "Upload Link",
  };

  if (pathname.indexOf("/modules/create") !== -1) {
    title = `Create Unit Standard`;
    isCreateModule = true;
  } else if (pathname.indexOf("/modules/edit") !== -1) {
    title = `Edit Unit Standard`;
    isEditModule = true;
  } else if (pathname.indexOf("/modules/documents") !== -1) {
    title = `Unit Standard - Documents`;
    isEditModule = true;
  } else if (id) {
    isEditCourse = true;
  } else if (pathname.indexOf("/modules") !== -1) {
    title = `${name} - Unit Standards`;
    if (arrLink.indexOf(suffixPath) === -1) {
      isModule = true;
    } else {
      isEditDocument = true;
      title = `${name} - ${stepperMap[suffixPath]}`;
    }
  }

  return (
    <>
      <Modal
        show={openModal}
        onHide={() => setOpenModal(false)}
        courseId={courseId}
        name={name}
      />

      <div className="border-bottom-2 py-32pt position-relative z-1">
        <div className="container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left">
          <div className="flex d-flex justify-content-between flex-column flex-sm-row align-items-center mb-24pt mb-md-0">
            <div className="mb-24pt mb-sm-0 mr-sm-24pt">
              <h2 className="mb-0">{title}</h2>

              <ol className="breadcrumb p-0 m-0">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>

                <li className="breadcrumb-item active">{title}</li>
              </ol>
            </div>
            {isEditCourse && (
              <div>
                <Link
                  className="btn btn-success"
                  href={`/protected/admin/courses/${id}/modules?courseId=${id}&title=${name}`}
                >
                  Unit Standards
                </Link>
              </div>
            )}
            {isEditModule && (
              <div>
                <Link
                  className="btn btn-success"
                  href={`/protected/admin/courses/${courseId}/modules?courseId=${courseId}&title=${name}`}
                >
                  Unit Standards
                </Link>
              </div>
            )}
            {isModule && (
              <div>
                <button
                  className="btn btn-success"
                  onClick={() => setOpenModal(true)}
                >
                  Create Unit Standard
                </button>
              </div>
            )}
            {isEditDocument && (
              <div>
                <Link
                  className="btn btn-success"
                  href={`/protected/admin/courses/${courseId}/modules/documents?courseId=${courseId}&title=${name}`}
                >
                  Documents
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}