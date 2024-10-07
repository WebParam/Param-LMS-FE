"use client";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import PageHeader from "@/components/user/[id]/PageHeader";
import { userData } from "@/components/user/data";

function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { id } = params;

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

  const user = userData.find((u) => (u.id = id)) || {};

  return (
    <>
      <PageHeader user={user} />

      <div className="container page__container page__container page-section">
        <div className="card p-relative o-hidden mb-3">
          <div
            className="card-header card-header-tabs-basic nav px-0"
            role="tablist"
          >
            {links.map((l: any) => (
              <Link
                key={l.id}
                className={pathname === l.path ? "active" : ""}
                href={`${l.url}?pageTitle=${l.name}`}
              >
                <span className="flex d-flex flex-column">
                  <strong className="card-title">{l.name}</strong>
                </span>
              </Link>
            ))}
          </div>
        </div>
        {children}
      </div>
    </>
  );
}

export default Layout;
