import React, { useState } from 'react';

function RecipeForm({ initialData, onSave, onCancel }) {
  const [titulo, setTitulo] = useState(initialData?.titulo || '');
  // NUEVO: Estado para guardar qué diseño elegimos. Por defecto será 'estandar'
  const [variante, setVariante] = useState(initialData?.variante || 'estandar');
  const [ingredientes, setIngredientes] = useState(initialData?.ingredientes || [{ nombre: '', cantidad: '' }]);
  const [pasos, setPasos] = useState(initialData?.pasos || ['']);
  const [comentariosExtras, setComentariosExtras] = useState(initialData?.comentariosExtras || '');

  const handleIngredienteChange = (index, field, value) => {
    const nuevosIngredientes = [...ingredientes];
    nuevosIngredientes[index][field] = value;
    setIngredientes(nuevosIngredientes);
  };
  const addIngrediente = () => setIngredientes([...ingredientes, { nombre: '', cantidad: '' }]);
  const removeIngrediente = (index) => setIngredientes(ingredientes.filter((_, i) => i !== index));

  const handlePasoChange = (index, value) => {
    const nuevosPasos = [...pasos];
    nuevosPasos[index] = value;
    setPasos(nuevosPasos);
  };
  const addPaso = () => setPasos([...pasos, '']);
  const removePaso = (index) => setPasos(pasos.filter((_, i) => i !== index));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo.trim() || ingredientes.length === 0 || pasos.length === 0) {
      alert('Por favor completa el título, al menos un ingrediente y un paso.');
      return;
    }

    const recipeData = {
      id: initialData?.id || Date.now(),
      titulo,
      variante, // NUEVO: Guardamos la variante elegida en el objeto de la receta
      ingredientes: ingredientes.filter(ing => ing.nombre.trim() !== ''),
      pasos: pasos.filter(p => p.trim() !== ''),
      comentariosExtras
    };

    onSave(recipeData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '600px' }}>
        <h2>{initialData ? 'Editar Receta' : 'Crear Nueva Receta'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label><strong>Título de la Receta:</strong></label><br/>
            <input 
              type="text" 
              value={titulo} 
              onChange={(e) => setTitulo(e.target.value)} 
              placeholder="Ej: Patacones"
              required
            />
          </div>

          {/* NUEVO: Selector de Diseño */}
          <div style={{ marginBottom: '15px' }}>
            <label><strong>Diseño de la Tarjeta (Variante):</strong></label><br/>
            <select 
              value={variante} 
              onChange={(e) => setVariante(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', marginTop: '4px', borderRadius: '6px', border: '1px solid var(--border-color)', backgroundColor: '#f9fafb' }}
            >
              <option value="estandar">1. Estándar (Detallada)</option>
              <option value="compacta">2. Compacta (Solo línea)</option>
              <option value="destacada">3. Destacada (Color oscuro)</option>
              <option value="miniatura">4. Miniatura (Icono centrado)</option>
            </select>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label><strong>Ingredientes y Cantidades:</strong></label>
            {ingredientes.map((ing, index) => (
              <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '5px' }}>
                <input type="text" placeholder="Ingrediente" value={ing.nombre} onChange={(e) => handleIngredienteChange(index, 'nombre', e.target.value)} required />
                <input type="text" placeholder="Cantidad" value={ing.cantidad} onChange={(e) => handleIngredienteChange(index, 'cantidad', e.target.value)} required />
                {ingredientes.length > 1 && (
                  <button type="button" onClick={() => removeIngrediente(index)} className="btn-danger">X</button>
                )}
              </div>
            ))}
            <button type="button" onClick={addIngrediente} className="btn-outline" style={{ marginTop: '5px' }}>+ Agregar Ingrediente</button>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label><strong>Pasos a seguir:</strong></label>
            {pasos.map((paso, index) => (
              <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '5px', alignItems: 'center' }}>
                <span>{index + 1}.</span>
                <input type="text" placeholder="Paso..." value={paso} onChange={(e) => handlePasoChange(index, e.target.value)} required />
                {pasos.length > 1 && (
                  <button type="button" onClick={() => removePaso(index)} className="btn-danger">X</button>
                )}
              </div>
            ))}
            <button type="button" onClick={addPaso} className="btn-outline" style={{ marginTop: '5px' }}>+ Agregar Paso</button>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label><strong>Comentarios Extras:</strong></label><br/>
            <textarea value={comentariosExtras} onChange={(e) => setComentariosExtras(e.target.value)} />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onCancel} className="btn-outline">Cancelar</button>
            <button type="submit">Guardar Receta</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RecipeForm;