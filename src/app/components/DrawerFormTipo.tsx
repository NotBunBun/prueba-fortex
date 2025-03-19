import React, { useState, useEffect } from 'react';
import {
  Drawer,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

interface DrawerFormPropiedadProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { nombre: string; tipoPropiedad: string }) => void;
  initialData?: any;
}

export default function DrawerFormPropiedad({
  open,
  onClose,
  onSubmit,
  initialData,
}: DrawerFormPropiedadProps) {
  const [nombre, setNombre] = useState('');
  const [tipoProp, setTipoProp] = useState<'texto' | 'numero' | 'fecha' | 'check'>('texto');

  useEffect(() => {
    if (initialData) {
      setNombre(initialData.nombre);
      setTipoProp(initialData.tipoPropiedad);
    } else {
      setNombre('');
      setTipoProp('texto');
    }
  }, [initialData]);

  const handleSave = () => {
    onSubmit({ nombre, tipoPropiedad: tipoProp });
    onClose();
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 320, p: 2 }}>
        <h2>{initialData ? 'Editar Propiedad' : 'Crear Propiedad'}</h2>
        <TextField
          label="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Tipo de Propiedad</InputLabel>
          <Select
            value={tipoProp}
            label="Tipo de Propiedad"
            onChange={(e) => setTipoProp(e.target.value as any)}
          >
            <MenuItem value="texto">Texto</MenuItem>
            <MenuItem value="numero">Número</MenuItem>
            <MenuItem value="fecha">Fecha</MenuItem>
            <MenuItem value="check">Check</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" onClick={handleSave} sx={{ mt: 2 }}>
          Guardar
        </Button>
      </Box>
    </Drawer>
  );
}
