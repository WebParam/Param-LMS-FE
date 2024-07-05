"use client";
import Pagination from "@/app/components/Pagination";
import Table from "@/components/course/[id]/knowledge-modules/videos/Table";
import { useState } from "react";

const Body = ({ params }: { params: { moduleId: string } }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMSPERPAGE = 5;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const list = [
    {
      id: "dfagshjgfadssa",
      name: "Software Techonology",
      description: "Software Techonology",
      noOfVideoLinks: 2,
      noOfParapharases: 10,
    },
  ];

  const currentItems =
    list && list.length > 0
      ? list.slice(indexOfFirstItem, indexOfLastItem)
      : [];

  return (
    <>
      <div className="page-separator my-4">
        <div className="page-separator__text">Videos</div>
      </div>

      <div className="card mt-3 mb-3">
        <Table list={currentItems} />
      </div>

      <div className="card mb-0">
        <Pagination
          listLength={list?.length}
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
