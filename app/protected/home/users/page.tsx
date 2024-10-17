"use client";
import Pagination from "@/app/components/Pagination";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import PageHeader from "@/components/user/PageHeader";
import { userData } from "@/components/user/data";
import User from "@/components/user/User";
import { getUsers } from "@/app/lib/data/users";

const Body = ({ params }: { params: { id: string } }) => {
  const { id: courseId } = params;
  const searchParams = useSearchParams();
  const refreshId = searchParams.get("refreshId");
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [users, setUsers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMSPERPAGE = 6;
  const indexOfLastItem = currentPage * ITEMSPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMSPERPAGE;
  const currentItems =
    users && users.length > 0
      ? users.slice(indexOfFirstItem, indexOfLastItem)
      : [];

  const fetchUsers = async () => {
    const data = await getUsers();
    console.log("Data:", data);
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
    setOpenModal(false);
  }, [refreshId]);

  return (
    <>
      <PageHeader />
      <div className="container page__container page__container page-section">
        {currentItems.length > 0 ? (
          currentItems.map((data) => <User data={data} />)
        ) : (
          <div className="card my-24pt text-center py-3">
            No Users Available...
          </div>
        )}

        <div className="card mb-0">
          <Pagination
            listLength={users?.length}
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
