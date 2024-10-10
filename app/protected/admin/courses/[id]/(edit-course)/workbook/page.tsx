"use client";
import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import { usePathname, useSearchParams } from "next/navigation";
import { getPracticalModules } from "@/app/lib/actions/knowledge-module";
import {data} from './data';
import Workbook from "@/components/workbook/WorkBook";
function Page({ params }: { params: { id: string } }) {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMSPERPAGE = 4;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const [list, setList] = useState<any[]>(data);

  const currentItems =
    list && list.length > 0
      ? list.slice(indexOfFirstItem, indexOfLastItem)
      : [];

  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const refreshId = searchParams.get("refreshId");
  const pathname = usePathname();
  const arrUrl = pathname.split("/");
  arrUrl.pop();

  const fetchModules = async () => {
    const modules = await getPracticalModules(params.id);
    // setList(modules);
  };

  useEffect(() => {
    fetchModules();
  }, [refreshId]);

  const url =
    arrUrl.join("/") +
    `/knowledge-modules/dfadssfadsfa/knowledge-topics?title=${title}`;

  return (
    <>
      <div className="my-3"></div>

      {currentItems.length > 0 ? (
        currentItems.map((data) => {
          const url =
            arrUrl.join("/") +
            `#/practical-modules/${data.id}/Workbooks?title=${title}&moduleTitle=${data.title}`;

          return (
            <Workbook
              key={data.id}
              id={data.id}
              name={data.Title}
              moduleCode={data.WorkExperienceModuleCode}
              description={data.Description}
              url={url}
            />
          );
        })
      ) : (
        <div className="card my-24pt text-center py-3">
          No Workbook Available...
        </div>
      )}
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
}

export default Page;
