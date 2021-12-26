import React, { useState } from "react";
import { usePaginatedQuery } from "react-query";
import Planet from "./Planet";

const fetchPlanets = async (_key, params) => {
  const { page } = params;

  const res = await fetch(`https://swapi.dev/api/planets?page=${page}`);

  return res.json();
};

const Planets = () => {
  const [ page, setPage ] = useState(1);
  const {
    resolvedData,
    latestData,
    status
  } = usePaginatedQuery(['planets', { page }], fetchPlanets);

  return (
    <div>
      <h2>Planets</h2>

      {status === 'loading' && (
        <div>Loading data</div>
      )}

      {status === 'error' && (
        <div>Error fetching data</div>
      )}

      {status === 'success' && (
        <>
          <button
            disabled={page === 1}
            onClick={() => setPage(old => Math.max(old - 1, 1))}
          >
            Previous
          </button>

          <span>{page}</span>

          <button
            disabled={!latestData || !latestData.next}
            onClick={() => setPage(old => (!latestData || !latestData.next) ? old : old + 1)}
          >
            Next
          </button>

          <div>
            {resolvedData.results.map(planet => (
              <Planet key={planet.name} planet={planet} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Planets;
