"use client";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import CreateUserModal from "@/components/user/CreateUserModal";

export default function PageHeader() {
  const cookies = new Cookies();
  const loggedInUser = cookies.get("param-lms-user");
  const [openUserModal, setOpenUserModal] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const refreshId = searchParams.get("refreshId");

  useEffect(() => {
    setOpenUserModal(false);
  }, [refreshId]);

  return (
    <>
      <CreateUserModal
        show={openUserModal}
        onHide={() => {
          setOpenUserModal(false);
        }}
      />
      <div className="border-bottom-2 py-32pt position-relative z-1">
        <div className="container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left">
          <div className="flex d-flex justify-content-between flex-column flex-sm-row align-items-center mb-24pt mb-md-0">
            <div
              style={{ width: "850px" }}
              className="mb-24pt mb-sm-0 mr-sm-24pt"
            >
              <h2 className="mb-0">Users</h2>

              <ol className="breadcrumb p-0 m-0">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>

                <li className="breadcrumb-item active">Users</li>
              </ol>
            </div>
            <div>
              {loggedInUser && loggedInUser.role == "SuperAdmin" && (
                <button
                  className="btn btn-success"
                  onClick={() => setOpenUserModal(true)}
                >
                  Create User
                </button>
              )}
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
}
