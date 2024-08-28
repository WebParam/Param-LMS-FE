import PageHeader from "./PageHeader";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageHeader />
      <div className="container page__container page__container page-section">
        {children}
      </div>
    </>
  );
}

export default Layout;
