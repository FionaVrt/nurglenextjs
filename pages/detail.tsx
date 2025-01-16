import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Image from 'next/image';

interface HeroAttributes {
  name: string;
  description: string;
  image: {
    data: {
      attributes: {
        url: string;
      }
    }
  }
}

interface Hero {
  id: number;
  attributes: HeroAttributes;
}

const HeroDetail = () => {
  const [hero, setHero] = useState<Hero | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchHero = async () => {
        try {
          const response = await axios.get(`http://localhost:1337/api/heros/${id}?populate=*`);
          setHero(response.data.data);
        } catch (err) {
          setError('Erreur lors du chargement du héros');
          console.error(err);
        }
      };
      fetchHero();
    }
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!hero) return <div>Chargement...</div>;

  const imageUrl = hero.attributes.image.data 
    ? `http://localhost:1337${hero.attributes.image.data.attributes.url}`
    : '/placeholder-image.jpg'; // Utilisez une image par défaut si nécessaire

  return (
    <div>
      <h1>{hero.attributes.name}</h1>
      <Image 
        src={imageUrl}
        alt={hero.attributes.name}
        width={300}
        height={300}
      />
      <p>{hero.attributes.description}</p>
    </div>
  );
};

export default HeroDetail;
