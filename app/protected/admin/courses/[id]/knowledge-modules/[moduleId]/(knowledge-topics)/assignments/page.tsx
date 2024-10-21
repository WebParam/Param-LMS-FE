"use client";
import Module from "@/components/course/[id]/modules/Module";
import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import { usePathname, useSearchParams } from "next/navigation";
import { IUnitStandard } from "@/app/interfaces/unit-standard";
import { getModules } from "@/app/lib/actions/module";
import AssignmentDoc from "@/components/assignment/AssignmentDoc";
import {
  getAssignments,
  uploadAssignment,
} from "@/app/lib/actions/assignments";
import Cookies from "universal-cookie";
import { IAssignment } from "@/app/interfaces/assignment";
import EditAssignmentDoc from "@/components/assignment/EditAssignmentDoc";

function Page({ params }: { params: { id: string; moduleId: string } }) {
  const pathname = usePathname();
  const courseId = params.id;
  const moduleId = params.moduleId;
  const [currentPage, setCurrentPage] = useState(1);
  const cookies = new Cookies();
  const user = cookies.get("param-lms-user");
  const ITEMSPERPAGE = 3;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const [assignmentData, setAssignmentData] = useState<IAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState(false);
  const [fileTitle, setFileTitle] = useState<string>("");
  const searchParams = useSearchParams();
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
 const refreshId = searchParams.get("refreshId");
 const [docId, setDocId] = useState("");
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
                 setFileTitle(file.name)
            setSelectedFile(file);
            setEditModal(true); 
          }
        };
        reader.readAsText(file);
      }
    };
    fileInput.click();
  };



  const getKnowledgeModuleAssignments = async () => {
    setLoading(true);
    const fetchAssignments: IAssignment[] = await getAssignments(moduleId);
    setAssignmentData(fetchAssignments);
    console.log("fetchAssignments",fetchAssignments)
    setLoading(false);
  };
  useEffect(() => {
    getKnowledgeModuleAssignments();
  }, [refreshId]);

  return (
    <>
      <EditAssignmentDoc
        name={fileTitle}
        file={selectedFile}
        show={editModal}
        onHide={() => setEditModal(false)}
      />
      <div className="page-separator my-4">
        <div className="page-separator__text">Assignments</div>
      </div>
      <div className="my-3"></div>
      {assignmentData ? (
        assignmentData.map((data) => {
          return (
            <AssignmentDoc
            isPublished={data.isPublished}
              key={data.id}
              id ={data.id}
              name={data.title}
              desc={data.description}
              url={data?.blobUrl!}
            />
          );
        })
      ) : (
        <div className="card my-24pt text-center py-3">
          No Assignment Available...
        </div>
      )}

      <button
        disabled={loading}
        className={`btn ${loading ? "btn-secondary" : "btn-success"} w-100`}
        onClick={handleAddAssignment}
      >
        Add Assignment
      </button>
    </>
  );
}

export default Page;
