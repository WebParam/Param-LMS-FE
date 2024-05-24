import { NextPage } from "next";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IDocument } from "@/app/interfaces/course-document";
import { paraphraseDocument } from "@/app/lib/actions/document";

const TableBody: NextPage<{ list: any[] }> = ({ list }) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const title = searchParams.get("title");

  const arrUrl = pathname.split("/");
  arrUrl.pop();
  const url = arrUrl.join("/");

  const handleViewDocument = (file: File) => {
    const documentURL = URL.createObjectURL(file);
    window.open(documentURL, "_blank");
  };

  const paraphrase = async (documentId: string, documentUrl: string) => {
    try {
      await paraphraseDocument(documentId, documentUrl);
    } catch (err) {
      console.log(err);
    }
    router.push(`${url}/document/${documentId}/paraphrase-document?title=${title}`);
  };

  return (
    <>
      <tbody className="list" id="staff">
        {list.length > 0 ? (
          list.map((file: IDocument, key) => (
            <tr key={key} className="selected">
              <td
                style={{ width: "300px" }}
                className="text-center mx-auto text-justify js-lists-values-projects small"
              >
                <div className="d-flex align-items-center ml-5">
                  <p>
                    <i className="material-icons ">file_present</i>
                  </p>
                  <p className="text-justify">{file.name}</p>
                </div>
              </td>
              <td style={{ width: "200px" }} className="text-center js-lists-values-projects small">
                <div className="progress-container">
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `60%` }}
                    ></div>
                  </div>
                  <div className="progress-bar-text">
                    2 / 10
                  </div>
                </div>
              </td>
              <td
                style={{ width: "300px" }}
                className="text-center js-lists-values-projects small"
              >
                <button
                  className="btn btn-success rounded-pill px-4 py-2"
                  onClick={() => console.log(file.fileBlobUrl)}
                >
                  View
                </button>
              </td>
              <td
                style={{ width: "300px" }}
                className="text-center js-lists-values-projects small"
              >
                {file.status !== "Pending" ? (
                  <button
                    className="btn btn-success rounded-pill px-4 py-2"
                    onClick={() => paraphrase(file.id, file.fileBlobUrl)}
                  >
                    Paraphase
                  </button>
                ) : (
                  <Link
                    className="btn btn-success rounded-pill px-4 py-2"
                    href={url}
                  >
                    Edit
                  </Link>
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr className="selected">
            <td
              style={{ width: "300px" }}
              className="text-center mx-auto text-justify js-lists-values-projects small"
            ></td>
            <td
              style={{ width: "600px" }}
              className="text-center js-lists-values-projects small"
            >
              No Document Files...
            </td>
            <td
              style={{ width: "300px" }}
              className="text-center js-lists-values-projects small"
            ></td>
          </tr>
        )}
      </tbody>
    </>
  );
};

export default TableBody;
