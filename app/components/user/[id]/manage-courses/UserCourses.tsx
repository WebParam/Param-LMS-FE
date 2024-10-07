"use client";
import { ICourse } from "@/app/interfaces/courses";
import Pagination from "@/app/components/Pagination";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import User from "@/components/user/User";
import UserCourse from "./UserCourse";

export default function UserCourses({ courses }: { courses: ICourse[] }) {
  const searchParams = useSearchParams();
  const refreshId = searchParams.get("refreshId");
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMSPERPAGE = 6;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const currentItems =
    courses && courses.length > 0
      ? courses.slice(indexOfFirstItem, indexOfLastItem)
      : [];

  useEffect(() => {
    setOpenModal(false);
  }, [refreshId]);

  return (
    <>
      {currentItems.length > 0 ? (
        currentItems.map((data) => <UserCourse data={data} />)
      ) : (
        <div className="card my-24pt text-center py-3">
          No Users Available...
        </div>
      )}

      <div className="card mb-3">
        <Pagination
          listLength={courses?.length}
          indexOfLastItem={indexOfLastItem}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          ITEMSPERPAGE={ITEMSPERPAGE}
        />
      </div>
      <div>
        <button className="btn btn-block btn-success">Update</button>
      </div>
    </>
  );
}
