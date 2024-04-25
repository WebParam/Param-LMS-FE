"use client";
import Pagination from "@/app/components/Pagination";
import Table from "./Table";
import {useEffect, useState } from "react";
import {list} from "./data"
import { Api } from "@/app/lib/restapi/endpoints";
import { IStudentSectionAverage } from "@/app/interfaces/analytics";

const Body = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [list, setist] = useState<IStudentSectionAverage[]>([])
  const ITEMSPERPAGE = 6;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const currentItems = list?.slice(indexOfFirstItem, indexOfLastItem);

  const getSectionAverageData = async () => {
    const getData = await Api.GET_StudentAverageSectionAnalytics("65e5d75f6944453739f276c3","65d74882251362b65ed82c2c");
    setist(getData)
  }

  useEffect(() => {
    getSectionAverageData()
  },[])

  return (
    <>
        <div
          className="table-responsive"
          data-toggle="lists"
          data-lists-sort-by="js-lists-values-employee-name"
          data-lists-values='["js-lists-values-employee-name", "js-lists-values-employer-name", "js-lists-values-projects", "js-lists-values-activity", "js-lists-values-earnings"]'
        >
          <Table list={currentItems!} />
        </div>

        <Pagination
          listLength={list?.length!}
          indexOfLastItem={indexOfLastItem}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          ITEMSPERPAGE={ITEMSPERPAGE}
        />
    </>
  );
};

export default Body;
