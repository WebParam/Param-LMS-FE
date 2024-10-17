"use client";
import Pagination from "@/app/components/Pagination";
import Table from "./(components)/Table";
import { useEffect, useState } from "react";
import { ICourseAssessment } from "@/app/interfaces/assessments";
import { getStudentsAssessment } from "@/app/lib/actions/assessments";
import SubmitForModeration from "@/components/Assessment/SubmitForModeration";
import PageHeader from "@/components/PageHeaders/assessments/GradeAssessment/PageHeader";
import { getStudentSubmittedAssignments } from "@/app/lib/actions/assignments";
import { IStudentSubmittedAssignments } from "@/app/interfaces/assignment";
import { mockData } from "./(components)/data";

const Body = ({ params }: { params: { assignmentId: string } }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [list, setList] = useState<IStudentSubmittedAssignments[]>([]);
  const ITEMSPERPAGE = 6;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);
  const [loading, setLoading] = useState(true);

  const assignmentId = params.assignmentId;

  const getAssessments = async () => {
   
    const assignments = await getStudentSubmittedAssignments(assignmentId);
    setList(assignments || []);
    setLoading(false)

  };

  useEffect(() => {
    getAssessments();
  }, []);

  return (
    <>
      <PageHeader />

      <div className="container page__container page__container page-section">
        <SubmitForModeration
          show={openModal}
          onHide={() => {
            setOpenModal(false);
          }}
        />

        <div
          data-aos="flip-up"
          className="card mb-3 d-flex flex-row p-2 justify-content-end"
        >
          <div className="mx-1">
            <button
              className="btn btn-success btn-block"
              onClick={() => {
                setOpenModal(true);
              }}
            >
              Submit for moderation
            </button>
          </div>
        </div>
        <div data-aos="flip-up" className="card mb-0">
          <div
            className="table-responsive"
            data-toggle="lists"
            data-lists-sort-by="js-lists-values-employee-name"
            data-lists-values='["js-lists-values-employee-name", "js-lists-values-employer-name", "js-lists-values-projects", "js-lists-values-activity", "js-lists-values-earnings"]'
          >
            <Table loading = {loading} list={mockData} />
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
    </>
  );
};

export default Body;
