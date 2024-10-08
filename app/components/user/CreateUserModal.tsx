"use client";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useParams, useSearchParams } from "next/navigation";
import { CreateUserBtn } from "./Buttons";
import { createUser } from "@/app/lib/actions/users";

function CreateUserModal(props: any) {
  const searchParams = useSearchParams();

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <form action={createUser}>
        <Modal.Header closeButton>
          <Modal.Title>Create User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>
              <h5>Name & Surname</h5>
              <input
                minLength={10}
                className="form-control mb-3"
                placeholder="Enter your title here..."
                name="name"
              />
            </div>
            <div>
              <h5>User Role</h5>
              <select className="form-control mb-3" name="role">
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
                placeholder="Enter your title here..."
                name="email"
              />
            </div>
            <div>
              <h5>Phone Number</h5>
              <input
                type="email"
                minLength={10}
                className="form-control mb-3"
                placeholder="Enter your title here..."
                name="phoneNumber"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <CreateUserBtn />
        </Modal.Footer>
      </form>
    </Modal>
  );
}
export default CreateUserModal;
