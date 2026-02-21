import React from 'react';

function Modal({ recipe, onClose, onDelete, onEdit }) {
  // Si no hay receta seleccionada, no renderizamos nada
  if (!recipe) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{recipe.titulo}</h2>
        
        <h4>Ingredientes</h4>
        <ul>
          {recipe.ingredientes.map((ing, i) => (
            <li key={i}>
              <strong>{ing.cantidad}</strong> - {ing.nombre}
            </li>
          ))}
        </ul>

        <h4>Pasos a seguir</h4>
        <ol>
          {recipe.pasos.map((paso, i) => (
            <li key={i}>{paso}</li>
          ))}
        </ol>

        {/* Solo mostramos la sección de comentarios si realmente hay texto */}
        {recipe.comentariosExtras && (
          <>
            <h4>Comentarios extras</h4>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              {recipe.comentariosExtras}
            </p>
          </>
        )}

        {/* Contenedor de botones con el nuevo estilo profesional */}
        <div className="modal-actions">
          <button className="btn-outline" onClick={onClose}>
            Cerrar
          </button>
          <button onClick={() => onEdit(recipe)}>
            Editar Receta
          </button>
          <button className="btn-danger" onClick={() => { onDelete(recipe.id); onClose(); }}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;