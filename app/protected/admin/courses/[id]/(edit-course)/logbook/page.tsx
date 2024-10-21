"use client";
import Module from "@/components/course/[id]/modules/Module";
import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import { usePathname, useSearchParams } from "next/navigation";
import { IUnitStandard } from "@/app/interfaces/unit-standard";
import { getModules } from "@/app/lib/actions/module";
import LogbookDoc from "@/components/logbook/LogbookDoc";
import Cookies from "universal-cookie";
import { ICourseLogbook } from "@/app/interfaces/logbook";
import { addCourseLogbook, getCourseLogbooksByCourse } from "@/app/lib/actions/logbook";

interface LogbookData {
  id: number;
  title: string;
  url: string;
}

function Page({ params }: { params: { id: string } }) {
  const pathname = usePathname();
  const cookies = new Cookies();
  const loggedInUser = cookies.get("param-lms-user");
  const userId = loggedInUser.id;
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMSPERPAGE = 3;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const [logbooks, setLogbooks] = useState<ICourseLogbook[]>([]);
  const currentItems =
  logbooks && logbooks.length > 0
      ? logbooks.slice(indexOfFirstItem, indexOfLastItem)
      : [];
  const arrUrl = pathname.split("/");
  arrUrl.pop();

  useEffect(() => {
    fetchLogbooks();
  }, []);

  const fetchLogbooks = async () => {
    try {
      const response = await getCourseLogbooksByCourse(params.id);
      if (response.data) {
        setLogbooks(Array.isArray(response.data) ? response.data : [response.data]);
        console.log(logbooks);
      }
    } catch (error) {
      console.error("Error fetching logbooks:", error);
    }
  };

  const handleAddLogbook = async () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.pdf';
    fileInput.onchange = async (e) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append('UserId', userId);
        formData.append('CourseId', params.id);
        formData.append('FormFile', file);

        try {
          const response = await addCourseLogbook(formData);
          if (response.data) {
            setLogbooks([...logbooks, response.data]);
          }
        } catch (error) {
          console.error("Error adding logbook:", error);
        }
      }
    };
    fileInput.click();
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });
  }

  return (
    <>
      <div className="my-3"></div>
      {logbooks.length > 0 ? (
        logbooks.map((logbook) => (
          <LogbookDoc 
            key={logbook.id} 
            name={`Logbook ${formatDate(logbook.dateUpdated || "")}`} 
            url={logbook.logBookFileUrl} 
          />
        ))
      ) : (
        <>
          <div className="card my-24pt text-center py-3 text-muted">
            No Logbook Available...
          </div>
        </>
      )}
      <button className="btn btn-success w-100" onClick={handleAddLogbook}>Add Logbook</button>
    </>
  );
}

export default Page;
