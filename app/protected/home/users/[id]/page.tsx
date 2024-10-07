"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getAssessments } from "@/app/lib/actions/assessments";
import { userData } from "@/components/user/data";

const Body = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const searchParams = useSearchParams();
  const refreshId = searchParams.get("refreshId");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [users, setUsers] = useState<any[]>(userData);

  const user = userData.find((u) => (u.id = id)) || {};

  const fetchUsers = async () => {
    const data = await getAssessments(id);
    setUsers(data);
  };

  useEffect(() => {
    // fetchUsers();
    setOpenModal(false);
  }, [refreshId]);

  return (
    <>
      <div className="card p-4">
        <form>
          <div>
            <h5>Name & Surname</h5>
            <input
              minLength={10}
              className="form-control mb-3"
              placeholder="Enter your title here..."
              name="title"
            />
          </div>
          <div>
            <h5>User Role</h5>
            <select className="form-control mb-3" name="assessmentType">
              <option value="1">Facilitor</option>
              <option value="0">Moderator</option>
            </select>
          </div>
          <div>
            <h5>Email Address</h5>
            <input
              type="email"
              minLength={10}
              className="form-control mb-3"
              placeholder="Enter your title here..."
              name="title"
            />
          </div>
          <div>
            <h5>Phone Number</h5>
            <input
              type="email"
              minLength={10}
              className="form-control mb-3"
              placeholder="Enter your title here..."
              name="title"
            />
          </div>
          <div className="d-flex justify-content-center">
            <button className="btn btn-success">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Body;
