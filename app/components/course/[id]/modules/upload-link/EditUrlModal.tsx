"use client";
import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { updateParaphrase, updateVideoLink } from "@/app/lib/actions/paraphrase";
import { useParams, useSearchParams } from "next/navigation";

function EditUrlModal(props: any) {
  const { id: courseId, moduleId, documentId } = useParams<{
    id: string;
    moduleId: string;
    documentId: string;
  }>();

  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "";
  const [url, setUrl] = useState(props.data.url);
  const submmitRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const [publishModal, setPublishModal] = useState(false);

  const submitVideoLink = async () => {
    setPublishModal(true);
    await updateVideoLink(props.data.id, url, courseId, moduleId, documentId, title);
    setPublishModal(false);
    props.onHide();
  };

  const submit = () => {
    submmitRef.current?.click();
    if (
      titleRef.current?.value &&
      titleRef.current?.value.length > 10
    ) {
      props.onHide();
    }
  }

  return (
    <>      <Modal
    size="sm"
    centered
    show={publishModal}
    onHide={() => setPublishModal(false)}
    backdrop={false}
    keyboard={false}
  >
    <Modal.Body>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#252525",
          gap: "15px",
        }}
      >
        <div className="spinner-grow text-primary" role="status" />
        <p>Uploading Link...</p>
      </div>
    </Modal.Body>
    </Modal>
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <form>
        <Modal.Header closeButton>
          <Modal.Title>Edit Video Url</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            <h5>Video Link</h5>
            <input
              minLength={10}
              className="form-control mb-3"
              placeholder="Enter your Video Link here. E.g https://..."
              name="videoUrl"
              defaultValue={props.data.videoUrl}
              onChange={(e:any) => setUrl(e.target.value)}
            />
          </div>{" "}
        </Modal.Body>
        <Modal.Footer>
        <input type="submit" hidden ref={submmitRef} />
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button
            variant="success"
            onClick={() => submitVideoLink()}
          >
            Submit
          </Button>
        </Modal.Footer>
      </form>
    </Modal>

</>
  );
}
export default dynamic(() => Promise.resolve(EditUrlModal), {
  ssr: false,
});
