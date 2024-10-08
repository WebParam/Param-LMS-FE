"use client";
import { userData } from "@/components/user/data";
import { updateUser } from "@/app/lib/actions/users";

const Body = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const user: any = userData.find((u) => (u.id = id)) || {};
  const updateUserWithParams = updateUser.bind(null, id);

  return (
    <>
      <div className="card p-4">
        <form action={updateUserWithParams}>
          <div>
            <h5>Name & Surname</h5>
            <input
              minLength={10}
              className="form-control mb-3"
              placeholder="Enter your title here..."
              defaultValue={user.name}
              name="name"
            />
          </div>
          <div>
            <h5>User Role</h5>
            <select
              defaultValue={user.role}
              className="form-control mb-3"
              name="role"
            >
              <option value="">Select Role</option>
              <option value="Facilitator">Facilitator</option>
              <option value="Moderator">Moderator</option>
            </select>
          </div>
          <div>
            <h5>Email Address</h5>
            <input
              type="email"
              minLength={10}
              className="form-control mb-3"
              placeholder="Enter your email here..."
              name="email"
              defaultValue={user.email}
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
              defaultValue={user.phoneNumber}
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
