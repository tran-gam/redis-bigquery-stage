import express from 'express';
import cors from 'cors';
import getClient from "./redis.js";
import { BigQuery } from '@google-cloud/bigquery';


const app = express();
const port = process.env.PORT ?? 3000;


app.use(cors());
app.listen(process.env.PORT ?? 3000, async () => {
  console.log(`Server listening on port ${port}`);
});



app.get('/search/:year', async (req, res) => {
    const data = await queryYear(req.params.year);
    res.send(data)
})


app.get('/data/:raceId', async (req, res) => {
  const data = await queryRace(req.params.raceId);
  res.send(data)
})


async function queryYear(year) {
  const bigqueryClient = new BigQuery();

  // The SQL query to run
  const sqlQuery =
  `SELECT ROW_NUMBER() OVER(ORDER BY races.date DESC) AS id, races.raceId, races.year, FORMAT_DATE('%b-%d-%Y', races.date) AS date,
    races.name AS grandprix, circuits.location, circuits.country, drivers.forename, drivers.surname
    FROM \`f1.drivers\` AS drivers
    JOIN \`f1.results\` AS results
    ON drivers.driverId = results.driverId
    JOIN \`f1.races\` AS races
    ON races.raceId = results.raceId
    JOIN \`f1.circuits\` AS circuits
    ON races.circuitId = circuits.circuitId
    WHERE results.position = 1 AND races.year = ${year}
    LIMIT 100;`;


  // TODO
  // check Redis cache
  // if in Redis, return
  // else,
  // Run the query
  const [rows] = await bigqueryClient.query(sqlQuery);

  // SET race.year 

  console.log(rows);
  return rows;

//   console.log('Query Results:');
//   rows.forEach(row => {
//     const driver = row['driverRef'];
//     const nationality = row['nationality'];
//     console.log(`driver: ${driver}, ${nationality}`);
//   });
}

async function queryRace(raceId) {
  // Create a client
  const bigqueryClient = new BigQuery();

  // The SQL query to run
  const sqlQuery =
  `SELECT ROW_NUMBER() OVER(ORDER BY results.position ASC) AS id, results.position, FORMAT_DATE('%b-%d-%Y', races.date) AS date,
    races.name AS grandprix, circuits.name AS circuitName, circuits.location, circuits.country, drivers.forename, drivers.surname,
    results.laps, results.time, constructors.name AS constructor, drivers.url AS driverUrl, circuits.url AS circuitUrl
    FROM \`f1.results\` AS results
    JOIN \`f1.races\` AS races
    ON results.raceId = races.raceId
    JOIN \`f1.drivers\` AS drivers
    ON results.driverId = drivers.driverId
    JOIN \`f1.circuits\` AS circuits
    ON races.circuitId = circuits.circuitId
    JOIN \`f1.constructors\` AS constructors
    ON results.constructorId = constructors.constructorId
    WHERE races.raceId = ${raceId} AND results.position IS NOT NULL
    LIMIT 100;`;



  // TODO
  // check Redis cache
  // if in Redis, return
  // else,
  // Run the query
  const [rows] = await bigqueryClient.query(sqlQuery);

  // SET raceId


  console.log(rows);
  return rows;
}
