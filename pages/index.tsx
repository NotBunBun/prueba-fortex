import React, { useContext } from 'react';
import { AuthContext } from '../src/app/context/AuthContext';
import { Box, Button, Typography } from '@mui/material';

export default function HomePage() {
  const { user, toggleRole } = useContext(AuthContext);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4">Bienvenido a Prueba Fortex</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Navega a <strong>/tipos</strong> o <strong>/propiedades</strong>.
      </Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Usuario Actual: {user.username}, Rol: {user.role}
      </Typography>
      <Button variant="outlined" sx={{ mt: 2 }} onClick={toggleRole}>
        Cambiar Rol
      </Button>
    </Box>
  );
}
