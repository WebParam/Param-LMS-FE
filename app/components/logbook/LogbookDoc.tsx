import Link from "next/link";
import EditLogbookDoc from "./EditLogbookDoc"

type Props = {
  name: string;
  url: string;
};
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import ViewLogbook from "./ViewLogbook";

export default function Module({
  name,

  url,
}: Props) {
  const searchParams = useSearchParams();
  const refreshId = searchParams.get("refreshId");
  const [isEditModal, setIsEditModal] = useState(false);
  const [viewLogbook, setViewLogbook] = useState(false);



  return (
    <div className="card table-responsive my-2">

<EditLogbookDoc
name = {name}
url = {url}
show={isEditModal}
onHide={() => setIsEditModal(false)}
/>

<ViewLogbook
  showDocumentModal = {viewLogbook}
  setShowDocumentModal={setViewLogbook}
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
              {url}
              </div>
            </td>
            <td style={{ width: "300px" }} className="py-2">
              <ViewButton url={url} setViewLogbook = {() => setViewLogbook(true)} setIsEditModal={() => setIsEditModal(true)} setDeleteModal={() => {}} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function ViewButton({
  url,
  setIsEditModal,
  setDeleteModal,
  setViewLogbook
}: {
  url: string;
  setIsEditModal: (isOpen: boolean) => void;
  setDeleteModal: (isOpen: boolean) => void;
  setViewLogbook: (isOpen: boolean) => void;
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

      <i onClick={() => setViewLogbook(true)} className="material-icons icon-holder--outline-dark rounded-lg ml-2">
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
