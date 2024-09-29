"use client";
import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/analytics/tables/videos/[studentId]/Table";
import { useEffect, useState } from "react";
import { getCourseTableAnalytics, getStudentCourseVideoAnalytics } from "@/app/lib/actions/course";
import mockData from "@/app/components/analytics/tables/videos/[studentId]/data";
import { useSearchParams } from "next/navigation";

const Body = ({ params }: { params: { studentId: string } }) => {
  const studentId = params.studentId;
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId")!;
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMSPERPAGE = 6;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);

  const fetchAnalytics = async () => {
    const data = await getStudentCourseVideoAnalytics(
      courseId,
      studentId
    );
       setList(data);
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <>
      <div className="card mb-0">
        <div
          className="table-responsive"
          data-toggle="lists"
          data-lists-sort-by="js-lists-values-employee-name"
          data-lists-values='["js-lists-values-employee-name", "js-lists-values-employer-name", "js-lists-values-projects", "js-lists-values-activity", "js-lists-values-earnings"]'
        >
          <Table list={currentItems} />
        </div>

        <Pagination
          listLength={list.length}
          indexOfLastItem={indexOfLastItem}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          ITEMSPERPAGE={ITEMSPERPAGE}
        />
      </div>
    </>
  );
};

export default Body;
