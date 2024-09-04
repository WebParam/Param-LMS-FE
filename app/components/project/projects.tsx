'use client';
import { getProjects } from "@/app/lib/actions/project";
import Link from "next/link";
import Cookies from "universal-cookie";
export default function Projects({list}:any) {
const cookies = new Cookies();
cookies.set("number-of-projects", list && list.length, { path: '/' });

  return (
    <>
      <div className="page-section bg-alt border-top-2">
        <div className="container-fluid page__container page__container">
          {list && list.length > 0 ? (
            <div className="row card-group-row ">
              {list.map((project: any) => (
                <Project
                  key={project.id}
                  imgUrl={project.logo}
                  title={project.programTitle??"NA"}
                  url={`/protected/admin/courses/${project.id}/course-applicants?title=${project.title}`}
                />
              ))}
            </div>
          ) : (
            <div className="card my-24pt text-center py-3">
              No Projects Available...
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const Project = ({
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
              style={{
                borderRadius: "50%",
                width: "130px",
                height: "130px",
                color: "white",
              }}
            >
              {title && titleShort(title)}
            </p>
          </div>
        </Link>

        <div className="d-flex p-16pt">
          <div className="d-flex flex-column flex">
            <div className="posts-card-popular__title card-body">
              <small className="text-muted text-uppercase">blog</small>
              <h4 className="card-title m-0">
                <a href={url}>{title}</a>
              </h4>
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
