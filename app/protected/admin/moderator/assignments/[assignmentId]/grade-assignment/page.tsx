"use client";
import Pagination from "@/app/components/Pagination";
import Table from "./(components)/Table";
import { useEffect, useState } from "react";
import { ICourseAssessment } from "@/app/interfaces/assessments";
import { getStudentsAssessment } from "@/app/lib/actions/assessments";
import SubmitForModeration from "@/components/Assessment/SubmitForModeration";
import PageHeader from "./PageHeader";

const Body = ({ params }: { params: { assignmentId: string } }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [list, setList] = useState<ICourseAssessment[]>([]);
  const ITEMSPERPAGE = 6;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);
  const assignmentId = params.assignmentId;

  const [loading, setLoading] = useState(true);


  const getAssessments = async () => {

    setLoading(true)

    const assessments = await getStudentsAssessment(assignmentId);
    setList(assessments);
    setLoading(false)



  };

  useEffect(() => {
    getAssessments();
  }, []);

  return (
    <>
      <SubmitForModeration
        show={openModal}
        onHide={() => {
          setOpenModal(false);
        }}
      />

      <div className="mdk-header-layout__content page-content ">
        <div className="mdk-header-layout__content page-content ">
          <PageHeader />

          <div className="container page__container page__container page-section">
            <div className="card mb-3 d-flex flex-row p-2 justify-content-end">
              <div className="mx-1">
                <button
                  className="btn btn-success btn-block"
                  onClick={() => setOpenModal(true)}
                >
                  Submit moderation feedback
                </button>
              </div>
            </div>
            <div className="card mb-0">
              <div className="">
                <div className="card mb-0">
                  <div className="table-responsive">
                    <Table  loading = {loading}list={currentItems} />
                  </div>

                  <Pagination
                    listLength={list.length}
                    indexOfLastItem={indexOfLastItem}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    ITEMSPERPAGE={ITEMSPERPAGE}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Body;
