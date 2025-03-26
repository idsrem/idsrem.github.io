const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 10000;

// PostgreSQL configuration
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  //ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false
  ssl: { rejectUnauthorized: false }
});

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.post('/export', async (req, res) => {
  const dataArray = req.body;

  try {
    // Construct the placeholders for the values
    const placeholders = dataArray.map((_, index) => `($${index * 40 + 1}, $${index * 40 + 2}, $${index * 40 + 3}, $${index * 40 + 4}, $${index * 40 + 5}, $${index * 40 + 6}, 
      $${index * 40 + 7}, $${index * 40 + 8}, $${index * 40 + 9}, $${index * 40 + 10}, $${index * 40 + 11}, $${index * 40 + 12}, $${index * 40 + 13}, $${index * 40 + 14}, 
      $${index * 40 + 15}, $${index * 40 + 16}, $${index * 40 + 17}, $${index * 40 + 18}, $${index * 40 + 19}, $${index * 40 + 20}, $${index * 40 + 21}, $${index * 40 + 22}, 
      $${index * 40 + 23}, $${index * 40 + 24}, $${index * 40 + 25}, $${index * 40 + 26}, $${index * 40 + 27}, $${index * 40 + 28}, $${index * 40 + 29}, $${index * 40 + 30}, 
      $${index * 40 + 31}, $${index * 40 + 32}, $${index * 40 + 33}, $${index * 40 + 34}, $${index * 40 + 35}, $${index * 40 + 36}, $${index * 40 + 37}, $${index * 40 + 38}, 
      $${index * 40 + 39}, $${index * 40 + 40})`).join(',');

    // Flatten the dataArray into a single array of values
    const values = dataArray.reduce((acc, { 
      tarikh , dun, umur, jantina, agama, bangsa, tahappendidikan, pekerjaan, pendapatanbulanan, puasdgnpembangunansemasa, yapuasdgnpembangunansemasa, tidakpuasdgnpembangunansemasa, 
      keperluanasaspuashati, infrastrukturpuashati, kebajikanpuashati, lainlainpuashati, keperluanasastidakpuashati, infrastrukturtidakpuashati, kebajikantidakpuashati, 
      lainlaintidakpuashati, dunjalanidgnbaik, dunmenyelesaikanmasalah, undidun, cadangancalonyb, kmperubahanpositif, penambahbaikanmasadepan, tiadakesanpositif, perbaikikeperluanasas, 
      perbaikiinfrastruktur, perbaikiekonomi, perbaikiperkhidmatanawam, perbaikilainlain, tiadapositifkeperluanasas, tiadapositifinfrastruktur, tiadapositifekonomi, 
      tiadapositifperkhidmatanawam, tiadapositiflainlain, kriteriapemimpinbaik, pilihanpemimpinsabah, pilihanpemimpinsabahlain }) => {
      
      acc.push(tarikh, dun, umur, jantina, agama, bangsa, tahappendidikan, pekerjaan, pendapatanbulanan, puasdgnpembangunansemasa, yapuasdgnpembangunansemasa, tidakpuasdgnpembangunansemasa, 
      keperluanasaspuashati, infrastrukturpuashati, kebajikanpuashati, lainlainpuashati, keperluanasastidakpuashati, infrastrukturtidakpuashati, kebajikantidakpuashati, 
      lainlaintidakpuashati, dunjalanidgnbaik, dunmenyelesaikanmasalah, undidun, cadangancalonyb, kmperubahanpositif, penambahbaikanmasadepan, tiadakesanpositif, perbaikikeperluanasas, 
      perbaikiinfrastruktur, perbaikiekonomi, perbaikiperkhidmatanawam, perbaikilainlain, tiadapositifkeperluanasas, tiadapositifinfrastruktur, tiadapositifekonomi, tiadapositifperkhidmatanawam, 
      tiadapositiflainlain, kriteriapemimpinbaik, pilihanpemimpinsabah, pilihanpemimpinsabahlain || '');
      return acc;
    }, []);

    // Construct the SQL query dynamically | table name + column name
    const queryText = `INSERT INTO idstable (tarikh , dun, umur, jantina, agama, bangsa, tahappendidikan, pekerjaan, pendapatanbulanan, puasdgnpembangunansemasa,
      yapuasdgnpembangunansemasa, tidakpuasdgnpembangunansemasa, keperluanasaspuashati, infrastrukturpuashati, kebajikanpuashati, lainlainpuashati,
      keperluanasastidakpuashati, infrastrukturtidakpuashati, kebajikantidakpuashati, lainlaintidakpuashati, dunjalanidgnbaik, dunmenyelesaikanmasalah, undidun, cadangancalonyb,
      kmperubahanpositif, penambahbaikanmasadepan, tiadakesanpositif, perbaikikeperluanasas, perbaikiinfrastruktur, perbaikiekonomi, 
      perbaikiperkhidmatanawam, perbaikilainlain, tiadapositifkeperluanasas, tiadapositifinfrastruktur, tiadapositifekonomi, tiadapositifperkhidmatanawam, 
      tiadapositiflainlain, kriteriapemimpinbaik, pilihanpemimpinsabah, pilihanpemimpinsabahlain) VALUES ${placeholders}`;

    // Execute the query
    await pool.query(queryText, values);
    res.status(200).send('Data saved successfully');
  } catch (error) {
    console.error('Error saving data', error);
    res.status(500).send('Error saving data');
  }
});


//work in progress for cycle 2
// app.post('/exportResponse', async (req, res) => {
//   const newDataArray = req.body; // The new data array

//   try {
//     // Construct placeholders for the new data
//     // const newPlaceholders = newDataArray.map((_, index) => `($${index * 3 + 1}, $${index * 3 + 2}, $${index * 3 + 3})`).join(',');
   
//     const newPlaceholders = newDataArray.map((_, index) => 
//       // Generate 18 placeholders for each record
//       `(${
//         Array.from({ length: 18 }, (_, i) => `$${index * 18 + i + 1}`).join(', ')
//       })`
//     ).join(',');

//     // Flatten the new data array into a single array of values
//     // const newValues = newDataArray.reduce((acc, { field1, field2, field3 }) => {
//     //   acc.push(field1 || '', field2 || '', field3 || '');  // Push the values for the new table's fields
//     //   return acc;
//     // }, []);

//     const values = dataArray.reduce((acc, { 
//       tarikh , dun, umur, jantina, bangsa, bangsalain,pengaruhmediasemasa,persepsi,persepsilain,
//       pengaruhberita,faktorlain,pendapatperibadi,partiataucalon,cenderunguntukundi,pilihanpartinasional,pilihanpartitempatan,
//       pemimpinsabah,pemimpinsabahlain,isiboranglagi}))

//     // Construct the SQL query dynamically for the new table !!change new_table to new table in database
//     const newQueryText = `INSERT INTO new_table (tarikh , dun, umur, jantina, bangsa, bangsalain,pengaruhmediasemasa,persepsi,persepsilain,
//       pengaruhberita,faktorlain,pendapatperibadi,partiataucalon,cenderunguntukundi,pilihanpartinasional,pilihanpartitempatan,
//       pemimpinsabah,pemimpinsabahlain,isiboranglagi) VALUES ${newPlaceholders}`;

//     // Execute the query to insert into the new table
//     await pool.query(newQueryText, newValues);
//     res.status(200).send('Data saved successfully to new table');
//   } catch (error) {
//     console.error('Error saving data to new table', error);
//     res.status(500).send('Error saving data to new table');
//   }
// });

// new post 
app.post('/exportResponse', async (req, res) => {
  const userDataArray = req.body;  // The array of user data

  console.log("Hi Habri")
  try {
    // Construct the placeholders for the values
    const placeholders = userDataArray.map((_, index) => `($${index * 26 + 1}, $${index * 26 + 2}, $${index * 26 + 3}, $${index * 26 + 4}, $${index * 26 + 5}, $${index * 26 + 6}, 
      $${index * 26 + 7}, $${index * 26 + 8}, $${index * 26 + 9}, $${index * 26 + 10}, $${index * 26 + 11}, $${index * 26 + 12}, $${index * 26 + 13}, $${index * 26 + 14}, 
      $${index * 26 + 15}, $${index * 26 + 16}, $${index * 26 + 17}, $${index * 26 + 18}, $${index * 26 + 19}, $${index * 26 + 20}, $${index * 26 + 21}, $${index * 26 + 22}, 
      $${index * 26 + 23}, $${index * 26 + 24}, $${index * 26 + 25}, $${index * 26 + 26})`).join(',');

    // Flatten the userDataArray into a single array of values
    const values = userDataArray.reduce((acc, { 
      tarikh, kod, dun, umur, jantina, bangsa, bangsalain, pengaruhmediasemasa, persepsi, persepsilain, pengaruhberita, faktorlain, pendapatperibadi, partiataucalon,
      mengundiAdun, tidakundi, cenderunguntukundi, pilihanpartinasional, pilihanpartitempatan, pemimpinsabah, pemimpinsabahlain, isiboranglagi 
    }) => {
      acc.push(tarikh, kod, dun, umur, jantina, bangsa, bangsalain, pengaruhmediasemasa, persepsi, persepsilain, pengaruhberita, faktorlain, pendapatperibadi, partiataucalon,
        mengundiAdun, tidakundi, cenderunguntukundi, pilihanpartinasional, pilihanpartitempatan, pemimpinsabah, pemimpinsabahlain, isiboranglagi || '');
      return acc;
    }, []);

    // here
    // Construct the SQL query dynamically | table name + column name
    const queryText = `INSERT INTO cycle2 (tarikh, kod, dun, umur, jantina, bangsa, bangsalain, pengaruhmediasemasa, persepsi, persepsilain, pengaruhberita, faktorlain,
      pendapatperibadi, partiataucalon, mengundiAdun, tidakundi, cenderunguntukundi, pilihanpartinasional, pilihanpartitempatan, pemimpinsabah, pemimpinsabahlain, isiboranglagi) 
      VALUES ${placeholders}`;

    // Execute the query
    await pool.query(queryText, values);
    res.status(200).send('Data saved successfully');
  } catch (error) {
    console.error('Error saving data', error);
    res.status(500).send('Error saving data');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
