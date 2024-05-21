import CreateForm from "@/components/course/[id]/modules/documents/form"

const Body = ({params}: {params: {moduleId: string}}) => {
  const id = params.moduleId;

  return (
    <>     
      <div className="page-separator my-4">
        <div className="page-separator__text">Edit Unit Standard - {id}</div>
      </div>

      <div className="card mb-3">
        <CreateForm />
      </div>
    </>
  );
};

export default Body;