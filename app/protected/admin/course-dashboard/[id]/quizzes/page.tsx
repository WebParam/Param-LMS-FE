"use client";
import Pagination from "@/app/components/Pagination";
import Table from "./Table";
import { useEffect, useState } from "react";
import { Api } from "@/app/lib/restapi/endpoints";
import { IStudentQuizAnalytics } from "@/app/interfaces/analytics";

const Body = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [list, setList] = useState<IStudentQuizAnalytics[]>([])
  const ITEMSPERPAGE = 6;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);
  
  const getQuizData = async () => {
    const getAnalytics = await Api.GET_StudentQuizAnalytics("2024139517");
    const data = getAnalytics?.map((data:any) => data.data);
    setList(getAnalytics);
    console.log("Data",data);
  }

  useEffect(() => {
    getQuizData()
  },[])

  return (
    <>
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
    </>
  );
};

export default Body;
