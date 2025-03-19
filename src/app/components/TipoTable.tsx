'use client';

import React from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

interface TipoTableProps {
  data: any[]; 
}
export default class TipoTable extends React.Component<TipoTableProps> {
  columns: any[];

  constructor(props: TipoTableProps) {
    super(props);
    this.columns = [
      { field: 'nombre', headerName: 'Nombre', flex: 1 },
      { field: 'descripcion', headerName: 'Descripción', flex: 1 },
      {
        field: 'propiedades',
        headerName: 'Propiedades',
        flex: 1,
        valueGetter: (params: any) => {
          return params.row.propiedades?.length ?? 0;
        },
      },
      {
        field: 'fechaCreacion',
        headerName: 'Fecha de Creación',
        flex: 1,
        valueGetter: (params: any) => {
          return new Date(params.row.fechaCreacion).toLocaleDateString();
        },
      },
    ];
  }

  render() {
    return (
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={this.props.data}   // any[]
          columns={this.columns}   // any[]
          getRowId={(row: any) => row.id}
          paginationModel={{ pageSize: 5, page: 0 }}
          pageSizeOptions={[5, 10, 25]}
        />
      </Box>
    );
  }
}
