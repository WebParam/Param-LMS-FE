"use client";
import Pagination from "@/app/components/Pagination";
import Table from "./(components)/Table";
import { useEffect, useState } from "react";
import list from "./(components)/data";
import { getCourseStudents } from "@/app/lib/actions/courseStudents";
import { CourseApplicants } from "@/app/interfaces/courseApplicants";
import Loading from "./loading";

const Body = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMSPERPAGE = 6;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const [data, setData] = useState<CourseApplicants[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const asyncFetch = async () => {
      try {
        const fetchedData = await getCourseStudents('6669f0ff8759b480859c10a7');
        debugger;
        setData(fetchedData);
        console.log('data is here', fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    asyncFetch();
  }, []);

  if (loading) {
    return <Loading />; 
  }

  return (
    <>
      <div className="card mb-0">
        <div
          className="table-responsive"
          data-toggle="lists"
          data-lists-sort-by="js-lists-values-employee-name"
          data-lists-values='["js-lists-values-employee-name", "js-lists-values-employer-name", "js-lists-values-projects", "js-lists-values-activity", "js-lists-values-earnings"]'
        >
          <Table list={data} />
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
