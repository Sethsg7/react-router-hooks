export function filterFilmsByDirector(list, director) {
  if (director) return list.filter((film) => film.director == director);
  else return list;
}

export function getListOf(list, prop) {
  return [...new Set(list.map((film) => film[prop] || ""))]; //Set = collection of non-repeating values.
} //Spread operator spreads out the array/adds each individual item.
//"" placed so an empty string is returned incase the Property on the Film doesn't exist.