import Link from "next/link";
import EditAssignmentDoc from "./EditAssignmentDoc"

type Props = {
  name: string;
  desc: string;
};
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import ViewAssignment from "./ViewAssignment";

export default function Module({
  name,
  desc,
}: Props) {
  const searchParams = useSearchParams();
  const refreshId = searchParams.get("refreshId");
  const [isEditModal, setIsEditModal] = useState(false);
  const [viewAssignment, setViewAssignment] = useState(false);

  return (
    <div className="card table-responsive my-2">

<EditAssignmentDoc
name = {name}
url = {desc}
show={isEditModal}
onHide={() => setIsEditModal(false)}
/>

<ViewAssignment
  showDocumentModal = {viewAssignment}
  setShowDocumentModal={setViewAssignment}
  pdfWorkerUrl={desc}
  documentToView={name}
/>

           <table className="table table-flush table--elevated">
        <thead>
          <tr>
            <th>
              <div className="w-75 d-flex">
                <div
                  style={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    maxWidth: "350px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {name}
                </div>
               
              </div>
            </th>
             </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{}} className="py-2">
              <div>
              {desc}
              </div>
            </td>
            <td style={{ width: "300px" }} className="py-2">
              <ViewButton desc={desc} setViewAssignment = {() => setViewAssignment(true)} setIsEditModal={() => setIsEditModal(true)} setDeleteModal={() => {}} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function ViewButton({
  desc,
  setIsEditModal,
  setDeleteModal,
  setViewAssignment
}: {
  desc: string;
  setIsEditModal: (isOpen: boolean) => void;
  setDeleteModal: (isOpen: boolean) => void;
  setViewAssignment: (isOpen: boolean) => void;
}) {
  return (
    <div className="d-flex justify-content-end">
      <div>
        <Link href="#" type="button" onClick={() => setIsEditModal(true)}>
          <i className="material-icons icon-holder--outline-dark rounded-lg">
            edit
          </i>
        </Link>
      </div>
      <div>

      <i onClick={() => setViewAssignment(true)} className="material-icons icon-holder--outline-dark rounded-lg ml-2">
            visibility
          </i>
    
      </div>
      <div>
        <Link
          href="#"
          type="button"
          className="ml-2"
          onClick={() => setDeleteModal(true)}
        >
          <i className="material-icons icon-holder--outline-dark rounded-lg">
            delete
          </i>
        </Link>
      </div>
    </div>
  );
}
