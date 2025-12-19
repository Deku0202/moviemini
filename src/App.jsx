import { useEffect, useState } from "react";
import HorizontalRow from "./components/HorizontalRow";
import "./App.css";
const TMDB_BEARER = import.meta.env.API_KEY;


// const demoMovies = [
//   { id: 1, title: "Chainsaw Man", rank: "#1", poster: "https://picsum.photos/seed/csm1/300/420" },
//   { id: 2, title: "Chainsaw Man", rank: "#2", poster: "https://picsum.photos/seed/csm2/300/420" },
//   { id: 3, title: "Spirited", rank: null, poster: "https://picsum.photos/seed/sp/300/420" },
// ];

// const demoShows = [
//   { id: 1, title: "Show One", rank: "#1", poster: "https://picsum.photos/seed/tv1/300/420" },
//   { id: 2, title: "Show Two", rank: "#2", poster: "https://picsum.photos/seed/tv2/300/420" },
//   { id: 3, title: "Show Three", rank: null, poster: "https://picsum.photos/seed/tv3/300/420" },
// ];

const popular = [
  "movie",
  "tv" 
]

const series = [];



export default function App() {
  const [demoMovies, setDemoMovies] = useState([]);
  const [demoShows, setDemoShows] = useState([]);
  function movies_load(types) {
    for (const type of types) {
      const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TMDB_BEARER}`
      }
    };

    fetch(`https://api.themoviedb.org/3/${type}/popular?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => {
        const trending_mv = res.results;
        const list = [];
        for (let i = 0; i < trending_mv.length; i++) {
          if(trending_mv[i]){
            let poster = "https://image.tmdb.org/t/p/original" + trending_mv[i]["poster_path"];
            let mv = {
              id: i,
              title: type === "movie" ? trending_mv[i]["title"] : trending_mv[i]["original_name"],
              rank: i+1, 
              poster: poster }
            list.push(mv)
          }
          
        }
        if (type == "movie"){
          setDemoMovies(list);
        }
        else {
          setDemoShows(list);
        }
      })
      .catch(err => console.error(err));
    }
  }
  useEffect(() => {
    const tg = window?.Telegram?.WebApp;
    movies_load(popular);
    if (!tg) return;
    tg.ready();      // Telegram WebApp API
    tg.expand?.();
  }, []);

  return (
    <div className="screen">
      <header className="topbar">
      </header>

      <div className="searchWrap">
        <div className="search">
          <span className="icon">⌕</span>
          <input placeholder="Search movies..." />
        </div>
      </div>

      <div className="chips">
        <button className="chip chipActive">
          <span className="chipIcon">▦</span> Movies
        </button>
        <button className="chip">
          <span className="chipIcon">🌐</span> TV Shows
        </button>
      </div>

      <div className="hero">
        <img
          alt="Featured"
          src="https://picsum.photos/seed/hero/900/520"
        />
      </div>

      <section className="section">
        <div className="sectionHeader">
          <div className="sectionTitle">MOVIES</div>
          <button className="seeAll">See all</button>
        </div>
        <HorizontalRow items={demoMovies} />
      </section>

      <section className="section">
        <div className="sectionHeader">
          <div className="sectionTitle">TV SHOWS</div>
          <button className="seeAll">See all</button>
        </div>
        <HorizontalRow items={demoShows} />
      </section>

      <div className="bottomSafe" />
    </div>
  );
}
