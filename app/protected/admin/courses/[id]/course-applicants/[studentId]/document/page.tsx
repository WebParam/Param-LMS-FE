"use client";
import Table from "@/components/course/[id]/course-applicants/document/Table";
import { useEffect, useState } from "react";
import list from "@/components/course/[id]/course-applicants/document/data";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { getStudentDocuments } from "@/app/lib/actions/courseStudents";

const Body = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMSPERPAGE = 6;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);
  const { studentId } = useParams<{ studentId: string }>();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const studentName = searchParams.get("studentName");
  const refreshId = searchParams.get("refreshId")
  const date = new Date();

  const [data, setData] = useState([]);

  async function studentInformation() {
    const response = await getStudentDocuments(studentId);
    setData(response);
    router.replace(
      `${pathname}?title=${title}&studentName=${studentName}&email=${response?.email}&refreshId=${date}`,
      {
        scroll: false,
      }
    )

    console.log("response",response)
  }

  useEffect(() => {
    studentInformation();
  }, [refreshId]);

  return (
    <>
      <div
        className="table-responsive"
        data-toggle="lists"
        data-lists-sort-by="js-lists-values-employee-name"
        data-lists-values='["js-lists-values-employee-name", "js-lists-values-employer-name", "js-lists-values-projects", "js-lists-values-activity", "js-lists-values-earnings"]'
      >
        <Table list={data} />
      </div>
    </>
  );
};

export default Body;
