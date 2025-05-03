'use client'

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Loader from "@/components/loader/loader";
import Link from "next/link";

export default function Results() {
  const searchParams = useSearchParams();
  const query = searchParams.get("games") || "";
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1)




  const handlePrevious = () => {
    if (page > 1) setPage(page - 1)
};

const handleNext = () => {
    setPage(page + 1)
};

  useEffect(() => {
    if (!query) return;

    async function fetchJogos() {

        const API_KEY = '1403e8445556428da3c738117a0d0611'
        const response = await fetch(`https://api.rawg.io/api/games?search=${query}&key=${API_KEY}&page=${page}`);
        const data = await response.json();
        setGames(data.results || []);
 
    }

    fetchJogos();
  }, [query, page]);

  return (
    <div className="container py-5">
  

  
        <>
            <div className="row">
                {games.map((game) => (
                    <div className="col-md-4 col-lg-3 mb-4" key={game.id}>
                        <div className="card h-100 shadow-sm">
                            <img
                                src={game.background_image}
                                className="card-img-top"
                                alt={game.name}
                                style={{ height: '180px', objectFit: 'cover' }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{game.name}</h5>
                                <p className="card-text">
                                    <strong>Lançamento:</strong> {game.released}
                                </p>

                                <Link href={`/games/${game.id}`}>Ver mais</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="d-flex justify-content-between align-items-center mt-4">
                <button
                    className="btn btn-primary"
                    onClick={handlePrevious}
                    disabled={page === 1}
                >
                    Anterior
                </button>
                <span>Página {page}</span>
                <button className="btn btn-primary" onClick={handleNext}>
                    Próxima
                </button>
            </div>
        </>
    
</div>
  );
}
