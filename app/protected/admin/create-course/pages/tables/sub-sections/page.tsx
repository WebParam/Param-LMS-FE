"use client";
import Pagination from "@/app/components/Pagination";
import Table from "./Table";
import { useState } from "react";
import { documentNames } from "../../constant/index";
import MyVerticallyCenteredModal from "../../(components)/Modal";

const Body = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMSPERPAGE = 6;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const currentItems = documentNames?.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="card mb-0">
        <div
          className="table-responsive"
          data-toggle="lists"
          data-lists-sort-by="js-lists-values-employee-name"
          data-lists-values='["js-lists-values-employee-name", "js-lists-values-employer-name", "js-lists-values-projects", "js-lists-values-activity", "js-lists-values-earnings"]'
        >
          <div className="card mb-0">
            <MyVerticallyCenteredModal
              show={openModal}
              onHide={() => setOpenModal(false)}
            />
          </div>
          <Table viewModal={setOpenModal} list={currentItems!} />
        </div>

        <Pagination
          listLength={documentNames.length}
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
