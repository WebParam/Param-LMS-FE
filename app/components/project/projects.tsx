"use client";
import { getProjects } from "@/app/lib/actions/project";
import { useEffect, useState } from "react";
import DeleteProjectModal from "./DeleteProjectModal";
import Link from "next/link";

export default function Projects() {
  const [list, setList] = useState<any[]>([]);

  const fetchProjects = async () => {
    try {
      const userId = localStorage.getItem("id");
      if (!userId) throw new Error("User ID not found in local storage.");

      const projects = await getProjects(userId);
      localStorage.setItem("number-of-projects", String(projects.length));
      setList(projects);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);


  return (
    <>
      <div className="page-section bg-alt border-top-2">
        <div className="container-fluid page__container page__container">
          {list.length > 0 ? (
            <div className="row card-group-row ">
              {list.map((project: any) => (
                <Project
                  id={project.id}
                  key={project.id}
                  imgUrl={project.logo}
                  title={project.programTitle ?? "NA"}
                  url={`/protected/admin/courses/${project.id}/course-applicants?title=${project.programTitle}`}
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
  id,
}: {
  imgUrl: string;
  url: string;
  title: string;
  id: string;
}) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="col-lg-3 card-group-row__col">
      <DeleteProjectModal
        id={id}
        show={openModal}
        onHide={() => setOpenModal(false)}
        title={title}
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

        <div className="d-flex p-16pt">
          <div className="d-flex flex-column flex">
            <div className="posts-card-popular__title card-body">
              <small className="text-muted text-uppercase">blog</small>
              <h4 className="card-title m-0">
                <a href={url}>{title}</a>
              </h4>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end position-relative ">
          <i
            onClick={() => setOpenModal(true)}
            className="material-icons text-success "
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              fontSize: "19px",
              cursor: "pointer",
            }}
          >
            delete
          </i>
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
