"use client";
import Pagination from "@/app/components/Pagination";
import Table from "./Table";
import { useEffect, useState } from "react";
import { AnalyticsApi } from "@/app/lib/restapi/endpoints/analytics.api";
import { IStudentQuizAnalytics } from "@/app/interfaces/analytics";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import {saveStudentQuizAnalytics, selectStudentQuizAnalytics } from "@/app/redux/courseAnalyticSlice";

const Body = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [list, setList] = useState<IStudentQuizAnalytics[]>([])
  const studentQuizAnalytics = useSelector(selectStudentQuizAnalytics);
  const ITEMSPERPAGE = 6;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const currentItems = studentQuizAnalytics?.length > 0 ? studentQuizAnalytics?.slice(indexOfFirstItem, indexOfLastItem) : list.slice(indexOfFirstItem, indexOfLastItem)
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const studentNumber = searchParams.get("id")!;

  const getQuizData = async () => {
    if (studentQuizAnalytics?.length > 0) {
      return
    }
    const getAnalytics = await AnalyticsApi.GET_StudentQuizAnalytics(studentNumber, "65e5d75f6944453739f276c3");
    if (getAnalytics[0]?.error === false) {
      const data = getAnalytics?.map((data: any) => data.data);
      dispatch(saveStudentQuizAnalytics(data));
      setList(data)
    }
  };

  useEffect(() => {
    getQuizData()
  }, [])

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
        listLength={studentQuizAnalytics.length > 0 ? studentQuizAnalytics.length! : list.length!}
        indexOfLastItem={indexOfLastItem}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        ITEMSPERPAGE={ITEMSPERPAGE}
      />
    </>
  );
};

export default Body;
