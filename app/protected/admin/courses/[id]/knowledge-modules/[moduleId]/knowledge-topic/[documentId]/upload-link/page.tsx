"use client";
import Pagination from "@/app/components/Pagination";
import Table from "@/components/course/[id]/knowledge-modules/upload-link/Table";
import { useState } from "react";
import CreateTranscriptModal from "@/components/course/[id]/modules/upload-link/CreateTranscriptModal";

const Body = ({ params }: { params: { documentId: string } }) => {
  const list = [
    {
      id: "dfagshjgfadssa",
      title: "Introduction - Software Techonology",
      description: "Software Techonology",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMSPERPAGE = 5;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const currentItems =
    list && list.length > 0
      ? list.slice(indexOfFirstItem, indexOfLastItem)
      : [];

  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      <CreateTranscriptModal
        show={openModal}
        onHide={() => {
          setOpenModal(false);
        }}
      />

      <div className="page-separator mb-4">
        <div className="page-separator__text">Video Links</div>
      </div>

      <div className="card mt-3 mb-3">
        <Table list={currentItems} />
      </div>

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
};

export default Body;
