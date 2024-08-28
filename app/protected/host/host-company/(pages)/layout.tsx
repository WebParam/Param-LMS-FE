"use client";
import "./layout.scss";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="mt-3">{children}</div>
    </>
  );
}

export default Layout;
