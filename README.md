
# Prueba Fortex – Gestión de Tipos y Propiedades

Este proyecto es una interfaz frontend desarrollada con **Next.js**, **React** y **Material UI**. Su propósito es gestionar dos entidades principales: **Tipos** y **Propiedades**. Se utiliza **React Context API** para simular un backend mediante datos mock y se implementa un sistema básico de autenticación con roles (admin y viewer) para controlar el acceso a determinadas funcionalidades.

---

## Instrucciones de Instalación y Ejecución

1. **Clonar el repositorio:**

```bash
git clone https://github.com/NotBunBun/prueba-fortex.git
cd prueba-fortex
```

2. **Instalar dependencias:** Si existen conflictos de peer dependencies, puedes usar:

```bash
npm install --legacy-peer-deps
```

o, si es necesario:

```bash
npm install --force
```

3. **Ejecutar en modo desarrollo:**

```bash
npm run dev
```

La aplicación se abrirá en [http://localhost:3000](http://localhost:3000).

4. **(Opcional) Compilar para producción y arrancar el servidor:**

```bash
npm run build
npm run start
```

---

## Explicación de la Arquitectura

### Next.js

- Utiliza Next.js para gestionar las rutas y el renderizado híbrido (server/client).
- Las páginas se definen en la carpeta `pages/`, donde cada subcarpeta representa una sección (por ejemplo, `/tipos` y `/propiedades`).

### React y Material UI

- La interfaz se desarrolla con React y se usan los componentes de Material UI para lograr un diseño moderno, responsivo y profesional.
- Se ha configurado un tema personalizado (`theme/index.ts`) para mantener una coherencia en la paleta de colores (70/20/10).

### React Context API

Se implementan dos contextos:

- **DataContext**: Administra datos mock para Tipos y Propiedades, junto con funciones CRUD para crear, editar y eliminar.
- **AuthContext**: Simula la autenticación de un usuario, definiendo roles (admin y viewer) para controlar el acceso a funcionalidades críticas.

### Componentes Reutilizables

- Se han creado componentes como `DrawerFormTipo` y `DrawerFormPropiedad` para los formularios en Drawer, y componentes de tabla que utilizan DataGrid para listar los datos con funcionalidades de búsqueda (con debounce) y paginación.

### Control de Acceso

- Dependiendo del rol del usuario (definido en `AuthContext`), se muestran u ocultan botones de creación, edición y eliminación.

---

## Decisiones Técnicas y Justificación

### Next.js

- Se eligió Next.js para aprovechar el renderizado híbrido y la estructura de rutas bien definida, lo que facilita la escalabilidad y el rendimiento del proyecto.

### React Context API para Datos Mock

- Permite simular un backend sin necesidad de integrarlo realmente, facilitando el desarrollo y la realización de pruebas rápidas de CRUD.

### Material UI

- Se utiliza Material UI por su amplia colección de componentes predefinidos, capacidad de personalización y diseño responsivo. El tema personalizado con un esquema de color 70/20/10 ayuda a lograr una interfaz limpia y agradable a la vista.

### Sistema de Roles (admin/viewer)

- Se implementó un `AuthContext` básico para simular un usuario autenticado con roles, lo que permite mostrar u ocultar funcionalidades sensibles (como edición y eliminación) según el rol del usuario.

### Debounce en Búsqueda

- Se implementó un debounce de 400 ms en los campos de búsqueda para evitar que se ejecuten procesos en cada pulsación, optimizando el rendimiento y la experiencia del usuario.

### Uso de Drawers para Formularios

- Los formularios para crear y editar se presentan en Drawers, permitiendo una experiencia de usuario fluida sin recargar la página.

---

## Mejoras Futuras

- **Integración con un Backend Real**: Reemplazar el `DataContext` por llamadas a una API REST o GraphQL para manejar datos de forma real.
- **Indicadores de Carga**: Implementar spinners o skeleton loaders para mejorar la experiencia durante la carga de datos.
- **Validaciones y Manejo de Errores**: Agregar validaciones más robustas en los formularios y proporcionar mensajes de error claros a los usuarios.
- **Optimización del Tipado**: Reducir el uso de `any` y reforzar el tipado para mejorar la mantenibilidad y robustez del código.
- **Pruebas Automatizadas**: Agregar pruebas unitarias e integración para asegurar la estabilidad y calidad del código a lo largo del tiempo.

---

## Conclusión

Este proyecto cumple con los siguientes requerimientos de la prueba técnica:

- **Gestión Completa de Tipos y Propiedades**: Listado, búsqueda, creación, edición y eliminación mediante formularios en Drawer.
- **Datos Mock con React Context API**: Simulación de un backend con funciones CRUD.
- **Diseño y Estilo**: Interfaz moderna, responsiva y agradable utilizando Material UI y un esquema de color 70/20/10.
- **Simulación de Autenticación**: Implementación de un sistema básico de roles (admin y viewer) para controlar el acceso a funcionalidades críticas.
