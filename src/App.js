import React, { useState } from 'react';
import GameList from './components/GameList';  
import gamesData from './games.json';  
import './style/App.css';

function App() {
  // Estado para los juegos, el filtro por estado y el filtro por etiqueta
  const [games, setGames] = useState(gamesData);
  const [filter, setFilter] = useState('todos');
  const [tagFilter, setTagFilter] = useState('todos');  // Filtro por etiqueta

  // Función para ordenar alfabéticamente, considerando los números de manera natural
  const sortByName = (a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    
    return nameA.localeCompare(nameB, undefined, { numeric: true });
  };

  // Ordenar los juegos alfabéticamente por nombre
  const sortedGames = games.sort(sortByName);

  // Filtrar los juegos según el estado (sin afectar el orden alfabético)
  const filteredGames = sortedGames.filter((game) => {
    if (filter === 'jugando') {
      return game.status === 'jugando';
    } else if (filter === 'terminado') {
      return game.status === 'terminado';
    } else {
      return true;  // Muestra todos los juegos
    }
  });

  // Filtrar los juegos según la etiqueta seleccionada
  const filteredByTag = filteredGames.filter((game) => {
    const tags = game.tags || []; // Si 'tags' no está definido, usar un array vacío
    if (tagFilter === 'todos') {
      return true; // Muestra todos los juegos si no se ha seleccionado etiqueta
    } else {
      return tags.includes(tagFilter); // Filtra por la etiqueta seleccionada
    }
  });

  return (
    <div className='App'>
      <div className='container'>
        <h1>Mis Juegos</h1>

        {/* Filtro por estado */}
        <div className="filter-buttons">
          <button onClick={() => setFilter('jugando')}>Jugando</button>
          <button onClick={() => setFilter('terminado')}>Terminado</button>
          <button onClick={() => setFilter('todos')}>Todos</button>
        </div>

        {/* Filtro por etiquetas (usando un select dropdown) */}
        <div className="tag-filter">
          <label htmlFor="tagSelect">Filtrar por etiqueta:</label>
          <select
            id="tagSelect"
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
          >
            <option value="todos">Todos</option>
            <option value="Carreras">Carreras</option>
            <option value="Disney">Disney</option>
            <option value="Final Fantasy">Final Fantasy</option>
            <option value="Indie">Indie</option>
            <option value="Kingdom Hearts">Kingdom Hearts</option>
            <option value="Pokemon">Pokémon</option>
            <option value="RPG">RPG</option>
            <option value="Souls Like">Souls Like</option>
          </select>
        </div>

        {/* Separador visual */}
        <div className="filter-separator"></div>

        {/* Lista de juegos filtrados y ordenados */}
        <GameList games={filteredByTag} />
      </div>
    </div>
  );
}

export default App;
