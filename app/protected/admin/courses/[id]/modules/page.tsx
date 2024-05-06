"use client";
import Module from "@/components/course/[id]/modules/Module";
import { useState } from "react";
import list from "@/components/course/[id]/modules/data";
import Pagination from "@/components/Pagination";
import { usePathname, useSearchParams } from "next/navigation";

function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMSPERPAGE = 4;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);

  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const courseId = searchParams.get("courseId");
  const pathname = usePathname();
  const arrUrl = pathname.split("/");
  arrUrl.pop();
  const url =
    arrUrl.join("/") + `/modules/edit?courseId=${courseId}&title=${title}`;

  return (
    <>
      <div className="page-separator">
        <div className="page-separator__text">Unit Standards</div>
      </div>
      {currentItems.map((data) => (
        <Module
          key={data.module_name}
          moduleName={data.module_name}
          moduleAnswer={data.module_answer}
          noOfFile={data.no_of_file}
          url={url}
        />
      ))}

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
}

export default Page;
