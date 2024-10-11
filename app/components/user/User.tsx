"use client";
import Modal from "react-bootstrap/Modal";
import { usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import DeleteUserModal from "./DeleteUserModal";

function User({ data }: { data: any }) {
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "";
  const refreshId = searchParams.get("refreshId") || "";
  const [viewQuizModal, setViewQuestionModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const pathname = usePathname();
  let name = data.firstName + " " + data.lastName;
  if (name == "") name = "N/A";

  useEffect(() => {
    setDeleteModal(false);
  }, [refreshId]);

  return (
    <div key={data.id}>
      <Modal
        size="sm"
        centered
        show={viewQuizModal}
        onHide={() => setViewQuestionModal(false)}
        backdrop={false}
        keyboard={false}
      >
        <Modal.Body>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "#252525",
              gap: "15px",
            }}
          >
            <div className="spinner-grow text-primary" role="status" />
            <p>loading preview...</p>
          </div>
        </Modal.Body>
      </Modal>

      <DeleteUserModal
        id={data.id}
        show={deleteModal}
        onHide={() => setDeleteModal(false)}
      />

      <div className="card p-3 mt-3 mb-3 overflow-auto">
        <div className="d-flex justify-content-between">
          <div style={{ fontSize: "15px" }}>
            <div className="d-flex" style={{ gap: "15px" }}>
              <div className="mb-0">
                <b>{name}</b>
              </div>
            </div>
            <div className="d-flex" style={{ gap: "15px" }}>
              <h6 className="mb-0">Email: {data.email}</h6>
              <h6 className="mb-0">Phone: {data.phoneNumber || "N/A"}</h6>
            </div>
          </div>
          <div>
            <div className="d-flex" style={{ gap: "15px" }}>
              <div className="">
                <button
                  type="button"
                  className="btn btn-outline-success btn-sm rounded-pill py-1 px-3 w-100"
                  style={{ height: "15px" }}
                >
                  {data.role == 0 && "Moderator"}
                  {data.role == 1 && "Facilitator"}
                </button>
              </div>

              <div className="d-flex" style={{ gap: "10px" }}>
                <Link href={`${pathname}/${data.userId}?pageTitle=Edit User Info&role=${data.role}`}>
                  <i className="material-icons icon-holder--outline-dark rounded-lg">
                    visibility
                  </i>
                </Link>
                <i
                  onClick={() => setDeleteModal(true)}
                  className="material-icons icon-holder--outline-dark rounded-lg"
                >
                  delete
                </i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default User;
