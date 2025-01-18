import Image from "next/image";
import axios from 'axios';
import Link from 'next/link';

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

export default async function Hero({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const response = await axios.get(`https://strapi-backend-0eap.onrender.com/api/heros?populate=*&filters[slug][$eq]=${slug}`);
  const hero: Hero = response.data.data[0];
  console.log(response.data.data);

  return (
    <div className="bg-green-900 min-h-screen p-8 text-yellow-100">
      <div className="max-w-4xl mx-auto bg-green-800 rounded-lg shadow-2xl overflow-hidden">
        <h1 className="text-4xl font-bold text-yellow-300 p-6 bg-green-950">{hero.name}</h1>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-6">
            <Image
              src={`https://strapi-backend-0eap.onrender.com${hero.design[0].url}`}
              alt={hero.name}
              width={300}
              height={300}
              className="rounded-lg shadow-lg border-4 border-yellow-700"
            />
          </div>
          <div className="md:w-1/2 p-6">
            {hero.detail.map((detail, index) => (
              <p key={index} className="mb-4 text-green-200">{detail.children[0].text}</p>
            ))}
          </div>
        </div>
        <div className="p-6 bg-green-950">
          <Link href="/heros" className="inline-block bg-yellow-600 hover:bg-yellow-700 text-green-900 font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105">
            Retour à la liste des Champions de Nurgle
          </Link>
        </div>
      </div>
    </div>
  );
}
