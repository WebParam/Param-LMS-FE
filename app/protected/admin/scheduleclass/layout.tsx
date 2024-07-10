import React, { ReactNode } from 'react';
import { Container } from 'react-bootstrap';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Container>
      {children}
    </Container>
  );
};

export default MainLayout;