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
    <div>
      <h1>Liste des Héros</h1>
      <ul>
        {heroes.map((hero) => (
          <li key={hero.id}>
            <Link href={`/detail/${hero.slug}`}>{hero.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Heros;
