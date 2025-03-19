import React, { useContext, useState, useEffect } from 'react';
import { Box, Button, TextField, Paper } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { DataContext, Tipo } from '../../src/app/context/DataContext';
import { AuthContext } from '../../src/app/context/AuthContext';
import DrawerFormTipo from '../../src/app/components/DrawerFormTipo';

export default function TiposPage() {
  const { tipos, addTipo, updateTipo, deleteTipo, propiedades } = useContext(DataContext);
  const { user } = useContext(AuthContext);
  
  const [search, setSearch] = useState('');
  const [filteredTipos, setFilteredTipos] = useState<Tipo[]>(tipos);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editData, setEditData] = useState<Tipo | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const lower = search.toLowerCase();
      if (!lower) {
        setFilteredTipos(tipos);
      } else {
        setFilteredTipos(tipos.filter((t) => t.nombre.toLowerCase().includes(lower)));
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [search, tipos]);

  const columns: GridColDef<Tipo>[] = [
    { field: 'nombre', headerName: 'Nombre', flex: 1 },
    { field: 'descripcion', headerName: 'Descripción', flex: 1 },
    {
      field: 'propiedades',
      headerName: 'Propiedades Asignadas',
      flex: 1,
      valueGetter: (params) => {
        return params.row?.propiedades?.length ?? 0;
      },
    },
    {
      field: 'fechaCreacion',
      headerName: 'Fecha de Creación',
      flex: 1,
      valueGetter: (params) => {
        const rawDate = params.row?.fechaCreacion;
        if (!rawDate) return '';
        if (rawDate instanceof Date) {
          return rawDate.toLocaleDateString();
        }
        const parsed = new Date(rawDate);
        return isNaN(parsed.getTime()) ? '' : parsed.toLocaleDateString();
      },
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        const row = params.row as Tipo;
        if (user?.role !== 'admin') return null;
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

  const handleEdit = (tipo: Tipo) => {
    setEditData(tipo);
    setDrawerOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('¿Eliminar este Tipo?')) {
      deleteTipo(id);
    }
  };

  const handleSubmit = (data: { nombre: string; descripcion: string; propiedades: number[] }) => {
    if (editData) {
      updateTipo({ ...editData, ...data });
    } else {
      addTipo(data);
    }
    setDrawerOpen(false);
    setEditData(null);
  };

  return (
    <Box sx={{ p: 2 }}>
      <h2>Gestión de Tipos</h2>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Buscar Tipos"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {user?.role === 'admin' && (
          <Button variant="contained" onClick={handleCreate}>
            Crear Tipo
          </Button>
        )}
      </Box>

      <Paper elevation={1} sx={{ p: 2, borderRadius: '8px' }}>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid<Tipo>
            rows={filteredTipos}
            columns={columns}
            getRowId={(row) => row.id}
            pageSizeOptions={[5, 10]}
          />
        </Box>
      </Paper>

      <DrawerFormTipo
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSubmit={handleSubmit}
        initialData={editData}
        propiedadesDisponibles={propiedades.map((p) => ({ id: p.id, nombre: p.nombre }))}
      />
    </Box>
  );
}
