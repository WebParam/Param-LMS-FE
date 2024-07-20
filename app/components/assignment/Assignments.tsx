"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
export default async function Assignments({ list }: any) {

const baseUrl = "/protected/admin/"
  const pathName = usePathname();
  const pageUrl = pathName === "/protected/admin/moderator/pages/assignments" ? `${baseUrl}/moderator/pages/assignments` :  pathName === "/protected/admin/moderator-feedback/pages/assignments" ? `${baseUrl}/moderator-feedback/pages/assignments` :  `${baseUrl}/assessments-assignments/pages/assignments`
  const homeTitle = "homeTitle=Mark Assignments";
  const buttonTitle = "button-title=Assignments"
  return (
    <>
      <div className="page-section bg-alt border-top-2">
        <div className="container-fluid page__container page__container">
          <div className="row card-group-row">
            {list &&
              list.map((assignment: any) => (
                <Assignment
                  key={assignment.id}
                  imgUrl={assignment.avatar}
                  title="Formative Extended Assignment"
                  url={`${pageUrl}/${assignment.id}/grade-assignment?assessment-name=Formative Extended Assignment&${homeTitle}&title=Formative Extended Assignment&${buttonTitle}`}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

const Assignment = ({
  imgUrl,
  url,
  title,
}: {
  imgUrl: string;
  url: string;
  title: string;
}) => {
  return (
    <div className="col-lg-3 card-group-row__col">
      <div className="card card-group-row__card">
        <Link href={url} className="d-block mb-16pt">
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ height: "200px", border: "2px" }}
          >
            <p
              className="bg-success d-flex align-items-center justify-content-center font-size-32pt font-weight-bold"
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
              <h6 
              className="card-title m-0 mb-2">
                <a href={url}>{title}</a>
              </h6>
              <h6
                   style={{fontSize:"10px"}}
              className=" m-0">
                <a href={url}>Assigned by : MS Khululeka</a>
              </h6>
              <h6
                   style={{fontSize:"10px"}}
              className=" m-0">
                <a href={url}>At : 12 July 2023</a>
              </h6>
              <h6
                   style={{fontSize:"10px"}}
              className=" m-0">
                <a href={url}>Due : 5 August 2023</a>
              </h6>
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
