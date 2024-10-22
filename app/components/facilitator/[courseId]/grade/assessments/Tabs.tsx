"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import Cookies from "universal-cookie";

export default function Tabs() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const status = searchParams.get("status");
  const cookies = new Cookies();
  const loggedInUser = cookies.get("param-lms-user");

  const facilitatorLinks = [
    {
      title: "All",
      status: `all`,
    },
    {
      title: "Available",
      status: `available`,
    },
    {
      title: "In Progress",
      status: `inProgress`,
    },
    {
      title: "Pending Moderation",
      status: `pendingModeration`,
    },
    {
      title: "Moderated",
      status: `moderated`,
    },
  ];

  const moderatorLinks = [
    {
      title: "Pending Moderation",
      status: `pendingModeration`,
    },
    {
      title: "Moderated",
      status: `moderated`,
    },
  ];

  const links =
    loggedInUser.role === "Facilitator" ? facilitatorLinks : moderatorLinks;

  return (
    <>
      <div className="card p-relative mb-3 position-relative">
        <div
          className="card-header card-header-tabs-basic nav px-0"
          role="tablist"
        >
          {links.map((l: any) => (
            <Link
              className={status === l.status ? "active" : ""}
              href={`${pathname}?status=${l.status}`}
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
