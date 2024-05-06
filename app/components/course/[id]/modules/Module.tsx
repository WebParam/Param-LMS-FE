import Link from "next/link";

type Props = {
  moduleName: string;
  moduleAnswer: string;
  noOfFile: number;
  url: string
};
export default function Module({
  moduleName,
  moduleAnswer,
  noOfFile,
  url
}: Props) {

  return (
    <div className="card table-responsive my-24pt">
      <table className="table table-flush table--elevated">
        <thead>
          <tr>
            <th>{moduleName}</th>
            <th>
              <div className="text-right w-100">
                <i className="material-icons">file_present</i>
                {noOfFile} files
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-1">{moduleAnswer}</td>
            <td style={{ width: "200px" }} className="py-1">
              <ViewButton url={url} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function ViewButton({url}: {url:string}) {

  return (
    <div className="d-flex w-100">
      <div className="d-flex w-75">
        <div className="text-center w-100 py-2"></div>
      </div>
      <div>
        <Link
          href={url}
          type="button"
          className="btn btn-outline-success"
        >
          <i className="material-icons">visibility</i>
        </Link>
      </div>
    </div>
  );
}
