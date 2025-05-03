import './DetailsCard.css';

export default async function DetailsCard({ params }) {
  const { id } = params;
  const API_KEY = '1403e8445556428da3c738117a0d0611';

  const res = await fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
  const game = await res.json();

  const screenRes = await fetch(`https://api.rawg.io/api/games/${id}/screenshots?key=${API_KEY}`);
  const screenshotsData = await screenRes.json();
  const screenshots = screenshotsData.results;



  return (
    <>
<div className='tela-inteiro'>

        <div
          className="backdrop" style={{ backgroundImage: `url(${game.background_image})` }}
        >
          <div className='content-main p-3 gap-5'>
            <div className='container'>
              <h1>{game.name}</h1>

            </div>

          </div>

        </div>

        <div className="content-sec container mt-4">
          <div className="row justify-content-center gap-4">
            <div className="container text-white py-5">
              <div className="row">
                <div className="col-lg-7 mb-4">
                  <p className="mb-3">{game.description_raw}</p>
                  <p><strong>Lançamento:</strong> {game.released}</p>
                  <p><strong>Nota:</strong> {game.rating} / 5</p>
                </div>

                <div className="col-lg-5">
                  <div className="row g-3">
                    {screenshots.map((shot) => (
                      <div className="col-6" key={shot.id}>
                        <img src={shot.image} alt={`Screenshot ${shot.id}`} className="img-fluid rounded shadow" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

  
        </div>

    </>
  );
}
