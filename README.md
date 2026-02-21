# 🍲 Sistema de Gestión de Recetas (CRUD)

Aplicación web desarrollada en **React** para la gestión de un recetario. Este proyecto fue creado para la materia de Frameworks y cumple con todos los requerimientos de evaluación establecidos.

## ✨ Características y Requisitos Cumplidos

* **Autenticación de Acceso:** Sistema de login simulado que verifica credenciales antes de mostrar el contenido (Usuario: `admin` / Clave: `1234`).
* **CRUD Completo:** Permite Crear, Leer, Actualizar (Editar) y Eliminar recetas de forma dinámica.
* **Componentes Adaptables (4 versiones):** Uso de la propiedad `variant` para renderizar el componente de la receta en 4 diseños distintos (Estándar, Compacta, Destacada y Miniatura) dentro de la misma vista.
* **Control de Dimensiones y Cropping:** Implementación de CSS puro (`max-width`, `max-height`, y `overflow: hidden`) para recortar visualmente el contenido excedente en las tarjetas.
* **Visualización en Popup (Modal):** Al hacer clic en cualquier receta del listado, se despliega un Modal con el detalle completo.
* **Estructura de Datos Dinámica:** Formularios que permiten agregar una cantidad ilimitada de ingredientes (con cantidades) y pasos a seguir, además de comentarios adicionales.
* **Persistencia de Datos (Extra):** Uso de `localStorage` para que las recetas no se borren al recargar la página.

## 🚀 Cómo ejecutar el proyecto

1. Clona o descarga el repositorio.
2. Abre la terminal en la carpeta del proyecto.
3. Instala las dependencias ejecutando: `npm install`
4. Inicia el servidor de desarrollo ejecutando: `npm run dev`
5. Abre el enlace local en tu navegador (usualmente `http://localhost:5173`).

### Hecho por Samer Ghattas - 31.887.714
