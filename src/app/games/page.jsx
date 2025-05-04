'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Loader from '@/components/loader/loader'

export default function GamesPage() {
    const API_KEY = '1403e8445556428da3c738117a0d0611'
    const [games, setGames] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)

    const handlePrevious = () => {
        if (page > 1) setPage(page - 1)
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleNext = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
        setPage(page + 1)
       
    };

    useEffect(() => {
        setLoading(true)
        fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page=${page}&page_size=12`)
            .then((response) => response.json())
            .then((data) => {
                setGames(data.results)
                setLoading(false)
            });   
    }, [page]);

    return (
        <div className="container py-5">
            {loading ? (
                <Loader />
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
            {game.parent_platforms?.map((plataforma) => (
              <span
                key={plataforma.platform.id}
                className="badge bg-secondary me-2 mb-1"
                style={{ fontSize: '0.75rem' }}
              >
                {plataforma.platform.name}
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
                        <span className="text-white">Página {page}</span>
                        <button className="btn btn-primary"  onClick={handleNext}>
                            Próxima
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}
