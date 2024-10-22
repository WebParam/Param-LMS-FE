"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LogbookDoc from "@/components/logbook/LogbookDoc";
import Cookies from "universal-cookie";
import { ICourseLogbook } from "@/app/interfaces/logbook";
import { addCourseLogbook, getCourseLogbooksByCourse } from "@/app/lib/actions/logbook";
import { rLogbookUrl } from "@/app/lib/actions/endpoints";

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
  const [logbooks, setLogbooks] = useState<ICourseLogbook[]>([]);
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
            url={`${rLogbookUrl}/CourseLogbooks/PreviewDocument/${logbook.id}`} 
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
