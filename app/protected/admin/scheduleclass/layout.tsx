"use client";
import React, { ReactNode } from 'react';
import { Container } from 'react-bootstrap';
import PageHeader from "@/app/protected/admin/notifications/PageHeader";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="mdk-header-layout__content page-content ">
        <div className="mdk-header-layout__content page-content ">
          <PageHeader title="Schedule Class" buttonTitle="Create Class" contentTitle=""/>
          <div className="page-separator">
            <div className="page-separator__text">Calendar</div>
          </div>
          <div className="container page__container page__container page-section">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;