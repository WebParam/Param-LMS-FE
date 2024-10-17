import { updateUser } from "@/app/lib/actions/users";
import { getUser } from "@/app/lib/data/users";
import { EditUserBtn } from "@/components/user/[id]/Buttons";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string };
}) {
  const { id } = params;
  const { role } = searchParams;

  const user = await getUser(id, parseInt(role));

  const updateUserWithParams = updateUser.bind(null, id);

  return (
    <>
      <div className="card p-4">
        <form action={updateUserWithParams}>
          <div className="row">
            <div className="col-6">
              <h5>Name</h5>
              <input
                className="form-control mb-3"
                placeholder="Enter your title here..."
                defaultValue={user ? user.firstName : ""}
                name="firstName"
              />
            </div>{" "}
            <div className="col-6">
              <h5>Surname</h5>
              <input
                className="form-control mb-3"
                placeholder="Enter your title here..."
                defaultValue={user ? user.lastName : ""}
                name="lastName"
              />
            </div>
          </div>
          <div>
            <h5>User Role</h5>
            <select
              defaultValue={user && user.role}
              className="form-control mb-3"
              name="role"
            >
              <option value="">Select Role</option>
              <option value="1">Facilitator</option>
              <option value="0">Moderator</option>
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
              defaultValue={user && user.email}
            />
          </div>
          <div>
            <h5>Phone Number</h5>
            <input
              minLength={10}
              className="form-control mb-3"
              placeholder="Enter your title here..."
              name="phoneNumber"
              defaultValue={user && user.phoneNumber}
            />
          </div>
          <div className="d-flex justify-content-center">
            <EditUserBtn />
          </div>
        </form>
      </div>
    </>
  );
}
