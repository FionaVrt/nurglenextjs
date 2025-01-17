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

    <div>
      <Image
        src={`http://localhost:1337${army.designe[0].url}`}
        alt={army.title}
        width={300}
        height={300}
        className="rounded-lg shadow-lg border-4 border-yellow-700"
      />
      <h1>{army.title}</h1>
      <div>
        {army.description.map((detail, index) => (
          <p key={index}>{detail.children[0].text}</p>
        ))}
      </div>
    </div>
  );
}
