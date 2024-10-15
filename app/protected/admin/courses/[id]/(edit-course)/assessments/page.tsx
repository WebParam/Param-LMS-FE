"use client";
import Pagination from "@/app/components/Pagination";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { IAssessment } from "@/app/interfaces/assessments";
import { getAssessments } from "@/app/lib/actions/assessments";
import Assessment from "@/components/course/[id]/knowledge-modules/assessments/Assessment";

const Body = ({ params }: { params: { id: string } }) => {
  const { id: courseId } = params;
  const searchParams = useSearchParams();
  const refreshId = searchParams.get("refreshId");
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [assessments, setAssessments] = useState<IAssessment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMSPERPAGE = 7;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const currentItems =
    assessments && assessments.length > 0
      ? assessments.slice(indexOfFirstItem, indexOfLastItem)
      : [];

  const fetchAssessments = async () => {
    const data = await getAssessments(courseId);
    setAssessments(data);
  };

  useEffect(() => {
    fetchAssessments();
    setOpenModal(false);
  }, [refreshId]);

  return (
    <>
      {currentItems.length > 0 ? (
        currentItems.map((data) => <Assessment data={data} />)
      ) : (
        <div className="card my-24pt text-center py-3">
          No Assessments Available...
        </div>
      )}
      <div className="card mb-0">
        <Pagination
          listLength={assessments?.length}
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
