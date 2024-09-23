"use client";
import Module from "@/components/course/[id]/modules/Module";
import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import { usePathname, useSearchParams } from "next/navigation";
import { IUnitStandard } from "@/app/interfaces/unit-standard";
import { getModules } from "@/app/lib/actions/module";
import LogbookDoc from "@/components/logbook/LogbookDoc";

interface LogbookData {
  id: number;
  title: string;
  url: string;
}

function Page({ params }: { params: { id: string } }) {
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMSPERPAGE = 3;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const [logbookData, setLogbookData] = useState<LogbookData[]>([]);
  const currentItems =
  logbookData && logbookData.length > 0
      ? logbookData.slice(indexOfFirstItem, indexOfLastItem)
      : [];
  const arrUrl = pathname.split("/");
  arrUrl.pop();


  const handleAddLogbook = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result;
          if (content) {
            const blobUrl = URL.createObjectURL(new Blob([content], {type: "text/plain"}));
            setLogbookData([...logbookData, { id: logbookData.length + 1, title: file.name, url: blobUrl }]);
          }
        };
        reader.readAsText(file);
      }
    };
    fileInput.click();
  };

  return (
    <>
      <div className="my-3"></div>
      {logbookData.length > 0 ? (
        logbookData.map((data) => {
          return <LogbookDoc key={data.id} name={data.title} url={data.url} />;
        })
      ) : (
        <>
          <div className="card my-24pt text-center py-3">
            No Logbook Available...
          </div>
          <button className="btn btn-success w-100" onClick={handleAddLogbook}>Add Logbook</button>
        </>
      )}

    
    </>
  );
}

export default Page;

