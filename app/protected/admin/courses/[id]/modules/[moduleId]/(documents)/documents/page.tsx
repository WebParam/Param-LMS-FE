"use client";
import Pagination from "@/app/components/Pagination";
import Table from "@/components/course/[id]/modules/documents/Table";
import { ChangeEvent, useRef, useState, useEffect } from "react";
import { uploadDocuments, getDocuments } from "@/app/lib/actions/document";
import { IDocument } from "@/app/interfaces/course-document";
import { useSearchParams } from "next/navigation";
import CreateDocumentModal from "@/components/course/[id]/modules/documents/CreateDocumentModal";

const Body = ({ params }: { params: { id: string; moduleId: string } }) => {
  const { id: courseId, moduleId } = params;
  const searchParams = useSearchParams();
  const courseTitle = searchParams.get("title") || "";
  const refreshId = searchParams.get("refreshId");

  const [files, setFiles] = useState<IDocument[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMSPERPAGE = 7;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const currentItems =
    files && files.length > 0
      ? files.slice(indexOfFirstItem, indexOfLastItem)
      : [];
  const ref = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;

    if (selectedFiles) {
      const fileList = Array.from(selectedFiles);
      const formData = new FormData();
      for (const file of fileList) {
        formData.append("files[]", file, file.name);
      }
      const documents = await uploadDocuments(
        courseId,
        moduleId,
        courseTitle,
        formData
      );
      setFiles([...documents, ...files]);
    }
  };

  const fetchDocuments = async () => {
    const files = await getDocuments(moduleId);
    setFiles(files);
  };

  useEffect(() => {
    fetchDocuments();
  }, [refreshId]);

  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      <CreateDocumentModal
        show={openModal}
        onHide={() => {
          setOpenModal(false);
        }}
      />

      <div className="page-separator my-4">
        <div className="page-separator__text">Modules</div>
      </div>

      <div className="card mb-3 d-flex flex-row p-2 justify-content-end">
        <input
          type="file"
          hidden
          ref={ref}
          accept=".pdf,.doc,.docx"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            handleFileSelect(event)
          }
          multiple
        />
        <div className="mx-1">
          <button
            className="btn btn-success btn-block mx-1"
            onClick={() => ref?.current?.click()}
          >
            Add Files
          </button>
        </div>
        <div className="mx-1">
          <button
            className="btn btn-success btn-block"
            onClick={() => setOpenModal(true)}
          >
            Create Module
          </button>
        </div>
      </div>

      <div className="card mt-3 mb-3">
        <Table list={currentItems} />
      </div>

      <div className="card mb-0">
        <Pagination
          listLength={files?.length}
          indexOfLastItem={indexOfLastItem}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          ITEMSPERPAGE={ITEMSPERPAGE}
        />
      </div>
    </>
  );
};

export default Body;
