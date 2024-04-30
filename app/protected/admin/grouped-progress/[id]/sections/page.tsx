"use client";
import Pagination from "@/app/components/Pagination";
import Table from "./Table";
import { useEffect, useState } from "react";
import { AnalyticsApi } from "@/app/lib/restapi/endpoints/analytics.api";
import { IStudentSectionAverage } from "@/app/interfaces/analytics";
import {
  saveStudentSectionAnalytics,
  selectStudentSectionAnalytics,
} from "@/app/redux/courseAnalyticSlice";
import { useDispatch, useSelector } from "react-redux";

const Body = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [list, setList] = useState<IStudentSectionAverage[]>([]);
  const studentSectionnalytics = useSelector(selectStudentSectionAnalytics);
  const creatingUserId = "65d74882251362b65ed82c2c";
  const courseId = "65e5d75f6944453739f276c3";
  const ITEMSPERPAGE = 6;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const currentItems =
    studentSectionnalytics?.length > 0
      ? studentSectionnalytics?.slice(indexOfFirstItem, indexOfLastItem)
      : list?.slice(indexOfFirstItem, indexOfLastItem);
  const dispatch = useDispatch();

  const getSectionAverageData = async () => {
    if (studentSectionnalytics.length > 0) {
      return;
    }
    const getData = await AnalyticsApi.GET_StudentAverageSectionAnalytics(
      courseId,
      creatingUserId
    );
    dispatch(saveStudentSectionAnalytics(getData));
    setList(getData);
  };

  useEffect(() => {
    getSectionAverageData();
  }, []);

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
        listLength={
          studentSectionnalytics.length > 0
            ? studentSectionnalytics.length!
            : list?.length!
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
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
