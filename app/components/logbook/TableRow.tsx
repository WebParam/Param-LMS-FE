import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const TableRow = ({ document }: { document: any }) => {
  const searchParams = useSearchParams();
  const refreshId = searchParams.get("refreshId");
  const [acceptDocumentModal, setAcceptDocumentModal] = useState(false);
  const [rejectDocumentModal, setRejectDocumentModal] = useState(false);
  const [documentShowModal, setDocumentShowModal] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const title = searchParams.get("title");
  const studentName = searchParams.get("studentName");
  const email = searchParams.get("email");
  const isEnrolled = searchParams.get("isEnrolled");
  const date = new Date();

  useEffect(() => {
    setDocumentShowModal(false);
  }, [refreshId]);

  const acceptDoc = () => {
    setAcceptDocumentModal(true);
    router.replace(
      `${pathname}?title=${title}&studentName=${studentName}&email=${email}&refreshId=${date}&isEnrolled=${isEnrolled}`,
      {
        scroll: false,
      }
    );
  };

  const rejectDoc = () => {
    setRejectDocumentModal(true);
    router.replace(
      `${pathname}?title=${title}&studentName=${studentName}&email=${email}&refreshId=${date}&isEnrolled=${isEnrolled}`,
      {
        scroll: false,
      }
    );
  };

  return (
    <>

      <tr className="selected">
        <td style={{ width: "250px" }} className="py-0">
          <div className="d-flex align-items-center justify-content-center">
            <p
              className="text-center my-2"
              style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                width: "250px",
              }}
            >
              {document.name || "N/A"}
            </p>
          </div>
        </td>
        <td style={{ width: "300px" }} className="py-0">
          <p
            className="text-center my-2"
            style={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              width: "300px",
            }}
          >
            {document.randomCode || "N/A"}
          </p>
        </td>

        <td style={{ width: "700px" }} className="py-0">
          <div className="d-flex justify-content-center">
            <div onClick={() => setDocumentShowModal(true)}>
              <i className="material-icons icon-holder--outline-success rounded-lg mr-8pt">
                visibility
              </i>
            </div>
            <div onClick={() => {}}>
              <i className="material-icons icon-holder--outline-success rounded-lg">
                file_download
              </i>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default TableRow;
