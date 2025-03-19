import React, { useContext, useState, useEffect } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { DataContext } from '../../src/app/context/DataContext';
import { AuthContext } from '../../src/app/context/AuthContext';
import DrawerFormPropiedad from '../../src/app/components/DrawerFormPropiedad';

export default function PropiedadesPage() {
  const { propiedades, addPropiedad, updatePropiedad, deletePropiedad } = useContext(DataContext);
  const { user } = useContext(AuthContext);

  const [search, setSearch] = useState('');
  const [rows, setRows] = useState<any[]>(propiedades);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editData, setEditData] = useState<any | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const lower = search.toLowerCase();
      if (!lower) {
        setRows(propiedades);
      } else {
        setRows(propiedades.filter((p: any) => p.nombre.toLowerCase().includes(lower)));
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [search, propiedades]);

  const columns: any[] = [
    { field: 'nombre', headerName: 'Nombre', flex: 1 },
    { field: 'tipoPropiedad', headerName: 'Tipo de Propiedad', flex: 1 },
    {
      field: 'fechaCreacion',
      headerName: 'Fecha de Creación',
      flex: 1,
      valueGetter: (params: any) => {
        const fecha = params.row?.fechaCreacion;
        if (!fecha) return '';
        if (fecha instanceof Date) return fecha.toLocaleDateString();
        const parsed = new Date(fecha);
        return isNaN(parsed.getTime()) ? '' : parsed.toLocaleDateString();
      },
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      flex: 1,
      sortable: false,
      renderCell: (params: any) => {
        if (user.role !== 'admin') return null;
        const row = params.row;
        return (
          <>
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleEdit(row)}
              sx={{ mr: 1 }}
            >
              Editar
            </Button>
            <Button
              variant="outlined"
              size="small"
              color="error"
              onClick={() => handleDelete(row.id)}
            >
              Eliminar
            </Button>
          </>
        );
      },
    },
  ];

  const handleCreate = () => {
    setEditData(null);
    setDrawerOpen(true);
  };

  const handleEdit = (row: any) => {
    setEditData(row);
    setDrawerOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('¿Eliminar esta Propiedad?')) {
      deletePropiedad(id);
    }
  };

  const handleSubmit = (data: { nombre: string; tipoPropiedad: string }) => {
    if (editData) {
      updatePropiedad({
        ...editData,
        nombre: data.nombre,
        tipoPropiedad: data.tipoPropiedad,
      });
    } else {
      addPropiedad(data);
    }
    setDrawerOpen(false);
  };

  return (
    <Box sx={{ p: 2 }}>
      <h2>Gestión de Propiedades</h2>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Buscar Propiedades"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {user.role === 'admin' && (
          <Button variant="contained" onClick={handleCreate}>
            Crear Propiedad
          </Button>
        )}
      </Box>

      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row: any) => row.id}
          pageSizeOptions={[5, 10]}
        />
      </Box>

      <DrawerFormPropiedad
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSubmit={handleSubmit}
        initialData={editData}
      />
    </Box>
  );
}
