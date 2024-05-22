"use client";
import Pagination from "@/app/components/Pagination";
import Table from "@/components/course/[id]/modules/confirm-audio/Table";
import list from "@/components/course/[id]/modules/confirm-audio/data";
import { useState } from "react";

const Body = ({params}: {params: {moduleId: string}}) => {
  const id = params.moduleId;
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMSPERPAGE = 5;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);



  return (
    <>
      <div className="page-separator mb-4">
        <div className="page-separator__text">Audios - Module ID({id})</div>
      </div>

      <div className="card mt-3 mb-3">
        <Table list={currentItems} />
      </div>

      <div className="card mb-24pt">
        <Pagination
          listLength={list.length}
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
