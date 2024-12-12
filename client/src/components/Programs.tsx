import { useEffect, useState } from "react";

type Program = {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  years: number;
};

function Programs() {
  const [data, setData] = useState<Program[]>([]);

  useEffect(() => {
    fetch("http://localhost:3310/api/programs")
      .then((resp) => resp.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);
  console.info(data);

  return (
    <div>
      <h1>Liste des séries</h1>
      {data.map((e) => (
        <div key={e.id}>
          <img src={e.poster} alt={e.title} />
          <h1>{e.title}</h1>
          <p>{e.synopsis}</p>
          <p>
            "Série produite en "{e.country} " en " {e.years}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Programs;
