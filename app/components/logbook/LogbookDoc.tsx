import { useState } from "react";
import ViewLogbook from "./ViewLogbook";

type Props = {
  name: string;
  url: string;
};

export default function LogbookDoc({ name, url }: Props) {
  const [viewLogbook, setViewLogbook] = useState(false);

  return (
    <div className="card table-responsive my-2">
      <ViewLogbook
        showDocumentModal={viewLogbook}
        setShowDocumentModal={setViewLogbook}
        documentToView={url}
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
              <div>{url}</div>
            </td>
            <td style={{ width: "300px" }} className="py-2">
              <ViewButton
                url={url}
                setViewLogbook={() => setViewLogbook(true)}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function ViewButton({
  url,
  setViewLogbook,
}: {
  url: string;
  setViewLogbook: (isOpen: boolean) => void;
}) {
  return (
    <div className="d-flex justify-content-end">
      <div>
        <i
          onClick={() => setViewLogbook(true)}
          className="material-icons icon-holder--outline-dark rounded-lg ml-2"
        >
          visibility
        </i>
      </div>
    </div>
  );
}
