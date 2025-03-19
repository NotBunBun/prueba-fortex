import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Link from 'next/link';
import { AuthContext } from '../context/AuthContext';

export default function NavBar() {
  const { user, toggleRole } = useContext(AuthContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Prueba Fortex
        </Typography>
        <Link href="/" passHref legacyBehavior>
          <Button color="inherit">Inicio</Button>
        </Link>
        <Link href="/tipos" passHref legacyBehavior>
          <Button color="inherit">Tipos</Button>
        </Link>
        <Link href="/propiedades" passHref legacyBehavior>
          <Button color="inherit">Propiedades</Button>
        </Link>
        <Button color="inherit" onClick={toggleRole}>
          Rol: {user?.role === 'admin' ? 'Admin' : 'Viewer'}
        </Button>
      </Toolbar>
    </AppBar>
  );
}
