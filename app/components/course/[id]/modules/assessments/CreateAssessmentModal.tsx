"use client";
import dynamic from "next/dynamic";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { createDocument } from "@/app/lib/actions/document";
import CreateModuleBtn from "./CreateModuleBtn";
import { useEffect, useState } from "react";
import Link from "next/link";

function CreateAssessmentModal(props: any) {
  const { id: courseId, moduleId } = useParams<{
    id: string;
    moduleId: string;
  }>();
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "";

  const documentId = "6662f253961e396de00b89c4";
  const pathname = usePathname();
  const arrUrl = pathname.split("/");
  arrUrl.pop();
  const url = `${arrUrl.join(
    "/"
  )}/document/${documentId}/questions?title=${title}`;

  const createDocumentWithParams = createDocument.bind(
    null,
    courseId,
    moduleId,
    title
  );

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <form action={createDocumentWithParams}>
        <Modal.Header closeButton>
          <Modal.Title>Create Assessment</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            <h5>Name</h5>
            <input
              minLength={10}
              className="form-control mb-3"
              placeholder="Enter your title here..."
              name="name"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Link className="btn btn-success" href={url} onClick={props.onHide}>
            Submit
          </Link>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
export default dynamic(() => Promise.resolve(CreateAssessmentModal), {
  ssr: false,
});
