"use client";
import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';


function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const title = searchParams.get("title");
  const [pageTitle, setPageTitle] = useState<string>("");
  const [tabName, setTabName] = useState<string>("Pending")

  const pathname = usePathname();
  const router = useRouter();
  const homeTitle = "homeTitle=FACILITATOR DASHBOARD";
  const baseUrl = `/protected/admin/assessments-assignments/pages`;
  const buttonTitle = "button-title=Dashboard";

  
  const links = [
    {
      name: "Pending",
      path: `Pending`,
      url: `${baseUrl}/${pageTitle}?${pageTitle === "assessments" ? "title=Mark%20Assessments" : "title=Mark%20Assignments"}&page=grouped&homeTitle=Facilitator Dashboard&${buttonTitle}`
    },
    {
      name: "Completed",
      path: `Completed`,
      url: `${baseUrl}/${pageTitle}?${pageTitle === "assessments" ? "title=Mark%20Assessments" : "title=Mark%20Assignments"}&page=grouped&homeTitle=Facilitator Dashboard&${buttonTitle}`
    }
  ];

  useEffect(() => {
    if (title == "Mark Assessments") {
      setPageTitle("assessments");
      return;
    }
    setPageTitle("assignments");
  }, [title]);


  const chooseTask = () => {
    if(title == "Mark Assessments"){
      router.push(`${baseUrl}/assignments?title=Mark%20Assignments&${homeTitle}&page=grouped&${buttonTitle}`)
      return;
    }
    router.push(`${baseUrl}/assessments?title=Mark%20Assessments&${homeTitle}&page=grouped&${buttonTitle}`)

  }

  return (
    <>
      {page && (
        <div 
        data-aos="slide-left"
        className="card p-relative mb-2 position-relative">
          <div
            className="card-header card-header-tabs-basic nav px-0"
            role="tablist"
          >
        {links.map((l: any) => (
            <Link
            onClick={() => setTabName(l.path)}
              className={tabName === l.path ? "active" : tabName === l.path ? "active" : ""}
              href={l.url}
            >
              <span className="flex d-flex flex-column">
                <strong className="card-title">{l.name}</strong>
              </span>
            </Link>
          ))}   
          </div>
          <div
            className="card-header card-header-tabs-basic nav px-0 position-absolute right-0 mt-2 mr-2 top-10"
            role="tablist"
          >
     <Dropdown>
      <Dropdown.Toggle  variant="success" id="dropdown-basic">
        Choose Task
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={chooseTask} href="#/action-1">
        Assessments
        </Dropdown.Item>
        <Dropdown.Item onClick={chooseTask} href="#/action-2">Assignments</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

          
          </div>
        </div>
      )}
      {children}
    </>
  );
}

export default Layout;
