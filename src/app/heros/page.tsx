"use client";
import { useState, useEffect } from 'react';
import Image from "next/image";
import axios from 'axios';
import Link from 'next/link';

interface Hero {
  id: number;
  name: string;
  design: [
    {
        url: string;
    }
  ]
  slug: number
}

const Heros = () => {
  const [heroes, setHeroes] = useState<Hero[]>([]);

  useEffect(() => {
    const fetchHeroes = async () => {
      const response = await axios.get('http://localhost:1337/api/heros?populate=*');
      setHeroes(response.data.data);
      console.log(response.data.data);
    };
    fetchHeroes();
  }, []);

  return (
    <div className="min-h-screen bg-green-900 p-8">
      <h1 className="text-4xl font-bold text-yellow-300 mb-8 text-center">Champions de Nurgle</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {heroes.map((hero) => (
          <li key={hero.id} className="bg-green-800 rounded-lg shadow-lg overflow-hidden hover:bg-green-700 transition-all duration-300 transform hover:scale-105">
            <Link href={`/detail/${hero.slug}`} className="block p-4">
              <div className="flex items-center mb-2">
                {hero.design && hero.design[0] && (
                  <Image
                    src={`http://localhost:1337${hero.design[0].url}`}
                    alt={hero.name}
                    width={60}
                    height={60}
                    className="rounded-full mr-4 border-2 border-yellow-600"
                  />
                )}
                <span className="text-xl font-semibold text-yellow-200">{hero.name}</span>
              </div>
              <p className="text-green-300 text-sm">Cliquez pour les bénédictions de Nurgle</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Heros;
