import React from 'react';

function AdaptableRecipe({ recipe, variant, onClick }) {
  // REQUISITO: Multiples versiones (4 diferentes)
  
  const baseClass = "recipe-crop-container";

  switch (variant) {
    case 'compacta': // Version 2: Solo una línea
      return (
        <div className={`${baseClass} variant-2`} onClick={onClick}>
          <h4>{recipe.titulo}</h4>
          <span style={{marginLeft: '10px', fontSize: '12px'}}>({recipe.ingredientes.length} ing.)</span>
        </div>
      );
    case 'destacada': // Version 3: Color llamativo
      return (
        <div className={`${baseClass} variant-3`} onClick={onClick}>
          <h3>🌟 {recipe.titulo}</h3>
          <p>{recipe.comentariosExtras}</p>
        </div>
      );
    case 'miniatura': // Version 4: Cuadro pequeño
      return (
        <div className={`${baseClass} variant-4`} onClick={onClick}>
          <h3>🥘</h3>
          <p>{recipe.titulo}</p>
        </div>
      );
    case 'estandar': // Version 1: Por defecto
    default:
      return (
        <div className={`${baseClass} variant-1`} onClick={onClick}>
          <h3>{recipe.titulo}</h3>
          <p>Pasos: {recipe.pasos.length}</p>
          <p style={{fontSize: '12px', color: 'gray'}}>{recipe.comentariosExtras}</p>
        </div>
      );
  }
}

export default AdaptableRecipe;