"use client";
import Pagination from "@/app/components/Pagination";
import Table from "./Table";
import { useEffect, useState } from "react";
import { IStudentAnalyticDetails, IStudentSectionAnalyticDetails } from "@/app/interfaces/analytics";
import { Api } from "@/app/lib/restapi/endpoints";

const Body = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [list, setList] = useState<IStudentSectionAnalyticDetails[]>()
  const ITEMSPERPAGE = 6;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const currentItems = list?.slice(indexOfFirstItem, indexOfLastItem);




  const getSectionData = async () => {
    const getAnalytics = await Api.GET_StudentSectionAnalytics( "65e5d75f6944453739f276c3","2024139517");
    const data = getAnalytics?.map((data:any) => data.data);
    setList(data);
    console.log("Data",data);
  }

  useEffect(() => {
    getSectionData()
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
