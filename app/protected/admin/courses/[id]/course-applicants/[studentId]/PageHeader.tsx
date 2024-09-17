"use client";
import { useFlags } from "flagsmith/react";
import Link from "next/link";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Tabs {
  [id: string]: string;
}

export default function PageHeader() {
  const { id } = useParams<{ id: string }>();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const courseTitle = searchParams.get("title");
  const [isFreemium, setIsFreemium] = useState(false)
  const refreshId = searchParams.get("refreshId")!;
 // const isFreemium = flags.next_public_user.enabled && flags.next_public_user.value == true;
  const studentName = searchParams.get("studentName");
  const tabs = {
    profiles: "Student Profile",
    document: "Student Documents",
  } as Tabs;

  const tabName = pathname.split("/").at(-1) || "";

  // Check the environment variable
  const flags = useFlags(["next_public_user"]); // only causes re-render if specified flag values / traits change
  console.log("Flags: ", flags);

  const buttonText = isFreemium ? "Project Applicants" : "Course Applicants";

  
  useEffect(() => {
    const localValue = localStorage.getItem("isFreemium")!;
    const value = JSON.parse(localValue) ?? false;
    setIsFreemium(value);
  }, [refreshId]);

  return (
    <>
      <div className="border-bottom-2 py-32pt position-relative z-1">
        <div className="container page__container d-flex flex-column flex-md-row align-items-center text-center text-sm-left">
          <div
            className="flex d-flex justify-content-between flex-column flex-sm-row align-items-center mb-24pt mb-md-0"
          >
            <div
              style={{ width: "850px" }}
              className="mb-24pt mb-sm-0 mr-sm-24pt"
            >
              <h2 className="mb-0">
                {studentName} {" - " + tabs[tabName]}
              </h2>

              <ol className="breadcrumb p-0 m-0">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>

                <li className="breadcrumb-item active">
                  {studentName} {" - " + tabs[tabName]}
                </li>
              </ol>
            </div>
            <div>
              <Link
                className="btn btn-success"
                href={`/protected/admin/courses/${id}/course-applicants?title=${courseTitle}`}
              >
                {buttonText}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
