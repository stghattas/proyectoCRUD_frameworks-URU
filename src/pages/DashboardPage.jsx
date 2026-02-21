// NUEVO 1: Importamos useEffect
import React, { useState, useEffect } from 'react'; 
import AdaptableRecipe from '../components/Recipe/AdaptableRecipe';
import Modal from '../components/UI/Modal';
import RecipeForm from '../components/Recipe/RecipeForm';

function DashboardPage({ onLogout }) {
  
  // NUEVO 2: Modificamos el estado inicial para que busque primero en localStorage
  const [recipes, setRecipes] = useState(() => {
    const recetasGuardadas = localStorage.getItem('mis_recetas');
    if (recetasGuardadas) {
      return JSON.parse(recetasGuardadas); // Si hay recetas guardadas, las carga
    }
    // Si está vacio (primera vez), carga la de prueba
    return [{
      id: 1,
      titulo: 'Arepas de Queso',
      variante: 'estandar',
      ingredientes: [{ nombre: 'Harina PAN', cantidad: '2 tazas' }, { nombre: 'Queso', cantidad: '200g' }],
      pasos: ['Mezclar harina con agua y sal', 'Amasar hasta que esté suave', 'Armar y asar en el budare', 'Rellenar con queso'],
      comentariosExtras: 'Comer calientes con un poco de mantequilla.'
    }];
  });
  
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);

  // NUEVO 3: Cada vez que el arreglo 'recipes' cambia, lo guardamos en el navegador
  useEffect(() => {
    localStorage.setItem('mis_recetas', JSON.stringify(recipes));
  }, [recipes]);

  const handleSaveRecipe = (recipeData) => {
    if (editingRecipe) {
      setRecipes(recipes.map(r => r.id === recipeData.id ? recipeData : r));
      if (selectedRecipe && selectedRecipe.id === recipeData.id) {
        setSelectedRecipe(recipeData);
      }
    } else {
      setRecipes([...recipes, recipeData]);
    }
    setIsFormOpen(false);
    setEditingRecipe(null);
  };

  const handleDelete = (id) => {
    setRecipes(recipes.filter(r => r.id !== id));
    setSelectedRecipe(null);
  };

  const openEditForm = (recipe) => {
    setEditingRecipe(recipe);
    setIsFormOpen(true);
    setSelectedRecipe(null);
  };

  const openCreateForm = () => {
    setEditingRecipe(null);
    setIsFormOpen(true);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Gestión de Recetario</h1>
        <div>
          <button onClick={openCreateForm} style={{ marginRight: '10px' }}>
            + Nueva Receta
          </button>
          <button onClick={onLogout} className="btn-outline">
            Cerrar Sesión
          </button>
        </div>
      </div>

      {recipes.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280', border: '1px dashed #d1d5db', borderRadius: '6px' }}>
          <p>No hay registros disponibles. Haga clic en "Nueva Receta" para comenzar.</p>
        </div>
      ) : (
        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <AdaptableRecipe 
              key={recipe.id} 
              recipe={recipe} 
              variant={recipe.variante || 'estandar'} 
              onClick={() => setSelectedRecipe(recipe)} 
            />
          ))}
        </div>
      )}

      {selectedRecipe && (
        <Modal 
          recipe={selectedRecipe} 
          onClose={() => setSelectedRecipe(null)} 
          onDelete={handleDelete}
          onEdit={openEditForm}
        />
      )}

      {isFormOpen && (
        <RecipeForm 
          initialData={editingRecipe} 
          onSave={handleSaveRecipe} 
          onCancel={() => { setIsFormOpen(false); setEditingRecipe(null); }} 
        />
      )}
    </div>
  );
}

export default DashboardPage;