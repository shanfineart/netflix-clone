import React, { useEffect, useState } from "react";
import axios from "./axios";
import request from "./request";
import "./Banner.css";

function Banner() {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const requesta = await axios.get(request.fetchNetflixOriginals);
            setMovie(
                requesta.data.results[
                    /* selects one item randomly */
                    Math.floor(Math.random() * requesta.data.results.length - 1)
                ]
            );
            return requesta;
        }
        fetchData();
    }, []);
    
    function truncate(str, n) {
        return str?.length >n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        <header 
            className="banner"
                style={{
                    backgroundSize: "cover",
                    backgroundImage: `url(
                        "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
                        )`,
                    backgroundPosition: "center center",
                }}
        > 
            <div className='banner__contents'>
                <h1 className="banner__title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                 
                <div className="banner__buttons">
                    <button className="banner__playbutton">Play</button>
                    <button className="banner__moreInfoButton">More info</button>
                </div>

                <h1 className="banner__description">{truncate(movie?.overview, 150)}</h1>
            </div>
            <div className="banner--fadeBottom"></div>
        </header>
    )
}


export default Banner