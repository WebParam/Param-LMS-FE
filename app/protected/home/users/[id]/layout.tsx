import PageHeader from "@/components/user/[id]/PageHeader";
import Tabs from "@/components/user/[id]/Tabs";

async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const { id } = params;

  return (
    <>
      <PageHeader userId={id} />

      <div className="container page__container page__container page-section">
        <div className="card p-relative o-hidden mb-3">
          <Tabs id={id} />
        </div>
        {children}
      </div>
    </>
  );
}

export default Layout;
