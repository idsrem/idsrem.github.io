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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
