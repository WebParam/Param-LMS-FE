"use client";
import Module from "@/components/course/[id]/modules/Module";
import { useState } from "react";
import list from "@/components/course/[id]/modules/data";
import Pagination from "@/components/Pagination";
import { usePathname, useSearchParams } from "next/navigation";

function Page({params}: {params: {id: string}}) {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMSPERPAGE = 4;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);

  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const pathname = usePathname();
  const arrUrl = pathname.split("/");
  arrUrl.pop();
  const url =
    arrUrl.join("/") + `/modules/${params.id}/documents?courseId=${params.id}&title=${title}`;

  return (
    <>
      <div className="my-3">
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
