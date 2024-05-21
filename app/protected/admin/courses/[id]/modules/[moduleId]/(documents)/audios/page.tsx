"use client";
import Pagination from "@/app/components/Pagination";
import Table from "@/components/course/[id]/modules/audios/Table";
import { ChangeEvent, useRef, useState, useEffect } from "react";
import list from "@/components/course/[id]/modules/documents/data";
import { useDispatch, useSelector } from "react-redux";
import { uploadFile } from "@/app/redux/filesSlice";

const Body = ({params}: {params: {moduleId: string}}) => {
  const id = params.moduleId;
  const reduxFiles = useSelector((state: any) => state.files.files);
  const [files, setFiles] = useState<File[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMSPERPAGE = 7;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const currentItems = files.slice(indexOfFirstItem, indexOfLastItem);
  const ref = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;

    if (selectedFiles) {
      const fileList = Array.from(selectedFiles);
      dispatch(uploadFile(fileList.map((file: File) => file)));
      setFiles(fileList.map((file: File) => file));
    }
  };

  useEffect(() => {
    if (reduxFiles[0] && reduxFiles[0].length > 0) {
      setFiles(reduxFiles[0].map((file: File) => file));
    }
  }, []);

  return (
    <>
      <div className="page-separator my-4">
        <div className="page-separator__text">Audios - Module ID({id})</div>
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