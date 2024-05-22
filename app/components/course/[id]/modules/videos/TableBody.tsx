import { NextPage } from "next";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const TableBody: NextPage<{ list: any[] }> = ({ list }) => {
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const title = searchParams.get("title");

  const arrUrl = pathname.split("/");
  arrUrl.pop();
  const url =
    arrUrl.join("/") +
    `/document/123456789/upload-link?title=${title}&step=2`;

  return (
    <>
      <tbody className="list" id="staff">
        {list.length > 0 ? (
          list.map((file: File, key) => (
            <tr key={key} className="selected">
              <td
                style={{ width: "300px" }}
                className="text-center mx-auto text-justify js-lists-values-projects small"
              >
                <div className="d-flex align-items-center ml-5">
                  <p>
                    <i className="material-icons px-2">videocam</i>
                  </p>
                  <p className="text-justify">{file.name}</p>
                </div>
              </td>
              <td
                style={{ width: "200px" }}
                className="text-center js-lists-values-projects small"
              >
                <div className="progress-container">
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `60%` }}
                    ></div>
                  </div>
                  <div className="progress-bar-text">2 / 10</div>
                </div>
              </td>
              <td
                style={{ width: "300px" }}
                className="text-center js-lists-values-projects small"
              >
                <Link
                  className="btn btn-success rounded-pill px-4 py-2"
                  href={url}
                >
                  View
                </Link>
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
