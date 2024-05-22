"use client";
import Module from "@/components/course/[id]/modules/Module";
import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import { usePathname, useSearchParams } from "next/navigation";
import { IUnitStandard } from "@/app/interfaces/unit-standard";
import { getModules } from "@/app/lib/actions/module";

function Page({ params }: { params: { id: string } }) {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMSPERPAGE = 4;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const [list, setList] = useState<IUnitStandard[]>([]);

  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);

  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const pathname = usePathname();
  const arrUrl = pathname.split("/");
  arrUrl.pop();

  const fetchModules = async () => {
    const modules = await getModules(params.id);
    setList(modules);
  };

  useEffect(() => {
    fetchModules();
  }, [params.id]);

  return (
    <>
      <div className="my-3"></div>

      {currentItems.map((data) => {
        const url =
          arrUrl.join("/") + `/modules/${data.id}/documents?title=${title}`;

        return (
          <Module
            key={data.id}
            moduleName={data.title}
            moduleAnswer={data.description}
            noOfFile={10}
            url={url}
          />
        );
      })}

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
