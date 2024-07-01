import Link from "next/link";

type Props = {
  moduleName: string;
  moduleAnswer: string;
  noOfFile: number;
  url: string;
};
export default function Module({
  moduleName,
  moduleAnswer,
  noOfFile,
  url,
}: Props) {
  return (
    <div className="card table-responsive my-24pt ">
      <table className="table table-flush table--elevated">
        <thead>
          <tr>
            <th>{moduleName}</th>
            <th>
              <div className="text-right w-100">
                <div className="row">
                  <div className="col-6">
                    <div className="progress-bar ml-5 my-3">
                      <div
                        className="progress-bar-fill"
                        style={{ width: "62%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="col-6 pt-2">
                    <i className="material-icons">file_present</i>0 / {noOfFile}{" "}
                    files
                  </div>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2">{moduleAnswer}</td>
            <td style={{ width: "300px" }} className="py-2">
              <ViewButton url={url} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function ViewButton({ url }: { url: string }) {
  return (
    <div className="d-flex w-100">
      <div className="d-flex w-75">
        <div className="text-center w-100 py-2"></div>
      </div>
      <div>
        <Link href={url} type="button" className="btn btn-outline-success ml-3">
          <i className="material-icons">visibility</i>
        </Link>
      </div>
    </div>
  );
}
