import React, { ReactNode } from 'react';
import { Container } from '@mui/material';
import NavBar from './NavBar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <NavBar />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        {children}
      </Container>
    </>
  );
}
