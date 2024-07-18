"use client";
import Pagination from "@/app/components/Pagination";
import Table from "@/components/course/[id]/modules/confirm-audio/Table";
import list from "@/components/course/[id]/modules/confirm-audio/data";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

const Body = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMSPERPAGE = 5;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);

  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const courseId = searchParams.get("courseId");
  const pathname = usePathname();
  const arrUrl = pathname.split("/");
  arrUrl.pop();
  const url = arrUrl.join("/");
  const nextUrl =
    url + `/upload-link?courseId=${courseId}&title=${title}&step=3`;
  const prevUrl =
    url + `/paraphrase-document?courseId=${courseId}&title=${title}&step=1`;

  return (
    <>
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

      <div className="card p-2">
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-success mx-1"
            onClick={() => router.replace(prevUrl)}
          >
            Previous
          </button>
          <button
            className="btn btn-success mx-1"
            onClick={() => router.replace(nextUrl)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Body;
