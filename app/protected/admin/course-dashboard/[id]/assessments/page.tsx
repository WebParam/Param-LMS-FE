"use client";
import Pagination from "@/app/components/Pagination";
import Table from "./Table";
import { useEffect, useState } from "react";
import { Api } from "@/app/lib/restapi/endpoints";
import { IStudentAssessmentAnalytic } from "@/app/interfaces/analytics";
import { useDispatch, useSelector } from "react-redux";
import { saveStudentAssessmentAnalytics, selectStudentAssessmentAnalytics } from "@/app/redux/courseAnalyticSlice";
import { useSearchParams} from "next/navigation";

const Body = () => {
  const [currentPage, setCurrentPage] = useState(1);
   const [list, setList] = useState<IStudentAssessmentAnalytic[]>([])
   const studentAssessmentAnalytics = useSelector(selectStudentAssessmentAnalytics);
  const ITEMSPERPAGE = 6;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const currentItems = studentAssessmentAnalytics.length > 0 ? studentAssessmentAnalytics.slice(indexOfFirstItem, indexOfLastItem) : list.slice(indexOfFirstItem, indexOfLastItem)
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const studentNumber = searchParams.get("id")!;

  const getAssessmentData = async () => {
    if(studentAssessmentAnalytics.length > 0){
      return
    }
    const getAnalytics = await Api.GET_StudentAssessmentAnalytics("65e5d75f6944453739f276c3", studentNumber);
    if (getAnalytics[0]?.error === false) {
      const data = getAnalytics?.map((data: any) => data.data);
      dispatch(saveStudentAssessmentAnalytics(data));
      setList(data)
    }
  };


  useEffect(() => {
    getAssessmentData();
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
