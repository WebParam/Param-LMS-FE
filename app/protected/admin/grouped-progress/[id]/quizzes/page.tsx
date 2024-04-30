"use client";
import Pagination from "@/app/components/Pagination";
import Table from "./Table";
import { useEffect, useState } from "react";
import { AnalyticsApi } from "@/app/lib/restapi/endpoints/analytics.api";
import { IStudentQuizAverage } from "@/app/interfaces/analytics";
import { useDispatch, useSelector } from "react-redux";
import {
  saveStudentQuizAnalytics,
  selectStudentQuizAnalytics,
} from "@/app/redux/courseAnalyticSlice";

const Body = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMSPERPAGE = 6;
  const [list, setList] = useState<IStudentQuizAverage[]>([]);
  const studentQuizAnalytics = useSelector(selectStudentQuizAnalytics);
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const currentItems =
    studentQuizAnalytics?.length > 0
      ? studentQuizAnalytics?.slice(indexOfFirstItem, indexOfLastItem)
      : list.slice(indexOfFirstItem, indexOfLastItem);
  const dispatch = useDispatch();
  const creatingUserId = "65d74882251362b65ed82c2c";
  const courseId = "65e5d75f6944453739f276c3";
  const getQuizAverageData = async () => {
    if (studentQuizAnalytics?.length > 0) {
      return;
    }
    const getData = await AnalyticsApi.GET_StudentAverageQuizAnalytics(
      courseId,
      creatingUserId
    );
    if (getData[0]?.error === false) {
      const data = getData?.map((data: any) => data.data);
      dispatch(saveStudentQuizAnalytics(data));
      setList(data);
    }
  };

  useEffect(() => {
    getQuizAverageData();
  }, []);

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
        listLength={
          studentQuizAnalytics.length > 0
            ? studentQuizAnalytics.length!
            : list.length!
        }
        indexOfLastItem={indexOfLastItem}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        ITEMSPERPAGE={ITEMSPERPAGE}
      />
    </>
  );
};

export default Body;
