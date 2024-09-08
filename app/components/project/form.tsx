"use client";
import { Modal } from "react-bootstrap";
import EditButton from "./button";
import { useState, useRef } from "react";
import Cookies from "universal-cookie";
import { useParams, usePathname, useRouter } from "next/navigation";
import { wUserUrl } from "@/app/lib/actions/endpoints";
import {
  createProject,
  updateProject,
  updateProjectLogo,
} from "@/app/lib/actions/project";

type CreateFormType = {
  data?: any;
};

export default function ProjectForm({ data }: CreateFormType) {
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const cookies = new Cookies();
  const loggedInUser = cookies.get("param-lms-user");
  const adminId = loggedInUser?.id;
  const [formError, setFormError] = useState("")
  const [image, setImage] = useState<any>(data ? data.logo : "");
  const [title, setTitle] = useState(data ? data.programTitle : "");
  const [description, setDescription] = useState(
    data ? data.programDescription : ""
  );
  const [duration, setDuration] = useState(data ? data.duration : "");
  const [imageUpdateLoader, setImageUpdateLoader] = useState(false);
  const pathName = usePathname();
  const { id } = useParams<{ id: string }>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logo, setLogo] = useState(data ? data.logo : "");
  const router = useRouter();

  const handleFileChange = () => {
    fileInputRef.current?.click();
  };

  const handleActualFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (pathName !== "/protected/home/projects/create") {
        const formData = new FormData();
        setImageUpdateLoader(true);
        formData.append("file", file);
        formData.append("programId", id);
        const updateLogo = await updateProjectLogo(formData);
        if (updateLogo.id) {
          setImageUpdateLoader(false);
        } else {
          setImageUpdateLoader(false);
        }
      }
      setImage(file);
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!title) newErrors.title = "Title is required.";
    if (!description) newErrors.description = "Description is required.";
    if (!duration) newErrors.duration = "Duration is required.";
    if (duration && isNaN(Number(duration)))
      newErrors.duration = "Duration must be a number.";
    if (!image)
      newErrors.image = "Image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) return;

    setShowModal(true);
    const formData = new FormData();
    formData.append("adminId", adminId);
    formData.append("programTitle", title);
    formData.append("programDescription", description);
    formData.append("duration", duration);

    if (image) {
      formData.append("file", image);
    }
    setFormError("")

    try {
      if (pathName === "/protected/home/projects/create") {
        const response = await createProject(formData);
        setShowModal(false);
        if(response.id){

          router.push("/protected/home/projects");
        }else{
          setFormError("Failed Creating Project")
        }
      } else {
        const objectData = {
          adminId: adminId,
          programTitle: title,
          programDescription: description,
          duration: duration,
          id: id,
          logo: logo,
        };

        const response = await updateProject(objectData);
        setShowModal(false);
        if(response.id){

          router.push("/protected/home/projects");
        }else{
          setFormError("Failed Creating Project")
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setShowModal(false);
      setFormError("Failed Creating Project")

    }
  };

  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
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
            <div className="text-black" style={{ color: "#252525 !important" }}>
              Submitting...
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <form
        name="create-course"
        className="mb-0"
        data-netlify="true"
        onSubmit={handleSubmit}
      >
        <div className="list-group list-group-form">
          <div className="list-group-item">
          {formError && (
                <div className="text-danger text-100">{formError}</div>
              )}
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
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Program title"
                />
                {errors.title && (
                  <div className="text-danger">{errors.title}</div>
                )}
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
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="Program duration in months"
                />
                {errors.duration && (
                  <div className="text-danger">{errors.duration}</div>
                )}
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
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description ..."
                ></textarea>
                {errors.description && (
                  <div className="text-danger">{errors.description}</div>
                )}
              </div>
            </div>
          </div>
          <div className="list-group-item">
            <div className="form-group row align-items-center mb-0">
              <label className="form-label col-form-label col-sm-3">
                Project Logo
              </label>
              <div className="col-sm-9">
                <input
                  ref={fileInputRef}
                  type="file"
                  hidden
                  onChange={handleActualFileChange}
                />
                <div className="d-flex align-items-center justify-content-between">

                      <input
                        name="image"
                        placeholder="Select Image"
                        type="string"
                        className="form-control ml-3"
                        value={image.name ? image.name : data?.logo}
                        readOnly
                      />
                  
                  <button
                    type="button"
                    disabled={imageUpdateLoader}
                    className={imageUpdateLoader ? "btn btn-secondary" : "btn btn-success"}
                    onClick={handleFileChange}

                  >
                          {errors.image && (
                  <div className="text-danger">{errors.image}</div>
                )}
                    {imageUpdateLoader ? (
                      <span
                        className="spinner-border text-white"
                        role="status"
                      />
                    ) : (
                      <i className="material-icons">edit</i>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="m-3">
          <button className="btn btn-success btn-block d-flex flex-column justify-content-center align-items-center">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
