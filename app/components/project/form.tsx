"use client";
import { Modal } from "react-bootstrap";
import EditButton from "./button";
import { useState } from "react";
import Cookies from "universal-cookie";
import { useParams, usePathname } from "next/navigation";
import { createProject, updateProject } from "@/app/lib/actions/project";

type CreateFormType = {
data?:any
};

interface ImageData {
  id: number;
  title: string;
  url: string;
}

export default function ProjectForm({data}:CreateFormType) {
  const [showModal, setShowModal] = useState(false);
  const cookies = new Cookies();
  const loggedInUser = cookies.get("param-lms-user");
  const adminId = loggedInUser?.id;
  const [imageData, setImageData] = useState<ImageData[]>([]);
  const [image, setImage] = useState<any>();
  const [title, setTitle] = useState(data ? data.programTitle : "");
  const [description, setDescription] = useState(data ? data.programDescription : "");
  const [duration, setDuration] = useState(data ? data.duration : "");
  const pathName = usePathname();
  const {id} = useParams<{
    id:string
  }>();

  const handleAddLogbook = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        setImage(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result;
          if (content) {
            const blobUrl = URL.createObjectURL(
              new Blob([content], { type: "text/plain" })
            );
            setImageData([
              ...imageData,
              { id: imageData.length + 1, title: file.name, url: blobUrl },
            ]);
          }
        };
        reader.readAsText(file);
      }
    };
    fileInput.click();
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("adminId", adminId);
    formData.append("programDescription", description);
    formData.append("duration", duration);
    formData.append("programTitle", title);
    formData.append("state", "0");

    if (image) {
      formData.append("file", image);
    }
    const path = pathName == "/protected/home/projects/create";
    if (path) {
      console.log("FormData Properties:", {
        adminId: formData.get("adminId"),
        programDescription: formData.get("programDescription"),
        duration: formData.get("duration"),
        programTitle: formData.get("programTitle"),
        file: formData.get("file")
      });
      const addProject = await createProject(formData);
    } else {
      formData.append("id", id);
      const projectUpdate = await updateProject(formData);
    }
  };

  return (
    <>
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
        centered
      >
        <Modal.Body>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="spinner-border text-primary" role="status" />
            <div style={{ color: "#252525 !important" }} className="text-black">
              Submitting...
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <form name="create-course" className="mb-0" data-netlify="true">
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
                  value={title}
                  onChange={(e: any) => setTitle(e.target.value)}
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
                  value={duration}
                  onChange={(e: any) => setDuration(Number(e.target.value))}
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
                  style={{ height: "100px", backgroundColor: "white" }}
                  value={description}
                  onChange={(e: any) => setDescription(e.target.value)}
                  placeholder="Description ..."
                ></textarea>
              </div>
            </div>
          </div>
          <div className="list-group-item">
            <div className="form-group row align-items-center mb-0">
              <label className="form-label col-form-label col-sm-3">
                Project Logo
              </label>
              <div className="col-sm-9">
                {imageData.length > 0 ? (
                  <>
                    <input
                      name="projectLogoUrl"
                      type="text"
                      className="form-control"
                      value={imageData[imageData.length - 1].url}
                      readOnly
                    />
                    <button
                      className="btn btn-primary mt-2 w-100"
                      onClick={handleAddLogbook}
                    >
                      Change Image
                    </button>
                  </>
                ) : (
                  <input
                    type="button"
                    value="Select Image"
                    className="btn btn-success w-100"
                    onClick={handleAddLogbook}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="m-3">
          <EditButton handleSubmit={handleSubmit} setShowModal={setShowModal} />
        </div>
      </form>
    </>
  );
}
