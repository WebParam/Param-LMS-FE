"use client";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CreateUserBtn } from "./Buttons";
import { createUser } from "@/app/lib/actions/users";
import Cookies from "universal-cookie";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

function CreateUserModal(props: any) {
  const cookies = new Cookies();
  const loggedInUser = cookies.get("param-lms-user");
  const createUserWithParam = createUser.bind(null, loggedInUser.id);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const error = searchParams.get("error");

  return (
    <Modal
      {...props}
      size="lg"
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <form action={createUserWithParam}>
        <Modal.Header closeButton>
          <Modal.Title>Create User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="row">
              <div className="col-6">
                <h5>Name</h5>
                <input
                  className="form-control mb-3"
                  placeholder="Enter your title here..."
                  name="name"
                />
              </div>{" "}
              <div className="col-6">
                <h5>Surname</h5>
                <input
                  className="form-control mb-3"
                  placeholder="Enter your title here..."
                  name="surname"
                />
              </div>
            </div>
            <div>
              <h5>User Role</h5>
              <select className="form-control mb-3" name="role">
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
                placeholder="Enter your title here..."
                name="email"
              />
            </div>
            <div>
              <h5>Phone Number</h5>
              <input
                minLength={10}
                className="form-control mb-3"
                placeholder="Enter your title here..."
                name="phoneNumber"
                defaultValue="+27"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              props.onHide();
              if (error) router.push(pathname);
            }}
          >
            Close
          </Button>
          <CreateUserBtn />
        </Modal.Footer>
      </form>
    </Modal>
  );
}
export default CreateUserModal;
