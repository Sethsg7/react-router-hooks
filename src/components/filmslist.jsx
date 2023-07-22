import { useState, useEffect } from "react";

function FilmList(props) {
    //State  Setter
  let [list, setList] = useState([]);

  function getFilms() {
    fetch("https://studioghibliapi-d6fc8.web.app/films") //Fetch is always fetch->response->JSON->set->catch?
      .then((response) => response.json())
      .then((films) => setList(films)) 
      .catch((error) => console.error(error));
  }

  useEffect(() => {getFilms()}, []);

  return (
    <ul>
      {list.map((film) => {
        return <li key={film.id}>{film.title}</li>; //Keys are necessary for Reeact to keep up with map.
      })}
    </ul>
  );
}   

export default FilmList;

