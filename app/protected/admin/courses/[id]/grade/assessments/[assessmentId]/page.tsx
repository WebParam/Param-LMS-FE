"use client";
import Pagination from "@/app/components/Pagination";
import Table from "./(components)/Table";
import { useEffect, useState } from "react";
import { ICourseAssessment } from "@/app/interfaces/assessments";
import { getStudentsAssessment } from "@/app/lib/actions/assessments";
import SubmitForModeration from "@/components/Assessment/SubmitForModeration";
import PageHeader from "@/components/PageHeaders/assessments/GradeAssessment/PageHeader";

const Body = ({ params }: { params: { assessmentId: string } }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [list, setList] = useState<ICourseAssessment[]>([]);
  const ITEMSPERPAGE = 6;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);
  const [loading, setLoading] = useState(true);

  const assessmentId = params.assessmentId;

  const getAssessments = async () => {
   
    const assessments = await getStudentsAssessment(assessmentId);
    setList(assessments || []);
    setLoading(false)

  };

  useEffect(() => {
    getAssessments();
  }, []);

  const mockData: ICourseAssessment[] = [
    {
      assessmentId: "A1001",
      name: "John Doe",
      userId: "S1001",
      datesubmitted: "2023-03-01",
      factilitatorMark: 85,
      moderatorMark: 82,
      totalMark: 167
    },
    {
      assessmentId: "A1002",
      name: "Jane Smith",
      userId: "S1002",
      datesubmitted: "2023-03-02",
      factilitatorMark: 90,
      moderatorMark: 88,
      totalMark: 178
    },
    {
      assessmentId: "A1003",
      name: "Alice Johnson",
      userId: "S1003",
      datesubmitted: "2023-03-02",
      factilitatorMark: 75,
      moderatorMark: 70,
      totalMark: 145
    }
  ];


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
