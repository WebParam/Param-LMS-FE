"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Tabs({ id }: { id: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const role = searchParams.get("role");

  const baseUrl = `/protected/home/users/${id}`;
  const links = [
    {
      name: "Edit User Info",
      path: baseUrl,
      url: `${baseUrl}`,
    },
    {
      name: "Manage Courses",
      path: `${baseUrl}/manage-courses`,
      url: `${baseUrl}/manage-courses`,
    },
  ];

  return (
    <div className="card-header card-header-tabs-basic nav px-0" role="tablist">
      {links.map((l: any) => (
        <Link
          key={l.id}
          className={pathname === l.path ? "active" : ""}
          href={`${l.url}?pageTitle=${l.name}&role=${role}`}
        >
          <span className="flex d-flex flex-column">
            <strong className="card-title">{l.name}</strong>
          </span>
        </Link>
      ))}
    </div>
  );
}
