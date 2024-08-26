"use client";
import Table from "@/components/logbook/Table";
import { useEffect, useState } from "react";
import list from "@/components/logbook/data";
import {
  useParams,

  useSearchParams,
} from "next/navigation";

import CompaniesTable from "@/components/host-companies/CompaniesTable";
import mockData from "@/components/host-companies/data";
import CompaniesStudentsTable from "@/components/host-students/CompaniesStudentsTable";
import { studentPlacementData } from "@/components/host-students/data";

const Body = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const searchParams = useSearchParams();
  const refreshId = searchParams.get("refreshId");

  const [data, setData] = useState(list);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMSPERPAGE = 3;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const currentItems =
  data && data.length > 0
      ? data.slice(indexOfFirstItem, indexOfLastItem)
      : [];

   



  return (
    <>
  <div data-aos="flip-up">
        <CompaniesTable data={mockData} />
      </div>
     
    </>
  );
};

export default Body;
