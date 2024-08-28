"use client";
import Pagination from "@/app/components/Pagination";
import Table from "@/components/course/[id]/modules/paraphrase-document/Table";
import { useState } from "react";
import list from "@/components/course/[id]/modules/paraphrase-document/data";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import MyVerticallyCenteredModal from "@/components/course/[id]/modules/paraphrase-document/Modal";
import { useRouter } from "next/navigation";

const Body = () => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState<boolean>(false);
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
  const nextUrl =
    arrUrl.join("/") +
    `/confirm-audio?courseId=${courseId}&title=${title}&step=2`;

  return (
    <>
      <div className="card mt-3 mb-3">
        <Table list={currentItems!} />
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
            className="btn btn-success"
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
