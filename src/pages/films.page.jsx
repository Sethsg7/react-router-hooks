import { useState, useEffect } from "react";
import {
  filterFilmsByDirector,
  getListOf,
  getFilmStats,
} from "../helpers/film.helpers";
import { Link } from "react-router-dom";

export function FilmsPage(props) {
  //State Setter
  //The Reactive part will only change when the Setter is called.
  //Reactive  Setter     0/Default State
  let [list, setList] = useState([]); //useState returns an array with 2 values in it.
  let [searchDirector, setSearchDirector] = useState("");

  function getFilms() {
    fetch("https://studioghibliapi-d6fc8.web.app/films") //Fetch is always fetch->.then(response)->.then(JSON)->set->catch?
      .then((response) => response.json())
      .then((films) => setList(films))
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    getFilms();
  }, []); //UseEffect is for Side Effects/anything that needs to update on page run.
  //Second parameter either stops it from running on each refresh, or makes it only run when a specific
  //item is changed.

  let filmsByDirector = filterFilmsByDirector(list, searchDirector); //Returns an array.
  let directors = getListOf(list, "director");
  let { avg_score, latest, total } = getFilmStats(filmsByDirector);

  return (
    <div>
      <h1>Studio Ghibli Films</h1>
      <form>
        <label htmlFor="searchDirector">Filter by Director</label>
        <select //Makes drop down list.
          name="searchDirector"
          id="searchDirector"
          value={searchDirector}
          onChange={(e) => setSearchDirector(e.target.value)}
        >
          <option value="">All</option>
          {directors.map((director, idx) => {
            //Creates Director options in the drop down list.
            return (
              <option key={director + idx} value={director}>
                {director}
              </option>
            );
          })}
        </select>
      </form>
      <div>
        <div>
          <span># Of Films: </span>
          <span>{total}</span>
        </div>
        <div>
          <span>Average Rating: </span>
          <span>{avg_score.toFixed(2)}</span>
        </div>
        <div>
          <span>Latest Film: </span>
          <span>{latest}</span>
        </div>
      </div>
      <ul>
        {filmsByDirector.map((film) => {
          //Creates a list of all films.
          return (
            <li key={film.id}>
              <Link to={`${film.id}`}>{film.title}</Link>;
            </li>
          ); //Keys are necessary for React to keep up with map.
        })}
      </ul>
    </div>
  );
}
