"use client";
import Table from "@/components/logbook/Table";
import { useEffect, useState } from "react";
import list from "@/components/logbook/data";
import { useParams, useSearchParams } from "next/navigation";

import CompaniesTable from "@/components/analytics/tables/host-companies/CompaniesTable";
import mockData from "@/components/analytics/tables/host-companies/data";
import Graphs from "@/components/analytics/graphs/host-company/graphs";

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
    <Graphs/>
      <div >
        <CompaniesTable data={mockData} />
      </div>
    </>
  );
};

export default Body;
