"use client";
import dynamic from "next/dynamic";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useParams, useSearchParams } from "next/navigation";
import { createDocument } from "@/app/lib/actions/document";
import CreateModuleBtn from "./CreateModuleBtn";
import { useState } from "react";
import { AddBtn } from "./Buttons";

function CreateKnowledgeTopicModal(props: any) {
  const { id: courseId, moduleId } = useParams<{
    id: string;
    moduleId: string;
  }>();

  const searchParams = useSearchParams();
  const [closeModal, setCloseModal] = useState(false);
  const title = searchParams.get("title") || "";
  const [topicElement, setTopicElement] = useState("");
  const [topicElements, setTopicElements] = useState(["dfasdfasddasdda"]);
  const createDocumentWithParams = createDocument.bind(
    null,
    courseId,
    moduleId,
    title
  );

  return (
    <Modal
      {...props}
      size="xl"
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <form action={createDocumentWithParams}>
        <Modal.Header closeButton>
          <Modal.Title>Create Knowledge Topic</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="row">
            <div className="p-4 col-12">
              <div className="form-group row mb-0">
                <div className="col-sm-12">
                  <label htmlFor="">Name</label>
                  <input className="w-100 form-control" type="text" />
                </div>
                <div className="col-sm-12 py-2">
                  <label htmlFor="">Description</label>
                  <textarea
                    style={{ height: "100px" }}
                    className="w-100 form-control"
                  />
                </div>
              </div>
              <div className="mt-2">
                <label htmlFor="">Topic Elements</label>
                {topicElements &&
                  topicElements.map((description) => (
                    <div
                      style={{ columnGap: "20px" }}
                      className="form-group d-flex mb-3 align-items-center"
                    >
                      <input
                        type="text"
                        className="form-control w-100"
                        placeholder="Topic Element ..."
                        name="options[0][description]"
                        defaultValue={description}
                      />
                      <button className="btn p-0" type="submit">
                        <i
                          style={{ fontSize: "25px" }}
                          className="material-icons"
                        >
                          delete
                        </i>
                      </button>
                    </div>
                  ))}
                <div
                  style={{ columnGap: "20px" }}
                  className="form-group d-flex mb-0 align-items-center"
                >
                  <input
                    type="text"
                    className="form-control w-100"
                    placeholder="Topic Element ..."
                    name="options[0][description]"
                    value={topicElement}
                    onChange={(e: any) => setTopicElement(e.target.value)}
                  />
                  <button className="btn p-0" type="button">
                    <i
                      style={{ fontSize: "25px" }}
                      className="material-icons"
                      onClick={() => {
                        setTopicElements([...topicElements, topicElement]),
                          setTopicElement("");
                      }}
                    >
                      add
                    </i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <CreateModuleBtn setCloseModal={setCloseModal} />
        </Modal.Footer>
      </form>
    </Modal>
  );
}
export default dynamic(() => Promise.resolve(CreateKnowledgeTopicModal), {
  ssr: false,
});
