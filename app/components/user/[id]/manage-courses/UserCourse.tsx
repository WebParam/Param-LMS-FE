"use client";
import Modal from "react-bootstrap/Modal";
import { usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

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

      <div className="card p-3 mt-3 mb-3 overflow-auto">
        <div className="d-flex justify-content-between">
          <div style={{ fontSize: "15px" }}>
            <div className="mb-0">
              <b>{data.title}</b>
            </div>
          </div>

          <div className="d-flex align-content-center">
            <input type="checkbox" name="" id="" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserCourse;
