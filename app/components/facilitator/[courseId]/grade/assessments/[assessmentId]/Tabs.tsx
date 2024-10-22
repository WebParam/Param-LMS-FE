"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import Cookies from "universal-cookie";

export default function Tabs() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const cookies = new Cookies();

  const status = searchParams.get("status") as string;
  const assessmentName = searchParams.get("assessment-name") as string;
  const submitStatus = searchParams.get("submitStatus") as string;
  const loggedInUser = cookies.get("param-lms-user");

  const tabs: { [key: string]: any[] | any } = {
    all: [
      {
        title: "All",
        status: `all`,
      },
    ],
    available: [
      {
        title: "All",
        status: `all`,
      },
    ],
    inProgress: [
      {
        title: "All",
        status: `all`,
      },
      {
        title: "Pending",
        status: `pending`,
      },
      {
        title: "Graded",
        status: `graded`,
      },
    ],
    pendingModeration: {
      Facilitator: [
        {
          title: "All",
          status: `all`,
        },
        {
          title: "Graded",
          status: `graded`,
        },
      ],
      Moderator: [
        {
          title: "All",
          status: `all`,
        },
        {
          title: "Graded",
          status: `graded`,
        },
        {
          title: "Moderated",
          status: `moderated`,
        },
      ],
    },
    moderated: [
      {
        title: "All",
        status: `all`,
      },
    ],
  };

  const links =
    status === "pendingModeration"
      ? tabs[status][loggedInUser.role]
      : tabs[status];

  return (
    <>
      <div className="card p-relative mb-3 position-relative">
        <div
          className="card-header card-header-tabs-basic nav px-0"
          role="tablist"
        >
          {links.map((l: any) => (
            <Link
              className={submitStatus === l.status ? "active" : ""}
              href={`${pathname}?assessment-name=${assessmentName}&status=${status}&submitStatus=${l.status}`}
            >
              <span className="flex d-flex flex-column">
                <strong className="card-title">{l.title}</strong>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
