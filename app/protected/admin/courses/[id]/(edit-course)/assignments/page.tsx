"use client";
import Module from "@/components/course/[id]/modules/Module";
import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import { usePathname, useSearchParams } from "next/navigation";
import { IUnitStandard } from "@/app/interfaces/unit-standard";
import { getModules } from "@/app/lib/actions/module";
import AssignmentDoc from "@/components/assignment/AssignmentDoc";
import { uploadAssignment } from "@/app/lib/actions/assignments";
import Cookies from "universal-cookie";

interface AssignmentData {
  id: number;
  title: string;
  url: string;
}

function Page({ params }: { params: { id: string } }) {
  const pathname = usePathname();
  const courseId = params.id;
  const [currentPage, setCurrentPage] = useState(1);
  const cookies = new Cookies();
  const user = cookies.get("param-lms-user");
  const ITEMSPERPAGE = 3;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const [assignmentData, setAssignmentData] = useState<AssignmentData[]>([]);
  const currentItems =
    assignmentData && assignmentData.length > 0
      ? assignmentData.slice(indexOfFirstItem, indexOfLastItem)
      : [];
  const arrUrl = pathname.split("/");
  arrUrl.pop();

  const handleAddAssignment = async () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.onchange = (e) => {
        const target = e.target as HTMLInputElement;
        const file = target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target?.result;
          if (content) {
              const blobUrl = URL.createObjectURL(
              new Blob([content], { type: "text/plain" })
            );
   
            
            handleFileUpload(file)

          }
        };
        reader.readAsText(file);
      }
    };
    fileInput.click();
  };

  async function handleFileUpload(file:File) {
    const formData = new FormData();
    formData.append("courseId", courseId);
    formData.append("title", file.name);
    formData.append("description", "");
    formData.append("creatingUserId", user.id);
    formData.append("scheduledDate", new Date().toISOString());
    formData.append("isPublished", "true");
    formData.append("file", file);
    const uploadCourseAssignments = await uploadAssignment(formData);
    console.log("File Response",uploadCourseAssignments )
    setAssignmentData([
      ...assignmentData,
      { id: assignmentData.length + 1, title: file.name, url: URL.createObjectURL(new Blob([file], { type: "text/plain" })) },
    ]);
  }

  return (
    <>
      <div className="my-3"></div>
      {assignmentData.length > 0 ? (
        assignmentData.map((data) => {
          return (
            <AssignmentDoc key={data.id} name={data.title} url={data.url} />
          );
        })
      ) : (
        <>
          <div className="card my-24pt text-center py-3">
            No Assignment Available...
          </div>
          <button
            className="btn btn-success w-100"
            onClick={handleAddAssignment}
          >
            Add Assignment
          </button>
        </>
      )}
    </>
  );
}

export default Page;
