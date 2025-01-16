import Image from "next/image";
import axios from 'axios';

interface Hero {
  id: number;
  name: string;
  detail: [
    {
      children: [
        { text: string }
      ]
    }
  ]
  design: [
    {
      url: string;
    }
  ]
}

export default async function Hero({ params, }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const response = await axios.get(`http://localhost:1337/api/heros?populate=*&filters[slug][$eq]=${slug}`);
  const hero: Hero = response.data.data[0];
  console.log(response.data.data);
  return (
    <div>
      <h1>{hero.name}</h1>
      <Image
        src={`http://localhost:1337${hero.design[0].url}`}
        alt={hero.name}
        width={300}
        height={300}
      />
      {hero.detail.map((detail) => (
        <p>{detail.children[0].text}</p>
      ))}
      <p>{hero.detail[0].children[0].text}</p>
    </div>
  );
}