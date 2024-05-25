"use client";
import Pagination from "@/app/components/Pagination";
import Table from "@/components/course/[id]/modules/upload-link/Table";
import { useEffect, useState } from "react";
import { getParaphrases } from "@/app/lib/actions/paraphrase";

const Body = ({ params }: { params: { moduleId: string } }) => {
  const id = params.moduleId;
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMSPERPAGE = 5;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const currentItems =
    list && list.length > 0
      ? list.slice(indexOfFirstItem, indexOfLastItem)
      : [];

  const documentId = "76419588591c0dcb22cbe488";

  const fetchParaphrases = async () => {
    const response = await getParaphrases(documentId);
    setList(response);
  };

  useEffect(() => {
    fetchParaphrases();
  }, []);

  return (
    <>
      <div className="page-separator mb-4">
        <div className="page-separator__text">
          Video Links - Module ID({id})
        </div>
      </div>

      <div className="card mt-3 mb-3">
        <Table list={currentItems} />
      </div>

      <div className="card mb-24pt">
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
