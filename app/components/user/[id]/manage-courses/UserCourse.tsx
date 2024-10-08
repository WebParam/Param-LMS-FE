"use client";
import Modal from "react-bootstrap/Modal";
import { usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

function UserCourse({ data }: { data: any }) {
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "";
  const refreshId = searchParams.get("refreshId") || "";
  const [viewQuizModal, setViewQuestionModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpenEditModal(false);
    setDeleteModal(false);
  }, [refreshId]);

  return (
    <div className="col-lg-3 card-group-row__col">
      <div className="card card-group-row__card">
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "200px", border: "2px", position: "relative" }}
        >
          <input
            style={{ position: "absolute", right: "15px", top: "15px" }}
            type="checkbox"
            name=""
            id=""
          />
          <p
            className="bg-success d-flex align-items-center justify-content-center font-size-32pt font-weight-bold"
            style={{
              borderRadius: "50%",
              width: "130px",
              height: "130px",
              color: "white",
            }}
          >
            {data.title && titleShort(data.title)}
          </p>
        </div>

        <div className="d-flex p-16pt">
          <div className="d-flex flex-column flex">
            <div className="posts-card-popular__title card-body">
              <small className="text-muted text-uppercase">blog</small>
              <h4 className="card-title m-0">
                <div>{data.title}</div>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserCourse;

const titleShort = (title: string) => {
  const strArr = title.split(" ");

  if (strArr.length > 1 && strArr[1][0])
    return strArr[0][0].toUpperCase() + strArr[1][0].toUpperCase();
  return strArr[0][0].toUpperCase();
};
