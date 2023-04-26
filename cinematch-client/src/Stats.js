import './styles.css'
import React, { useState, useEffect } from 'react';
import {
  Table,
  Row,
  Col
} from 'react-bootstrap';
import CineMatchNavBar from './CineMatchNavBar';
import axios from 'axios';
import { PieChart, Pie, Legend, Cell, Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const API_KEY = "b5d2f69cf0491ce4441c4d04c4befc3d";
const BASE_URL = 'https://api.themoviedb.org/3';

function Stats() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([])
  const [topActors, setTopActors] = useState([])
  const [movieRuntime, setMovieRuntime] = useState([])
  const [topGenres, setTopGenres] = useState([])
  const [topDirectors, setTopDirectors] = useState([])
  const [ratings, setRatings] = useState([])
  const [releaseDate, setReleaseDate] = useState([])

  let genreChartData = [];
  let ratingsChartData = [];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/watched/')
      .then(response => {
        setWatched(response.data);
      }).catch(err => console.log(err));
  }, [])

  useEffect(() => {
    const getStats = async () => {
      const movieIds = watched.map(movie => movie.movie_id);
      const movieRatings = watched.map(movie => movie.rating.toString())
      try {
        const castsResponses = await axios.all(movieIds.map(id => axios.get(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`)));
        const responses = await axios.all(movieIds.map(id => axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)));
        const genreResponses = responses.map(response => response.data.genres).flat()
        const runtime = responses.map(response => response.data.runtime).flat()
        const casts = castsResponses.map(response => response.data.cast).flat();
        const crew = castsResponses.map(response => response.data.crew).flat();
        const releaseDate = responses.map(response => response.data.release_date).flat()

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

        const ratings = movieRatings.reduce((rat, currRat) => {
          const ratingVal = currRat
          rat[ratingVal] = rat[ratingVal] ? rat[ratingVal] + 1 : 1;
          return rat;
        }, {});

        const decades = releaseDate.reduce((map, date) => {
          const year = parseInt(date.split("-")[0]);
          const decade = Math.floor(year / 10) * 10;
          if (!map[decade]) {
            map[decade] = 1;
          } else {
            map[decade]++;
          }
          return map;
        }, {});

        const sortedActors = Object.entries(actors).sort((a, b) => b[1] - a[1]).slice(0, 10);
        const sortedDirectors = Object.entries(directors).sort((a, b) => b[1] - a[1]).slice(0, 10);
        setTopActors(sortedActors);
        setTopDirectors(sortedDirectors)
        setMovieRuntime(totalRuntime)
        setTopGenres(genres)
        setRatings(ratings)
        setReleaseDate(decades)
      } catch (error) {
        console.error(error);
      }
    };
    getStats();
  }, [watched]);

  for (let num = Object.entries(topGenres).length; num >= 0; num--) {
    genreChartData.push({
      genre: Object.keys(topGenres)[num],
      count: Object.values(topGenres)[num]
    })
  }

  for (let num = Object.entries(ratings).length; num >= 0; num--) {
    ratingsChartData.push({
      rating: Object.keys(ratings)[num],
      count: Object.values(ratings)[num]
    })
  }

  const [mostWatchedDecade, count] = Object.entries(releaseDate).reduce(
    ([decade, count], [currDecade, currCount]) => {
      if (currCount > count) {
        return [currDecade, currCount];
      }
      return [decade, count];
    },
    ["", 0]
  );
  console.log([mostWatchedDecade, count])

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <>
      <CineMatchNavBar setMovies={setMovies} />
      <span className="titleSpan">
        <h1>Stats</h1>
      </span>

      <div class="container">
        <div>
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
        </div>

        <div>
          <PieChart width={400} height={400}>
            <Legend layout="horizontal" verticalAlign="bottom" align="middle" ></Legend>
            <Pie
              data={genreChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={140}
              fill="#8884d8"
              dataKey="count"
              nameKey="genre"
              legendType='rect'
            >
              {genreChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </div>

        <div>
          <h1 align="center">Total Runtime Watched:</h1>
          <h1 align="center">{movieRuntime}</h1>
        </div>
      </div>

      <div className='container'>
        <div>
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
        </div>

        <div>
          <BarChart
            width={500}
            height={300}
            data={ratingsChartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="rating" label={{ value: 'Movie Ratings', position: 'insideBottomRight', offset: 0 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#D6B85A" />
          </BarChart>
        </div>

        <div>
          <h1 align="center">Most Watched Decade:</h1>
          <h1 align="center">{mostWatchedDecade}'s</h1>
        </div>
      </div>
    </>
  );
};

export default Stats;