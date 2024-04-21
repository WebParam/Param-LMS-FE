"use client";
import Pagination from "@/app/components/Pagination";
import Table from "./(components)/Table";
import { useEffect, useState } from "react";
import list from "./(components)/data";
import { IStudentAnalyticDetails } from "@/app/interfaces/analytics";
import { Api } from "@/app/lib/restapi/endpoints";

const Body = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [list, setList] = useState<IStudentAnalyticDetails[]>()
  const ITEMSPERPAGE = 6;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const currentItems = list?.slice(indexOfFirstItem, indexOfLastItem);

  const getData = async () => {
    const getAnalytics = await Api.GET_StudentAnalytics( "65e5d75f6944453739f276c3","65d74882251362b65ed82c2c");
    const data = getAnalytics?.map((data:any) => data.data);
    setList(data);
    console.log("Data",data);
  }





  useEffect(() => {
    getData();

   
    },[])

  return (
    <>
        <div className="card mb-0">
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
        </div>
    </>
  );
};

export default Body;
