"use client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Tabs() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const title = searchParams.get("title");

  const [tabName, setTabName] = useState<string>("Pending");
  const pathname = usePathname();
  const viewTabes =
    pathname == "/protected/admin/assessments-assignments/pages/assessments" ||
    pathname == "/protected/admin/assessments-assignments/pages/assignments";
  const router = useRouter();
  const baseUrl = `/protected/admin/assessments-assignments/pages`;

  const links = [
    {
      name: "Pending",
      path: `Pending`,
      url: `${baseUrl}/${
        page == "1" ? "assessments" : "assignments"
      }?title=${title}&page=${page}`,
    },
    {
      name: "Completed",
      path: `Completed`,
      url: `${baseUrl}/${
        page == "1" ? "assessments" : "assignments"
      }?title=${title}&page=${page}`,
    },
  ];
  return (
    <>
      {viewTabes && (
        <div className="card p-relative mb-2 position-relative">
          <div
            className="card-header card-header-tabs-basic nav px-0"
            role="tablist"
          >
            {links.map((l: any) => (
              <Link
                onClick={() => setTabName(l.path)}
                className={
                  tabName === l.path
                    ? "active"
                    : tabName === l.path
                    ? "active"
                    : ""
                }
                href={l.url}
              >
                <span className="flex d-flex flex-column">
                  <strong className="card-title">{l.name}</strong>
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
