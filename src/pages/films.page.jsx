import { useState, useEffect } from "react";
import { filterFilmsByDirector, getListOf } from "../helpers/film.helpers";

export function FilmsPage(props) {
  //State Setter
  //The Reactive part will only change when the Setter is called.
  //Reactive  Setter     0/Default State
  let [list, setList] = useState([]); //useState returns an array with 2 values in it.
  let [searchDirector, setSearchDirector] = useState("");

  function getFilms() {
    fetch("https://studioghibliapi-d6fc8.web.app/films") //Fetch is always fetch->response->JSON->set->catch?
      .then((response) => response.json())
      .then((films) => setList(films))
      .catch((error) => console.error(error));
  }

  useEffect(() => {getFilms()}, []); //UseEffect is for Side Effects/anything that needs to update on page run.
  //Second parameter either stops it from running on each refresh, or makes it only run when a specific
  //item is changed.



  let filmsByDirector = filterFilmsByDirector(list, searchDirector); //Returns an array.
  let directors = getListOf(list, "director");
  console.log(directors);



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
          {directors.map((director, idx) => { //Creates Director options in the drop down list.
            return (
              <option key={director + idx} value={director}>
                {director}
              </option>
            );
          })}
        </select>  
      </form>
      <ul>
        {filmsByDirector.map((film) => { //Creates a list of all films.
          return <li key={film.id}>{film.title}</li>; //Keys are necessary for Reeact to keep up with map.
        })}
      </ul>
    </div>
  );
}
