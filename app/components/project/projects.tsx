"use client";
import { getProjects } from "@/app/lib/actions/getProject";
import { useEffect, useState } from "react";
import DeleteProjectModal from "./DeleteProjectModal";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function Projects({ data }: any) {
  return (
    <>
      <div className="page-section bg-alt border-top-2">
        <div className="container-fluid page__container page__container">
          {data.length > 0 ? (
            <div className="row card-group-row ">
              {data.map((project: any) => (
                <Project
                  id={project.id}
                  key={project.id}
                  imgUrl={project.logo}
                  title={project.programTitle ?? "NA"}
                  url={`/protected/admin/courses/${project.id}/course-applicants?title=${project.programTitle}`}
                  editUrl={`/protected/home/projects/${project.id}?title=${project.programTitle}`}
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
  editUrl,
  title,
  id,
}: {
  imgUrl: string;
  url: string;
  editUrl: string;
  title: string;
  id: string;
}) => {
  const [openModal, setOpenModal] = useState(false);

  const handleDelete = () => {
    setOpenModal(false);
  };

  const router = useRouter();

  

  return (
    <div className="col-lg-3 card-group-row__col">
      <DeleteProjectModal
        id={id}
        show={openModal}
        onHide={() => setOpenModal(false)}
        title={title}
        onDelete={handleDelete}
      />
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

        <div className="d-flex justify-content-between p-16pt">
          <h4 className="card-title m-0">
            <a href={url}>{title}</a>
          </h4>
          <div>
            {" "}
            <Link href={editUrl}>
              <i className="material-icons">edit</i>
            </Link>
            <i onClick={() => setOpenModal(true)} className="material-icons">
              delete
            </i>
          </div>
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
