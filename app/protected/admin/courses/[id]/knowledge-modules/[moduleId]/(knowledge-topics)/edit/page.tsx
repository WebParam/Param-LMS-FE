import { getModule } from "@/app/lib/actions/module";
import EditForm from "@/components/course/[id]/modules/documents/form";

const Body = async ({ params }: { params: { moduleId: string } }) => {
  const module = await getModule(params.moduleId);

  return (
    <>
      {module && (
        <>
          <div className="page-separator my-4">
            <div className="page-separator__text">
              Edit Knowledge Module - {module.id!}
            </div>
          </div>

          <div className="card mb-3">
            <EditForm module={module} />
          </div>
        </>
      )}
    </>
  );
};

export default Body;
