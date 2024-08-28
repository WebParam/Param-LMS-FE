import SkeletonLoader from "./skeletonLoader";

export default function () {
 

  return (
    <div className="card table-responsive my-24pt">
      <table className="table table-flush table--elevated">
        <thead>
          <tr>
            <th>
              {" "}
              <SkeletonLoader width="50%" height="1.5em" />{" "}
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr></tr>
          <tr className="d-flex flex-column">
            <td className="py-2">
              <div>
                <h6>
                  <SkeletonLoader width="10%" height="1.5em" />
                </h6>
                <SkeletonLoader width="100%" height="1.5em" />{" "}
              </div>
            </td>
          </tr>
          <tr>
            <td className="py-2">
              <div>
                <h6>
                  {" "}
                  <SkeletonLoader width="10%" height="1.5em" />
                </h6>
              </div>
            </td>
          </tr>
          <tr className="d-flex flex-column">
            <td>
              <p className="d-flex justify-content-between align-items-center">
                <SkeletonLoader width="50%" height="2em" />
                <SkeletonLoader width="20%" height="2em" />

              </p>
              <p className="d-flex justify-content-between align-items-center">
                <SkeletonLoader width="50%" height="2em" />
                <SkeletonLoader width="20%" height="2em" />

              </p>
              <p className="d-flex justify-content-between align-items-center">
                <SkeletonLoader width="50%" height="2em" />
                <SkeletonLoader width="20%" height="2em" />

              </p>
            </td>
            <td
              style={{ width: "170px" }}
              className="py-1 d-flex flex-row align-items-center align-self-end"
            >
              <SkeletonLoader width="100%" height="2em" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}