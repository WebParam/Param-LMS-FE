import Link from "next/link";

type Props = {
  id: string;
  name: string;
  moduleCode: string;
  description: string;
  url: string;
};
import { removeTags } from "@/app/lib/utils";
import EditKnowledgeModuleModal from "./EditKnowledgeModuleModal";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Module({
  id,
  name,
  moduleCode,
  description,
  url,
}: Props) {
  const [isEditModal, setIsEditModal] = useState(false);
  const searchParams = useSearchParams();
  const refreshId = searchParams.get("refreshId");

  useEffect(() => {
    setIsEditModal(false);
  }, [refreshId]);

  return (
    <div className="card table-responsive my-2">
      <EditKnowledgeModuleModal
        id={id}
        name={name}
        moduleCode={moduleCode}
        description={description}
        url={url}
        show={isEditModal}
        onHide={() => setIsEditModal(false)}
      />

      <table className="table table-flush table--elevated">
        <thead>
          <tr>
            <th>
              {name} - ({moduleCode || "N/A"})
            </th>
            <th>
              <div className="text-right w-100">
                <div className="row">
                  <div className="col-10">
                    <div className="progress-bar ml-5 my-3 w-100">
                      <div
                        className="progress-bar-fill"
                        style={{ width: "62%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2">{removeTags(description || "")}</td>
            <td style={{ width: "300px" }} className="py-2">
              <ViewButton url={url} setIsEditModal={setIsEditModal} />
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
}: {
  url: string;
  setIsEditModal: (isOpen: boolean) => void;
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
        <Link href={url} type="button" className="ml-2">
          <i className="material-icons icon-holder--outline-dark rounded-lg">
            visibility
          </i>
        </Link>
      </div>
    </div>
  );
}
