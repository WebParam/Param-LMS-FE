type CreateFormType = {
  title?: string;
  description?: string;
  instructorName?: string;
  logoUrl?: string;
  thumbUrl?: string;
  action: (formData: FormData) => void;
};

export default function CreateForm({
  title,
  description,
  instructorName,
  logoUrl,
  thumbUrl,
  action,
}: CreateFormType) {
  return (
    <form className="mb-0" action={action}>
      <div className="list-group list-group-form">
        <div className="list-group-item">
          <div className="form-group row align-items-center mb-0">
            <label className="form-label col-form-label col-sm-3">
              Course Title
            </label>
            <div className="col-sm-9">
              <input
                name="title"
                type="text"
                className="form-control"
                defaultValue={title}
                placeholder="Course Name"
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
                className="w-100 p-2"
                style={{ height: "100px" }}
                defaultValue={description}
                placeholder="Description ..."
              ></textarea>
            </div>
          </div>
        </div>
        <div className="list-group-item">
          <div className="form-group row align-items-center mb-0">
            <label className="form-label col-form-label col-sm-3">
              Instructor Name
            </label>
            <div className="col-sm-9">
              <input
                name="instructorName"
                type="text"
                className="form-control"
                defaultValue={instructorName}
                placeholder="Instructor Name"
              />
            </div>
          </div>
        </div>
        <div className="list-group-item">
          <div className="form-group row align-items-center mb-0">
            <label className="form-label col-form-label col-sm-3">
              Course Logo Url
            </label>
            <div className="col-sm-9">
              <input
                name="logoUrl"
                type="text"
                className="form-control"
                defaultValue={logoUrl}
                placeholder="https://..."
              />
            </div>
          </div>
        </div>
        <div className="list-group-item">
          <div className="form-group row align-items-center mb-0">
            <label className="form-label col-form-label col-sm-3">
              Thumbnail Url
            </label>
            <div className="col-sm-9">
              <input
                name="thumbUrl"
                type="text"
                className="form-control"
                defaultValue={thumbUrl}
                placeholder="https://..."
              />
            </div>
          </div>
        </div>
      </div>
      <div className="m-3">
        <button className="btn btn-success btn-block">Submit</button>
      </div>
    </form>
  );
}
