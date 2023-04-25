import './styles.css'
import React, { useState, useEffect } from 'react';
import {
  Table,
  Row,
  Col
} from 'react-bootstrap';
import CineMatchNavBar from './CineMatchNavBar';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip, Legend } from 'recharts';

const API_KEY = "b5d2f69cf0491ce4441c4d04c4befc3d";
const BASE_URL = 'https://api.themoviedb.org/3';

function Stats() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([])
  const [topActors, setTopActors] = useState([])
  const [movieRuntime, setMovieRuntime] = useState([])
  const [topGenres, setTopGenres] = useState([])
  const [topDirectors, setTopDirectors] = useState([])

  const data = [
    { name: "Facebook", users: 20 },
    { name: "Instagram", users: 15 },
    { name: "Twitter", users: 10 },
    { name: "Telegram", users: 50 },
  ];

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/watched/')
      .then(response => {
        setWatched(response.data);
      }).catch(err => console.log(err));
  }, [])

  useEffect(() => {
    const getStats = async () => {
      const movieIds = watched.map(movie => movie.movie_id);
      try {
        const castsResponses = await axios.all(movieIds.map(id => axios.get(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`)));
        const responses = await axios.all(movieIds.map(id => axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)));
        const genreResponses = responses.map(response => response.data.genres).flat()
        const runtime = responses.map(response => response.data.runtime).flat()
        const casts = castsResponses.map(response => response.data.cast).flat();
        const crew = castsResponses.map(response => response.data.crew).flat();

        const actors = casts.reduce((acc, cast) => {
          const actorName = cast.name;
          acc[actorName] = acc[actorName] ? acc[actorName] + 1 : 1;
          return acc;
        }, {});

        const directors = crew.reduce((dir, crew) => {
          let directorName = null;
          if (crew.job == 'Director') {
            directorName = crew.name;
            dir[directorName] = dir[directorName] ? dir[directorName] + 1 : 1;
          }
          return dir;
        }, {});

        const totalRuntime = runtime.reduce((run, currentRuntime) => {
          run += currentRuntime;
          return run;
        }, 0);

        const genres = genreResponses.reduce((gen, currGen) => {
          const genreName = currGen.name;
          gen[genreName] = gen[genreName] ? gen[genreName] + 1 : 1;
          return gen;
        }, {});

        const sortedActors = Object.entries(actors).sort((a, b) => b[1] - a[1]).slice(0, 10);
        setTopActors(sortedActors);
        const sortedDirectors = Object.entries(directors).sort((a, b) => b[1] - a[1]).slice(0, 10);
        setTopDirectors(sortedDirectors)
        setMovieRuntime(totalRuntime)
        const numGenres = Object.entries(genres)
        setTopGenres(numGenres)
      } catch (error) {
        console.error(error);
      }
    };
    getStats();
  }, [watched]);

  return (
    <>
      <CineMatchNavBar setMovies={setMovies} />
      <span className="titleSpan">
        <h1>Stats</h1>
      </span>

      <Table className='statsTable'>
        <thead>
          <tr>
            <th>Actor Name</th>
            <th>Number of Movies Watched</th>
          </tr>
        </thead>
        <tbody>
          {topActors.map(([actorName, numAppearances]) => (
            <tr key={actorName}>
              <td>{actorName}</td>
              <td>{numAppearances}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Table className='statsTable'>
        <thead>
          <tr>
            <th>Director Name</th>
            <th>Number of Movies Watched</th>
          </tr>
        </thead>
        <tbody>
          {topDirectors.map(([directorName, numAppearances]) => (
            <tr key={directorName}>
              <td>{directorName}</td>
              <td>{numAppearances}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="users" fill="#8884d8" />
        </BarChart>
      </div>
    </>
  );
};

export default Stats;