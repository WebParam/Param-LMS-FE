"use client"
import { Modal } from "react-bootstrap";
import EditButton from "./button";
import { useState } from "react";


type CreateFormType = {
  title?: string;
  description?: string;
  projectLogoUrl?: string;
  duration: string;
  action: (formData: FormData) => void;
};

export default function CreateForm({ title, description, projectLogoUrl,duration, action}: CreateFormType) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    <Modal show={showModal} onHide={() => {setShowModal(false)}} centered>
      <Modal.Body>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems:'center'}}>
          <div className="spinner-border text-primary" role="status"/>
          <div style={{ color: '#252525 !important'}} className="text-black">Submitting...</div>
        </div>
      </Modal.Body>
    </Modal>
    <form name="create-course" className="mb-0" action={action} data-netlify="true">
      <div className="list-group list-group-form">
        <div className="list-group-item">
          <div className="form-group row align-items-center mb-0">
            <label className="form-label col-form-label col-sm-3">
              Title
            </label>
            <div className="col-sm-9">
              <input
                name="title"
                type="text"
                className="form-control"
                defaultValue={title}
                placeholder="Program title"
              />
            </div>
          </div>
        </div>
        <div className="list-group-item">
          <div className="form-group row align-items-center mb-0">
            <label className="form-label col-form-label col-sm-3">
              Duration
            </label>
            <div className="col-sm-9">
              <input
                name="duration"
                type="number"
                className="form-control"
                defaultValue={duration}
                placeholder="Program duration in months"
              />
            </div>
          </div>
        </div>
        <div className="list-group-item">
          <div className="form-group row align-items-center mb-0">
            <label className="form-label col-form-label col-sm-3">
              Description
            </label>
            <div className="col-sm-9">
              <textarea
                name="description"
                className="w-100 p-2 text-black"
                style={{ height: "100px", backgroundColor: 'white' }}
                defaultValue={description}
                placeholder="Description ..."
              ></textarea>
            </div>
          </div>
        </div>
        <div className="list-group-item">
          <div className="form-group row align-items-center mb-0">
            <label className="form-label col-form-label col-sm-3">
              Project Logo Url
            </label>
            <div className="col-sm-9">
              <input
                name="courseLogoUrl"
                type="text"
                className="form-control"
                defaultValue={projectLogoUrl}
                placeholder="https://..."
              />
            </div>
          </div>
        </div>
      </div>
      <div className="m-3">
        <EditButton setShowModal={setShowModal} />
      </div>
    </form>
    </>
)};