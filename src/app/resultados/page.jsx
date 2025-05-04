'use client'

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Loader from "@/components/loader/loader";
import Link from "next/link";

export default function Results() {
  const searchParams = useSearchParams();
  const query = searchParams.get("games") || "";
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false); // <- estado de loading

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (!query) return;

    async function fetchJogos() {
      setIsLoading(true); // <- começa o loading
      try {
        const API_KEY = '1403e8445556428da3c738117a0d0611';
        const response = await fetch(
          `https://api.rawg.io/api/games?search=${query}&key=${API_KEY}&page=${page}&page_size=12`
        );
        const data = await response.json();
        setGames(data.results || []);
      } catch (error) {
        console.error("Erro ao buscar jogos:", error);
      } finally {
        setIsLoading(false); // <- termina o loading
      }
    }

    fetchJogos();
  }, [query, page]);

  return (
    <div className="container py-5">
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="row">
            {games.map((game) => (
              <div className="col-md-6 col-lg-4 mb-4" key={game.id}>
                <div className="card bg-dark text-white h-100 shadow-lg rounded-4 border-0">
                  <img
                    src={game.background_image}
                    className="card-img-top rounded-top-4"
                    alt={game.name}
                    style={{ height: '220px', objectFit: 'cover' }}
                  />
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="card-title fw-bold">{game.name}</h5>
                      <div className="d-flex flex-wrap mb-2">
                        {game.parent_platforms?.map((platformObj) => (
                          <span
                            key={platformObj.platform.id}
                            className="badge bg-secondary me-2 mb-1"
                            style={{ fontSize: '0.75rem' }}
                          >
                            {platformObj.platform.name}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <Link href={`/games/${game.id}`} className="btn btn-outline-light btn-sm">
                        Ver mais
                      </Link>
                    </div>
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
      )}
    </div>
  );
}
