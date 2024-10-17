import KnowledgeModules from "@/app/components/analytics/tables/KnowledgeModules";
import PageHeader from "@/components/PageHeaders/assessments/PageHeader";

export default async function Page({ params }: { params: { id: string } }) {
  const courseId = params.id;
  return (
    <>
        <PageHeader courseId={courseId} />
      <div className="container page__container page__container page-section">

        <div className="card p-relative o-hidden mb-0">
          <KnowledgeModules courseId={courseId} path="assignments" />
        </div>
      </div>
    </>
  );
}
