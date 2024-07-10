"use client";
import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

interface HeaderTitlesProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function HeaderTitles({ setShowModal }: HeaderTitlesProps) {
  const searchParams = useSearchParams();
  const name = searchParams.get("title");

  const pathname = usePathname();
  const router = useRouter();
  
  const baseUrl = `/protected/admin/courses/${77}`;
  const links = [
    { name: "Students", path: baseUrl, url: `${baseUrl}?title=${name}`},
    { name: "Moderators", path: `${baseUrl}/modules`, url: `${baseUrl}/modules?title=${name}` },
    { name: "Facilitators", path: `${baseUrl}/modules`, url: `${baseUrl}/modules?title=${name}` },
  ];

  return (
    <>
      {/* button with create notification */}
      <div className="d-flex justify-content-center mb-3">
        <button onClick={() => setShowModal(prev => !prev)} className="btn btn-success" style={{ width: '190px' }}>Create Notification</button>
      </div>
      <div className="card p-relative o-hidden mb-0">
        <div
          className="card-header flex d-flex card-header-tabs-basic nav px-0"
          role="tablist"
        >
          {links.map((l: any) => (
            <Link
              className={`nav-link ${pathname === l.path ? "active" : ""} p-2`}
              href={l.url}
              key={l.name}
            >
              <span className="flex d-flex flex-column">
                <strong className="card-title">{l.name}</strong>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default HeaderTitles;
