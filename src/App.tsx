import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PokemonList } from './components/PokemonList';
import { PokemonDetail } from './components/PokemonDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-red-600 text-white py-6 mb-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold">Pokédex</h1>
          </div>
        </header>
        
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;