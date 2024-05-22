"use client";
import Pagination from "@/app/components/Pagination";
import Table from "@/components/course/[id]/modules/upload-link/Table";
import { useState } from "react";
import list from "@/components/course/[id]/modules/upload-link/data";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const Body = ({ params }: { params: { moduleId: string } }) => {
  const id = params.moduleId;
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMSPERPAGE = 5;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);

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
