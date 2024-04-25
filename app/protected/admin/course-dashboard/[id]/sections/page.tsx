"use client";
import Pagination from "@/app/components/Pagination";
import Table from "./Table";
import { useEffect, useState } from "react";
import { IStudentSectionAnalyticDetails } from "@/app/interfaces/analytics";
import { Api } from "@/app/lib/restapi/endpoints";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams} from "next/navigation";
import { saveStudentSectionAnalytics, selectStudentSectionAnalytics } from "@/app/redux/courseAnalyticSlice";

const Body = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [list, setList] = useState<IStudentSectionAnalyticDetails[]>()
  const studentSectionnalytics = useSelector(selectStudentSectionAnalytics);
  const ITEMSPERPAGE = 6;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const currentItems = studentSectionnalytics?.length > 0 ? studentSectionnalytics?.slice(indexOfFirstItem, indexOfLastItem) : list?.slice(indexOfFirstItem, indexOfLastItem)
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const studentNumber = searchParams.get("id")!;

  const getSectionData = async () => {
   if(studentSectionnalytics.length > 0){
    return;
   }
   const getAnalytics = await Api.GET_StudentSectionAnalytics(studentNumber,"65e5d75f6944453739f276c3");
   if (getAnalytics[0]?.error === false) {
   console.log("  getAnalytics",  getAnalytics)
     const data = getAnalytics?.map((data: any) => data.data);
     dispatch(saveStudentSectionAnalytics(data));     
     setList(data)

   }
  };

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
          listLength={studentSectionnalytics.length > 0 ? studentSectionnalytics.length! : list?.length!}
          indexOfLastItem={indexOfLastItem}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          ITEMSPERPAGE={ITEMSPERPAGE}
        />
    </>
  );
};

export default Body;
