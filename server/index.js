import express from 'express';
import cors from 'cors';
const app = express();

// Import the Google Cloud client library
import { BigQuery } from '@google-cloud/bigquery';

const port = process.env.PORT ?? 3000;


app.use(cors());


app.get('/:year', async (req, res) => {
    // res.send('hello from node')
    const data = await queryF1(req.params.year);
    res.send(data)
})

app.listen(process.env.PORT ?? 3000, async () => {
  console.log(`Server listening on port ${port}`);


});



async function queryF1(year) {
  // Queries a public Stack Overflow dataset.

  // Create a client
  const bigqueryClient = new BigQuery();

  // The SQL query to run
  const sqlQuery =
  `SELECT ROW_NUMBER() OVER(ORDER BY races.date DESC) AS id, races.year, FORMAT_DATE('%b-%d-%Y', races.date) AS Date, races.name AS GrandPrix, circuits.location, circuits.country, drivers.forename, drivers.surname, constructors.name AS Constructor
    FROM \`f1.drivers\` AS drivers
    JOIN \`f1.results\` AS results
    ON drivers.driverId = results.driverId
    JOIN \`f1.races\` AS races
    ON races.raceId = results.raceId
    JOIN \`f1.circuits\` AS circuits
    ON races.circuitId = circuits.circuitId
    JOIN \`f1.constructors\` AS constructors
    ON results.constructorId = constructors.constructorId
    WHERE results.position = 1 AND races.year = ${year}
    ORDER BY races.date DESC
    LIMIT 10;`;

//   const options = {
//     query: sqlQuery,
//     // projectId: 'redis-techinical-marketing'
//   };

  // Run the query
  const [rows] = await bigqueryClient.query(sqlQuery);

  // TODO
  // Cache aside
  // check Redis cache
  // if in Redis, return
  // else, JSON.SET race.year 


  console.log(rows);

  return rows;

//   console.log('Query Results:');
//   rows.forEach(row => {
//     const driver = row['driverRef'];
//     const nationality = row['nationality'];
//     console.log(`driver: ${driver}, ${nationality}`);
//   });
}
