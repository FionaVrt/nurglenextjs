import Image from "next/image";
import axios from 'axios';
import Link from 'next/link';

interface Army {
  title: string;
  description: [
    {
      children: [
        { text: string }
      ]
    }
  ]
  designe: [
    {
      url: string;
    }
  ]
}

export default async function Home() {
  const response = await axios.get(`http://localhost:1337/api/army?populate=*`);
  const army: Army = response.data.data;
  console.log(response.data.data);

  return (
    <div className="min-h-screen bg-green-900 p-8 text-yellow-100">
      <div className="max-w-4xl mx-auto bg-green-800 rounded-lg shadow-2xl overflow-hidden">
        <div className="p-6 bg-green-950">
          <h1 className="text-4xl font-bold text-yellow-300 mb-4">{army.title}</h1>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-6">
            <Image
              src={`http://localhost:1337${army.designe[0].url}`}
              alt={army.title}
              width={500}
              height={500}
              className="rounded-lg shadow-lg border-4 border-yellow-700 w-full h-auto"
            />
          </div>
          <div className="md:w-1/2 p-6">
            {army.description.map((detail, index) => (
              <p key={index} className="mb-4 text-green-200">{detail.children[0].text}</p>
            ))}
          </div>
        </div>
        <div className="p-6 bg-green-950 text-center">
          <Link href="/heros" className="inline-block bg-yellow-600 hover:bg-yellow-700 text-green-900 font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105">
            Voir les Champions de Nurgle
          </Link>
        </div>
      </div>
    </div>
  );
}
