"use client";
import { useState } from "react";
import SubmitForModeration from "./SubmitForModeration";
import Cookies from "universal-cookie";
import CloseModerationModal from "./CloseModerationModal";
import { useSearchParams } from "next/navigation";

export function Moderation() {
  const cookies = new Cookies();
  const loggedInUser = cookies.get("param-lms-user");
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const isModerator = loggedInUser.role === "Moderator";

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [closeModerationModal, setCloseModerationModal] =
    useState<boolean>(false);

  return (
    <>
      {" "}
      {status === "inProgress" && (
        <div
          data-aos="flip-up"
          className="card mb-3 d-flex flex-row p-2 justify-content-end"
        >
          {" "}
          <SubmitForModeration
            show={openModal}
            onHide={() => {
              setOpenModal(false);
            }}
          />
          <div className="mx-1">
            <button
              className="btn btn-success btn-block"
              onClick={() => {
                setOpenModal(true);
              }}
            >
              Submit for moderation
            </button>
          </div>
        </div>
      )}
      {isModerator && status === "pendingModeration" && (
        <div
          data-aos="flip-up"
          className="card mb-3 d-flex flex-row p-2 justify-content-end"
        >
          {" "}
          <CloseModerationModal
            show={closeModerationModal}
            onHide={() => {
              setCloseModerationModal(false);
            }}
          />
          <div className="mx-1">
            <button
              className="btn btn-success btn-block"
              onClick={() => {
                setCloseModerationModal(true);
              }}
            >
              Close Moderation
            </button>
          </div>
        </div>
      )}
      {isModerator && status === "moderated" && (
        <div
          data-aos="flip-up"
          className="card mb-3 d-flex flex-row p-2 justify-content-end"
        >
          {" "}
          <div className="mx-1">
            <button
              className="btn btn-success btn-block"
              onClick={() => alert("Donwloading...")}
            >
              Export Assessment
            </button>
          </div>
        </div>
      )}
    </>
  );
}
