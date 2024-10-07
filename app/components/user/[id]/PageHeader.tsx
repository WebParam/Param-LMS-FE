"use client";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import CreateUserModal from "@/components/user/CreateUserModal";
import Link from "next/link";

export default function PageHeader({ user }: { user: any }) {
  const cookies = new Cookies();
  const loggedInUser = cookies.get("param-lms-user");
  const [openUserModal, setOpenUserModal] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageTitle = searchParams.get("pageTitle");
  const userName = searchParams.get("userName");
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
              <h2 className="mb-0">
                {user.name} - {pageTitle}
              </h2>

              <ol className="breadcrumb p-0 m-0">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>

                <li className="breadcrumb-item active">
                  {user.name} - {user.role}
                </li>
              </ol>
            </div>
            <div>
              <Link className="btn btn-success" href="/protected/home/users">
                Back to User
              </Link>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
}
