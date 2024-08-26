"use client";
import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/analytics/tables/grouped-analytics/Table";
import { useEffect, useState } from "react";
import { getCourseTableAnalytics } from "@/app/lib/actions/course";
import data from "./data";

const Body = ({ params }: { params: { id: string } }) => {
  const [list, setList] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMSPERPAGE = 6;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);

  const fetchAnalytics = async () => {
    const data = await getCourseTableAnalytics("66433416a454f78732f274ba");
    //   setList(data);
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <>
      <div data-aos="flip-down" className="card mb-0">
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
