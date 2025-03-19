import React, { createContext, useState, ReactNode } from 'react';

export interface Tipo {
  id: number;
  nombre: string;
  descripcion?: string;
  propiedades: number[];
  fechaCreacion: Date;
}

export interface Propiedad {
  id: number;
  nombre: string;
  tipoPropiedad: 'texto' | 'numero' | 'fecha' | 'check';
  fechaCreacion: Date;
}

interface DataContextProps {
  tipos: any[];
  propiedades: any[];
  addTipo: (data: any) => void;
  updateTipo: (tipo: any) => void;
  deleteTipo: (id: number) => void;
  addPropiedad: (data: any) => void;
  updatePropiedad: (prop: any) => void;
  deletePropiedad: (id: number) => void;
}

export const DataContext = createContext<DataContextProps>({} as DataContextProps);

export function DataProvider({ children }: { children: ReactNode }) {
  const [tipos, setTipos] = useState<any[]>([
    {
      id: 1,
      nombre: 'Persona',
      descripcion: 'Tipo persona',
      propiedades: [],
      fechaCreacion: new Date(),
    },
    {
      id: 2,
      nombre: 'Organización',
      descripcion: 'Tipo organización',
      propiedades: [],
      fechaCreacion: new Date(),
    },
  ]);

  const [propiedades, setPropiedades] = useState<any[]>([
    {
      id: 101,
      nombre: 'Nombre',
      tipoPropiedad: 'texto',
      fechaCreacion: new Date(),
    },
    {
      id: 102,
      nombre: 'Fecha de nacimiento',
      tipoPropiedad: 'fecha',
      fechaCreacion: new Date(),
    },
  ]);

  let nextTipoId = 3;
  let nextPropId = 103;

  const addTipo = (data: any) => {
    const newTipo = {
      id: nextTipoId++,
      nombre: data.nombre,
      descripcion: data.descripcion || '',
      propiedades: data.propiedades || [],
      fechaCreacion: new Date(),
    };
    setTipos((prev) => [...prev, newTipo]);
  };

  const updateTipo = (updated: any) => {
    setTipos((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
  };

  const deleteTipo = (id: number) => {
    setTipos((prev) => prev.filter((t) => t.id !== id));
  };

  const addPropiedad = (data: any) => {
    const newProp = {
      id: nextPropId++,
      nombre: data.nombre,
      tipoPropiedad: data.tipoPropiedad,
      fechaCreacion: new Date(),
    };
    setPropiedades((prev) => [...prev, newProp]);
  };

  const updatePropiedad = (updated: any) => {
    setPropiedades((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
  };

  const deletePropiedad = (id: number) => {
    setPropiedades((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <DataContext.Provider
      value={{
        tipos,
        propiedades,
        addTipo,
        updateTipo,
        deleteTipo,
        addPropiedad,
        updatePropiedad,
        deletePropiedad,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
