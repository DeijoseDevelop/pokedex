import React from 'react';
import { Link } from 'react-router-dom';
import { Pokemon } from '../types/pokemon';
import { typeColors, typeGradients } from '../utils/pokemonColors';

interface Props {
  pokemon: Pokemon;
}

export const PokemonCard: React.FC<Props> = ({ pokemon }) => {
  const mainType = pokemon.types[0].type.name;

  return (
    <Link to={`/pokemon/${pokemon.id}`}>
      <div className={`rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 ${typeGradients[mainType]}`}>
        <div className="relative">
          <img
            src={pokemon.sprites.other['official-artwork'].front_default}
            alt={pokemon.name}
            className="w-full h-48 object-contain drop-shadow-lg"
          />
        </div>
        <div className="mt-4">
          <p className="text-white/80 text-sm font-medium">#{pokemon.id.toString().padStart(3, '0')}</p>
          <h2 className="text-xl font-bold capitalize mb-2 text-white">{pokemon.name}</h2>
          <div className="flex gap-2">
            {pokemon.types.map(({ type }) => (
              <span
                key={type.name}
                className="bg-white/25 text-white px-3 py-1 rounded-full text-sm capitalize backdrop-blur-sm"
              >
                {type.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}