"use client";
import Pagination from "@/app/components/Pagination";
import Table from "./Table";
import { useEffect, useState } from "react";
import { Api } from "@/app/lib/restapi/endpoints";
import { IStudentAssessmentAverage } from "@/app/interfaces/analytics";
import {
  saveStudentAssessmentAnalytics,
  selectStudentAssessmentAnalytics,
} from "@/app/redux/courseAnalyticSlice";
import { useDispatch, useSelector } from "react-redux";

const Body = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [list, setList] = useState<IStudentAssessmentAverage[]>([]);
  const studentAssessmentAnalytics = useSelector(
    selectStudentAssessmentAnalytics
  );
  const ITEMSPERPAGE = 6;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const currentItems =
    studentAssessmentAnalytics.length > 0
      ? studentAssessmentAnalytics.slice(indexOfFirstItem, indexOfLastItem)
      : list.slice(indexOfFirstItem, indexOfLastItem);
  const dispatch = useDispatch();

  const getAssessmentAverageData = async () => {
    if (studentAssessmentAnalytics.length > 0) {
      return;
    }
    const getData = await Api.GET_StudentAverageAssessmentAnalytics(
      "65e5d75f6944453739f276c3",
      "65d74882251362b65ed82c2c"
    );
    dispatch(saveStudentAssessmentAnalytics(getData));
    setList(getData);
  };

  useEffect(() => {
    getAssessmentAverageData();
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
          listLength={studentAssessmentAnalytics.length > 0 ? studentAssessmentAnalytics.length : list.length}
          indexOfLastItem={indexOfLastItem}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        ITEMSPERPAGE={ITEMSPERPAGE}
      />
    </>
  );
};

export default Body;
