"use client";
import PageHeader from '@/components/ScheduleClass/PageHeader';
import React, { ReactNode } from 'react';
import { Container } from 'react-bootstrap';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="mdk-header-layout__content page-content ">
        <div className="mdk-header-layout__content page-content ">
          <PageHeader headerTitle="Schedule Class" buttonTitle="Create Class" contentTitle=""/>
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