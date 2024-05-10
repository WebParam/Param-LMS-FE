import CreateForm from "@/components/course/[id]/modules/edit/form"

const Body = () => {
  
  return (
    <>     
      <div className="page-separator my-4">
        <div className="page-separator__text">Edit Unit Standard</div>
      </div>

      <div className="card mb-3">
        <CreateForm />
      </div>
    </>
  );
};

export default Body;