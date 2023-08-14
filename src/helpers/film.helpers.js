export function filterFilmsByDirector(list, director) {
  if (director) return list.filter((film) => film.director == director);
  else return list;
}

export function getListOf(list, prop) {
  return [...new Set(list.map((film) => film[prop] || ""))]; //Set = collection of non-repeating values.
} //Spread operator spreads out the array/adds each individual item.
//"" placed so an empty string is returned incase the Property on the Film doesn't exist.

export function getFilmStats(list) {
  return list.reduce( //Use reduce because we're fusing info from multiple values into 1.
    (stats, film) => {
      stats.total++;

      stats.acc_score += Number(film.rt_score);
      stats.avg_score = stats.acc_score / stats.total;

      if (stats.latest == null || stats.latest < film.release_date) {
        stats.latest = film.release_date;
      }

      return stats;
    },
    {
      acc_score: 0,
      avg_score: 0,
      total: 0,
      latest: null,
    }
  );
}
