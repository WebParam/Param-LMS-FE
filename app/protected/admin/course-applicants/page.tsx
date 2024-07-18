"use client";
import Pagination from "@/app/components/Pagination";
import Table from "./(components)/Table";
import { useEffect, useState } from "react";
import list from "./(components)/data";
import { getCourseStudents } from "@/app/lib/actions/courseStudents";
import { CourseApplicants } from "@/app/interfaces/courseApplicants";
import Loading from "./loading";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';



const Body = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMSPERPAGE = 6;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const [data, setData] = useState<CourseApplicants[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const cookies = new Cookies();

  useEffect(() => {
    const asyncFetch = async () => {
      try {
        const fetchedData = await getCourseStudents('6669f0ff8759b480859c10a7');
        debugger;
        setData(fetchedData);
        const courseTitle = fetchedData[0].title;
        console.log('data is here', courseTitle);
        cookies.set("courseTitle", courseTitle);
        router.push(`/protected/admin/course-applicants?courseTitle=${courseTitle}`);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    asyncFetch();
  }, []);

  const courseId ='6669f0ff8759b480859c10a7';
  
  function downloadAsXls() {
    fetch(`https://khumla-dev-user-read.azurewebsites.net/api/Student/ExportStudentInformation/${courseId}`)
      .then(response => response.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.onload = (event:any) => {
          const data = event.target.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const xlsData = XLSX.utils.sheet_to_json(worksheet);
          const newWorkbook = XLSX.utils.book_new();
          const newWorksheet = XLSX.utils.json_to_sheet(xlsData);
          XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, 'Sheet1');
          const xlsArray = XLSX.write(newWorkbook, { bookType: 'xlsx', type: 'array' });
          const xlsBlob = new Blob([xlsArray], { type: 'application/octet-stream' });
          saveAs(xlsBlob, 'students.xlsx');
        };
        reader.readAsBinaryString(blob);
      })
      .catch(error => console.error('Error downloading XLS file:', error));
  }

  if (loading) {
    return <Loading />; 
  }

  return (
    <>
      <div className="card mb-0">
        <div
          className="table-responsive"
          data-toggle="lists"
          data-lists-sort-by="js-lists-values-employee-name"
          data-lists-values='["js-lists-values-employee-name", "js-lists-values-employer-name", "js-lists-values-projects", "js-lists-values-activity", "js-lists-values-earnings"]'
        >
          {data ? <Table list={data} /> : <h3 style={{textAlign:'center', height:'50px', lineHeight:'50px'}}>No data</h3>}
        </div>

        <Pagination
          listLength={list.length}
          indexOfLastItem={indexOfLastItem}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          ITEMSPERPAGE={ITEMSPERPAGE}
        />
      </div>
      <button 
        className="btn btn-primary enrolBtn m-3" 
        onClick={downloadAsXls}
        style={{cursor:'pointer'}}
      >
        Download As XLS
      </button> 
    </>
  );
};

export default Body;
