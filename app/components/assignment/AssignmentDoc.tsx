import Link from "next/link";
import EditAssignmentDoc from "./EditAssignmentDoc";

type Props = {
  name: string;
  desc: string;
  id: string;
  url: string;
};
import { useState } from "react";
import ViewAssignment from "./ViewAssignment";
import {
  deleteAssignment,
  updateAssignment,
  updateAssignmentFile,
} from "@/app/lib/actions/assignments";
import DeleteAssignmentModal from "./DeleteAssignment";

export default function Module({ name, desc, id, url }: Props) {
  const [isEditModal, setIsEditModal] = useState(false);
  const [viewAssignment, setViewAssignment] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isAssignmentDeleted, setIsAssignmentDeleted] = useState(false)
  const [openModal, setOpenModal] = useState(false);


  const handleAddAssignment = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.onchange = async (e) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const content = e.target?.result;
          if (content) {
            const formData = new FormData();
            formData.append("file", file);
            try {
              setIsFileUploaded(true);
              const updateAssignmentDoc = await updateAssignmentFile(
                formData,
                id
              );
              setErrorMessage("");
              setSuccessMessage("Assignment Updated Successfully");
              setIsFileUploaded(false);
            } catch (error) {
              setIsFileUploaded(false);
              setSuccessMessage("");
              setErrorMessage(
                "Failed Updating Assignment. (check file type and size)"
              );
            }
            setTimeout(() => {
              setErrorMessage("");
              setSuccessMessage("");
            }, 10000);
          }
        };
        reader.readAsText(file);
      }
    };
    fileInput.click();
  };

  return (
    <div className="card table-responsive my-2">
      <EditAssignmentDoc
        name={name}
        desc={desc}
        id={id}
        show={isEditModal}
        onHide={() => setIsEditModal(false)}
      />
     

      <ViewAssignment
        showDocumentModal={viewAssignment}
        setShowDocumentModal={setViewAssignment}
        pdfWorkerUrl={url}
        documentToView={name}
      />

      <table className="table table-flush table--elevated">
        <thead>
          <tr>
            <th>
              <div className="w-75 d-flex">
                <div
                  style={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  {name}
                  {successMessage && (
                    <span
                      style={{
                        position: "absolute",
                        right: "10px",
                      }}
                      className=" alert-success"
                    >
                      {successMessage}
                    </span>
                  )}
                  {errorMessage && (
                    <span
                      style={{
                        position: "absolute",
                        right: "10px",
                      }}
                      className=" alert-danger"
                    >
                      {errorMessage}
                    </span>
                  )}
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2">
              <div>{desc}</div>
            </td>
            <td style={{ width: "300px" }} className="py-2">
              <ViewButton
              isFileUploaded={isFileUploaded}
                updateAssignment={() => handleAddAssignment()}
                setViewAssignment={() => setViewAssignment(true)}
                setIsEditModal={() => setIsEditModal(true)}
                name = {name}
                id={id}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function ViewButton({
  setIsEditModal,
  name ,
  id,
  setViewAssignment,
  updateAssignment,
  isFileUploaded,
}: {
  setIsEditModal: (isOpen: boolean) => void;
  setViewAssignment: (isOpen: boolean) => void;
  updateAssignment: () => void;
  isFileUploaded: boolean;
  name:string;
  id:string
}) {

const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (


    <div className="d-flex justify-content-end">
       <DeleteAssignmentModal
        id={id}
        show={openDeleteModal}
        onHide={() => setOpenDeleteModal(false)}
        title={name}
      />
      <div>
        <Link href="#" type="button" onClick={() => setIsEditModal(true)}>
          <i className="material-icons icon-holder--outline-dark rounded-lg">
            edit
          </i>
        </Link>
      </div>
      <div>
        <i
          onClick={() => setViewAssignment(true)}
          className="material-icons icon-holder--outline-dark rounded-lg ml-2"
        >
          visibility
        </i>
      </div>
      <div>
        <Link
          href="#"
          type="button"
          className="ml-2"
          onClick={() => setOpenDeleteModal(true)}
        >

<i className="material-icons icon-holder--outline-dark rounded-lg">
            delete
          </i>
        
        </Link>
      </div>
      <div>
        <Link
          href="#"
          type="button"
          className="ml-2"
          onClick={() => updateAssignment()}
        >
          {!isFileUploaded ? (
            <i className="material-icons icon-holder--outline-dark rounded-lg">
              file_upload
            </i>
          ) : (
            <span className="spinner-border text-success" role="status" />
          )}
        </Link>
      </div>
    </div>
  );
}
