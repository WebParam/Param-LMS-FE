function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="mdk-header-layout__content page-content ">
        <div className="mdk-header-layout__content page-content ">
          {children}
        </div>
      </div>
    </>
  );
}

export default Layout;
