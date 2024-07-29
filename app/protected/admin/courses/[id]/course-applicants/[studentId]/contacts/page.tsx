"use client";
import Pagination from "@/app/components/Pagination";
import Table from "@/components/course/[id]/course-applicants/contacts/Table";
import { useState } from "react";
import list from "@/components/course/[id]/course-applicants/contacts/data";
import { useEffect } from "react";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { getStudentData } from "@/app/lib/actions/courseStudents";

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
  const date = new Date();

  const [data, setData] = useState([]);
  const isEnrolled = searchParams.get("isEnrolled");

  async function studentInformation() {
    const response = await getStudentData(studentId);
    setData(response);

  router.replace(
      `${pathname}?title=${title}&studentName=${studentName}&refreshId=${date}&isEnrolled=${isEnrolled}`,
      {
        scroll: false,
      }
    );
  }

  useEffect(() => {
    studentInformation();
  }, []);

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
