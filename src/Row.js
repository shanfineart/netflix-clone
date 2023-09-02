import React, { useState, useEffect } from 'react'
import axios from './axios';
import "./Rows.css";


const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);

// A snippet of code which runs based on a specific condition/variable

    useEffect (() => {
        // if [], run once when the row loads ad don' t run again
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    
    return (
        <div className="row">
            <div className="row__title">
                <h2>{title}</h2>
            </div>
            <div className="row__posters">
                {movies.map(movie => (
                    <img 
                        key={movie.id} /* optimizates refresh rate and scrolling */
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`} /* all objects are row__posters, but ($) if isLargeRow, add (&&) a second class */
                        /* if isLargeRow then use movie.poster_path else use movie.backdrop path, note difference in poster shapes */
                        src={`${base_url}${ isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                        alt={movie.name}
                    />
))} 
            </div>
          
        </div>
  )
}

export default Row