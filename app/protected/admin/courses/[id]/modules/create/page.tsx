"use client";
import Pagination from "@/app/components/Pagination";
import Table from "@/components/course/[id]/modules/create/Table";
import { ChangeEvent, useRef, useState } from "react";
import list from "@/components/course/[id]/modules/create/data";

const Body = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMSPERPAGE = 7;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const currentItems = files.slice(indexOfFirstItem, indexOfLastItem);
  const ref = useRef(null);


  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;

    if (selectedFiles) {
      const fileList = Array.from(selectedFiles);
      setFiles(fileList.map((file: File) => file.name));
    }
  };

  return (
    <>
      <div className="card mb-3">
        <input
          type="file"
          hidden
          ref={ref}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            handleFileSelect(event)
          }
          multiple
        />
        <button
          className="btn btn-success btn-block"
          onClick={() => ref?.current?.click()}
        >
          Add Files
        </button>
      </div>

      <div className="card mt-3 mb-3">
        <Table list={currentItems} />
      </div>

      <div className="card mb-0">
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