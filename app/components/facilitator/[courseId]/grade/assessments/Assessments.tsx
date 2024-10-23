"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

export default function Assessments({ list }: any) {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const cookies = new Cookies();
  const loggedInUser = cookies.get("param-lms-user");

  const status = searchParams.get("status") || "";

  let filterAssessments = [];
  const statuses: any = {
    available: 0,
    inProgress: 1,
    pendingModeration: 2,
    moderated: 3,
  };

  if (status === "inProgress") {
    filterAssessments = list.filter(
      (assessment: any) =>
        assessment.status === statuses[status] &&
        assessment.facilitatorId === loggedInUser.id
    );
  } else if (status === "pendingModeration") {
    filterAssessments =
      loggedInUser.role === "Facilitator"
        ? list.filter(
            (assessment: any) => assessment.status === statuses[status]
          )
        : list.filter(
            (assessment: any) =>
              assessment.status === statuses[status] &&
              assessment.moderatorId === loggedInUser.id
          );
  } else if (status !== "all") {
    filterAssessments = list.filter(
      (assessment: any) => assessment.status === statuses[status]
    );
  }

  return (
    <>
      <div className="page-section bg-alt border-top-2">
        <div className="container-fluid page__container page__container">
          <div className="row card-group-row">
            {filterAssessments.length > 0 ? (
              filterAssessments.map((assessment: any) => (
                <Assessment
                  key={assessment.id}
                  title={assessment.title}
                  url={`${pathName}/${assessment.id}?assessment-name=${assessment.title}&status=${status}&submitStatus=all`}
                />
              ))
            ) : (
              <div className="card my-24pt w-100 text-center py-3">
                No Assessments Available...
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const Assessment = ({ url, title }: { url: string; title: string }) => {
  const [isFacilitator, setIsFacilitator] = useState(false);

  const pathName = usePathname();
  useEffect(() => {
    if (
      pathName ===
        `/protected/admin/assessments-assignments/pages/assessments` ||
      pathName === `/protected/admin/assessments-assignments/pages/assignments`
    ) {
      setIsFacilitator(true);
      return;
    }
    setIsFacilitator(false);
  }, [pathName]);

  return (
    <div className="col-lg-3 card-group-row__col">
      <div className="card card-group-row__card">
        <Link href={url} className="d-block mb-16pt">
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ height: "200px", border: "2px" }}
          >
            <p
              className="bg-success text-white d-flex align-items-center justify-content-center font-size-32pt font-weight-bold"
              style={{ borderRadius: "50%", width: "130px", height: "130px" }}
            >
              {title && titleShort(title)}
            </p>
          </div>
        </Link>

        <div className="d-flex p-16pt">
          <div className="d-flex flex-column flex">
            <div className="posts-card-popular__title card-body">
              <small className="text-muted text-uppercase">blog</small>
              <h6 className="card-title m-0 mb-2">
                <a href={url}>{title}</a>
              </h6>
              {!isFacilitator && (
                <>
                  <h6 style={{ fontSize: "10px" }} className=" m-0">
                    <a href={url}>Assigned by : MS Khululeka</a>
                  </h6>
                  <h6 style={{ fontSize: "10px" }} className=" m-0">
                    <a href={url}>At : 12 July 2023</a>
                  </h6>
                  <h6 style={{ fontSize: "10px" }} className=" m-0">
                    <a href={url}>Due : 5 August 2023</a>
                  </h6>
                </>
              )}
            </div>
          </div>
          <Link href={url}>
            <i className="material-icons text-50">more_horiz</i>
          </Link>
        </div>
      </div>
    </div>
  );
};

const titleShort = (title: string) => {
  const strArr = title.split(" ");

  if (strArr.length > 1 && strArr[1][0])
    return strArr[0][0].toUpperCase() + strArr[1][0].toUpperCase();
  return strArr[0][0].toUpperCase();
};
