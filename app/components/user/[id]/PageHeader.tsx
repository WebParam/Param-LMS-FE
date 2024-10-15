"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getUser } from "@/app/lib/data/users";

export default function PageHeader({ userId }: { userId: string }) {
  const searchParams = useSearchParams();
  const pageTitle = searchParams.get("pageTitle");
  const role = searchParams.get("role");
  const refreshId = searchParams.get("refreshId");
  const [user, setUser] = useState<any>();

  let name = user?.firstName + " " + user?.lastName;
  if (name == "") name = "N/A";

  const getUserData = async () => {
    const user = await getUser(userId, parseInt(role || ""));
    setUser(user);
  };

  useEffect(() => {
    getUserData();
  }, [refreshId]);

  return (
    <>
      <div className="border-bottom-2 py-32pt position-relative z-1">
        <div className="container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left">
          <div className="flex d-flex justify-content-between flex-column flex-sm-row align-items-center mb-24pt mb-md-0">
            <div
              style={{ width: "850px" }}
              className="mb-24pt mb-sm-0 mr-sm-24pt"
            >
              {name && (
                <h2 className="mb-0">
                  {name} - {pageTitle}
                </h2>
              )}
              <ol className="breadcrumb p-0 m-0">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>

                <li className="breadcrumb-item active">
                  {name} - {pageTitle}
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
