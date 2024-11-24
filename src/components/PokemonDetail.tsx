import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Ruler, Weight, Swords, Shield, Zap } from 'lucide-react';
import { Pokemon } from '../types/pokemon';
import { typeGradients } from '../utils/pokemonColors';

export const PokemonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        setPokemon(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
        setLoading(false);
      }
    };

    fetchPokemonDetail();
  }, [id]);

  if (loading || !pokemon) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const mainType = pokemon.types[0].type.name;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="inline-flex items-center text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg mb-8 transition-colors">
        <ArrowLeft className="mr-2" />
        Back to Pokédex
      </Link>
      
      <div className={`rounded-lg shadow-xl overflow-hidden ${typeGradients[mainType]}`}>
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-center justify-center">
              <img
                src={pokemon.sprites.other['official-artwork'].front_default}
                alt={pokemon.name}
                className="w-full max-w-md h-auto drop-shadow-2xl"
              />
            </div>
            
            <div className="text-white">
              <div className="mb-6">
                <p className="text-white/80 text-xl font-medium">#{pokemon.id.toString().padStart(3, '0')}</p>
                <h1 className="text-4xl font-bold capitalize mb-4">{pokemon.name}</h1>
                <div className="flex gap-2">
                  {pokemon.types.map(({ type }) => (
                    <span
                      key={type.name}
                      className="bg-white/25 px-4 py-1 rounded-full text-sm capitalize backdrop-blur-sm"
                    >
                      {type.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <Ruler className="w-5 h-5" />
                    <p className="text-white/80">Height</p>
                  </div>
                  <p className="text-xl font-semibold">{pokemon.height / 10}m</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <Weight className="w-5 h-5" />
                    <p className="text-white/80">Weight</p>
                  </div>
                  <p className="text-xl font-semibold">{pokemon.weight / 10}kg</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Swords className="w-6 h-6" />
                  Abilities
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {pokemon.abilities.map(({ ability }) => (
                    <div
                      key={ability.name}
                      className="bg-gray-100 p-3 rounded-lg text-center"
                    >
                      <span className="capitalize text-gray-800">
                        {ability.name.replace('-', ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Shield className="w-6 h-6" />
                  Defense Stats
                </h2>
                <div className="space-y-4">
                  {pokemon.stats.slice(2, 4).map(({ base_stat, stat }) => (
                    <div key={stat.name}>
                      <div className="flex justify-between mb-1">
                        <span className="capitalize text-gray-600">{stat.name.replace('-', ' ')}</span>
                        <span className="font-semibold">{base_stat}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className={`${typeColors[mainType]} h-2.5 rounded-full`}
                          style={{ width: `${(base_stat / 255) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Zap className="w-6 h-6" />
                Battle Stats
              </h2>
              <div className="space-y-4">
                {pokemon.stats.filter((_, index) => ![2, 3].includes(index)).map(({ base_stat, stat }) => (
                  <div key={stat.name}>
                    <div className="flex justify-between mb-1">
                      <span className="capitalize text-gray-600">{stat.name.replace('-', ' ')}</span>
                      <span className="font-semibold">{base_stat}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`${typeColors[mainType]} h-2.5 rounded-full`}
                        style={{ width: `${(base_stat / 255) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}