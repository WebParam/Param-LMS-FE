"use client";
import Pagination from "@/app/components/Pagination";
import Table from "@/components/course/[id]/knowledge-modules/knowledge-topics/Table";
import { useState } from "react";
import KnowlegeTopicAdd from "@/components/course/[id]/knowledge-modules/knowledge-topics/KnowlegeTopicAdd";
import CreateKnowledgeTopicModal from "@/components/course/[id]/knowledge-modules/knowledge-topics/CreateKnowledgeTopicModal";

const Body = ({ params }: { params: { id: string; moduleId: string } }) => {
  const list = [
    {
      id: "dfagshjgfadssa",
      name: "Software Techonology",
      description: "Software Techonology",
      noOfConfirmedParapharases: 2,
      noOfParapharases: 10,
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMSPERPAGE = 4;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const currentItems =
    list && list.length > 0
      ? list.slice(indexOfFirstItem, indexOfLastItem)
      : [];

  const [showCreateTopic, setShowCreateTopic] = useState(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      <CreateKnowledgeTopicModal
        show={openModal}
        onHide={() => {
          setOpenModal(false);
        }}
      />

      <div className="page-separator my-4">
        <div className="page-separator__text">Knowledge Topics</div>
      </div>
      <div className="card mb-3 d-flex flex-row p-2 justify-content-end">
        <div className="mx-1">
          {showCreateTopic ? (
            <button
              className="btn btn-success btn-block"
              onClick={() => setShowCreateTopic(false)}
            >
              Hide Create Knowledge Topic
            </button>
          ) : (
            <button
              className="btn btn-success btn-block"
              onClick={() => setShowCreateTopic(true)}
            >
              Add Knowledge Topic
            </button>
          )}
        </div>
        <div className="mx-1">
          <button
            className="btn btn-success btn-block"
            onClick={() => setOpenModal(true)}
          >
            Add Knowledge Topic Modal
          </button>
        </div>
      </div>

      {showCreateTopic && <KnowlegeTopicAdd />}

      <div className="card mt-3 mb-3">
        <Table list={currentItems} />
      </div>

      <div className="card mb-0">
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
