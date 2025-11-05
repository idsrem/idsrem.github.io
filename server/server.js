const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
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



app.post('/login', async (req, res) => {
  const { enumerator_code, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE enumerator_code = $1', [enumerator_code]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) {
      return res.status(401).json({ error: 'Username atau Kata Laluan Anda Salah.. Sila cuba lagi nanti' });
    }

    // Create JWT payload
    const payload = {
      id: user.id,
      name: user.name,
      role: user.role,
      enumerator_code: user.enumerator_code,
    };

    // Sign the JWT token (expires in 1 hour)
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });

    // Return user info and token
    res.json({
      token,
      id: user.id,
      name: user.name,
      role: user.role,
      enumerator_code: user.enumerator_code,
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// //Login Credentials Verfier
// app.post('/login', async (req, res) => {
//   const { enumerator_code, password } = req.body;

//   try {
//     const result = await pool.query('SELECT * FROM users WHERE enumerator_code = $1', [enumerator_code]);

//     if (result.rows.length === 0) {
//       return res.status(401).json({ error: 'User not found' });
//     }

//     const user = result.rows[0];
//     const match = await bcrypt.compare(password, user.password_hash);

//     if (!match) {
//       return res.status(401).json({ error: 'Username atau Kata Laluan Anda Salah.. Sila cuba lagi nanti' });
//     }

//     res.json({
//       id: user.id,
//       name: user.name,
//       role: user.role,
//       enumerator_code: user.enumerator_code,
//     });

//   } catch (err) {
//     console.error('Login error:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });



// Get all users (without password)
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, name, role, enumerator_code, created_at
      FROM users
      ORDER BY id DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new user
app.post('/users', async (req, res) => {
  const { name, role, enumerator_code, password, confirmPassword } = req.body;

  if (!name || !role || !enumerator_code || !password || !confirmPassword) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
    // Check for duplicate enumerator_code
    const existing = await pool.query(
      'SELECT id FROM users WHERE enumerator_code = $1',
      [enumerator_code]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Enumerator code already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insert = await pool.query(
      `INSERT INTO users (name, role, enumerator_code, password_hash)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, role, enumerator_code, created_at`,
      [name, role, enumerator_code, hashedPassword]
    );

    res.status(201).json({ message: 'User created', user: insert.rows[0] });
  } catch (err) {
    console.error('Error adding user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Update a user
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, role, enumerator_code, password, confirmPassword } = req.body;

  if (!name || !role || !enumerator_code) {
    return res.status(400).json({ error: 'Name, role, and enumerator code are required' });
  }

  try {
    // Check if enumerator_code is taken by another user
    const existing = await pool.query(
      'SELECT id FROM users WHERE enumerator_code = $1 AND id != $2',
      [enumerator_code, id]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Enumerator code already in use' });
    }

    let hashedPassword = null;
    if (password || confirmPassword) {
      if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
      }
      hashedPassword = await bcrypt.hash(password, 10);
    }

    if (hashedPassword) {
      await pool.query(
        `UPDATE users SET name = $1, role = $2, enumerator_code = $3, password_hash = $4 WHERE id = $5`,
        [name, role, enumerator_code, hashedPassword, id]
      );
    } else {
      await pool.query(
        `UPDATE users SET name = $1, role = $2, enumerator_code = $3 WHERE id = $4`,
        [name, role, enumerator_code, id]
      );
    }

    res.json({ message: 'User updated successfully' });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Delete a user
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.get('/users/me', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(`
      SELECT id, name, role, enumerator_code, created_at
      FROM users
      WHERE id = $1
    `, [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching current user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'yourSecretKey';

// ✅ Authentication Middleware
function authenticateUser(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
}

// POST /respondents/increment
app.post("/respondents/increment", async (req, res) => {
  try {
    const { kod, date } = req.body;

    if (!kod || !date) {
      return res.status(400).json({ error: "Missing kod or date" });
    }

    // Convert from YYYY-MM-DD → DD/MM/YYYY to match your DB
    const formattedDate = new Date(date).toLocaleDateString("en-GB"); // e.g. "04/11/2025"

    // Insert a dummy row to simulate a new respondent
    // If you have more respondent data to insert, you can add it here
    const insertResult = await pool.query(
      `INSERT INTO cycle4_demo (kod, tarikh) VALUES ($1, $2) RETURNING *`,
      [kod, formattedDate]
    );

    // Count total respondents for today after insert
    const countResult = await pool.query(
      `SELECT COUNT(*) AS count FROM cycle4_demo WHERE kod = $1 AND tarikh = $2`,
      [kod, formattedDate]
    );

    const todayCount = parseInt(countResult.rows[0].count) || 0;

    res.json({ count: todayCount });
  } catch (err) {
    console.error("Error incrementing respondent count:", err);
    res.status(500).json({ error: err.message });
  }
});


//Get today's respondent count for specific enumerator (by kod + tarikh)
app.get("/respondents/count", async (req, res) => {
  try {
    const { kod, date } = req.query; // expects e.g. kod=ST01&date=2025-11-04

    if (!kod || !date) {
      return res.status(400).json({ error: "Missing kod or date parameter" });
    }

    // Convert from YYYY-MM-DD → DD/MM/YYYY (matches tarikh format in your DB)
    const formattedDate = new Date(date).toLocaleDateString("en-GB"); // => "04/11/2025"

    const result = await pool.query(
      `
      SELECT COUNT(*) AS count
      FROM cycle4_demo
      WHERE kod = $1 AND tarikh = $2
      `,
      [kod, formattedDate]
    );

    const count = parseInt(result.rows[0].count) || 0;
    res.json({ count });
  } catch (err) {
    console.error("Error fetching respondent count:", err);
    res.status(500).json({ error: err.message });
  }
});




app.get("/respondent-history", async (req, res) => {
  try {
    // Use req.user if set, else fallback to query param
    const user = req.user || { role: "User", enumerator_code: req.query.user };

    if (!user || !user.enumerator_code) {
      return res.status(400).json({ error: "User code is required" });
    }

    let query = `
      SELECT 
        to_date(tarikh, 'DD/MM/YYYY') AS date,
        kod AS enumerator_code,
        COUNT(*) AS respondent_count
      FROM 
        cycle4_demo
      WHERE 
        tarikh ~ '^\\d{2}/\\d{2}/\\d{4}$'
    `;

    const params = [];

    if (user.role !== "Admin") {
      query += ` AND kod = $1`;
      params.push(user.enumerator_code);
    }

    query += `
      GROUP BY to_date(tarikh, 'DD/MM/YYYY'), kod
      ORDER BY date DESC, kod ASC;
    `;

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error("Database error", err);
    res.status(500).json({ error: err.message });
  }
});


app.get("/admin-summary", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        kod AS enumerator_code,
        COUNT(*) AS total_respondents
      FROM
        cycle4_demo
      WHERE
        tarikh ~ '^\\d{2}/\\d{2}/\\d{4}$'
      GROUP BY
        kod
      ORDER BY
        kod ASC;
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("Database error", err);
    res.status(500).json({ error: err.message });
  }
});


//For PIC
// GET /pic-summary?enumerator_code=ST00
app.get("/pic-summary", async (req, res) => {
  try {
    const picCode = req.query.enumerator_code; // from URL
    if (!picCode) {
      return res.status(400).json({ error: "Missing enumerator_code" });
    }

    const codePrefix = picCode.substring(0, 2); // e.g. "ST"

    const result = await pool.query(`
      SELECT
        kod AS enumerator_code,
        COUNT(*) AS total_respondents
      FROM
        cycle4_demo
      WHERE
        kod LIKE $1
      GROUP BY
        kod
      ORDER BY
        kod ASC;
    `, [`${codePrefix}%`]);

    res.json(result.rows);
  } catch (err) {
    console.error("Database error", err);
    res.status(500).json({ error: err.message });
  }
});



app.get("/respondent-history", async (req, res) => {
  try {
    const user = req.user || { role: "User", enumerator_code: req.query.user }; // fallback if no auth
    
    let query = "";
    let params = [];

    if (user.role === "Admin") {
      // Accumulated total respondents over time (all enumerators)
      query = `
      SELECT 
        kod AS enumerator_code,
        COUNT(*) AS total_respondents
      FROM
        cycle4_demo
      GROUP BY
        kod
      ORDER BY
        kod ASC;

      `;
    } else {
      // Regular enumerator-specific counts by date
      query = `
        SELECT 
          to_date(tarikh, 'DD/MM/YYYY') AS date,
          kod AS enumerator_code,
          COUNT(*) AS respondent_count
        FROM 
          cycle4_demo
        WHERE 
          tarikh ~ '^\\d{2}/\\d{2}/\\d{4}$'
          AND kod = $1
        GROUP BY 
          to_date(tarikh, 'DD/MM/YYYY'), kod
        ORDER BY 
          date DESC, kod ASC;
      `;
      params.push(user.enumerator_code);
    }

    const result = await pool.query(query, params);
    res.json(result.rows);

  } catch (err) {
    console.error("Database error", err);
    res.status(500).json({ error: err.message });
  }
});



app.post('/exportResponse', async (req, res) => {
  const userDataArray = req.body;  // The array of user data

  console.log("Hi Amiirul");
  
  // Ensure the array is valid
  if (!Array.isArray(userDataArray) || userDataArray.length === 0) {
    return res.status(400).send('Invalid data');
  }

  try {
    // Construct the placeholders for the values dynamically
    const columnCount = 24;  // Adjust based on the number of columns in your table
    const placeholders = userDataArray.map((_, index) => {
      return `(${Array.from({ length: columnCount }, (_, i) => `$${index * columnCount + (i + 1)}`).join(', ')})`;
    }).join(',');

    // Flatten the userDataArray into a single array of values
    const values = userDataArray.reduce((acc, {
      tarikh, kod, dun, umur, jantina, bangsa, bangsalain, pengaruhmediasemasa, persepsi, persepsilain, pengaruhberita, faktorlain, pendapatperibadi, partiataucalon,
      mengundiAdun, tidakundi, cenderunguntukundi, pilihanpartinasional, pilihanpartitempatan, pemimpinsabah, pemimpinsabahlain, responseid, starttime, endtime
    }) => {
      acc.push(tarikh, kod, dun, umur, jantina, bangsa, bangsalain, pengaruhmediasemasa, persepsi, persepsilain, pengaruhberita, faktorlain, pendapatperibadi, partiataucalon,
        mengundiAdun, tidakundi, cenderunguntukundi, pilihanpartinasional, pilihanpartitempatan, pemimpinsabah, pemimpinsabahlain, responseid, starttime, endtime || '');
      return acc;
    }, []);

    // Construct the SQL query dynamically | table name + column name
    const queryText = `INSERT INTO cycle2 (tarikh, kod, dun, umur, jantina, bangsa, bangsalain, pengaruhmediasemasa, persepsi, persepsilain, pengaruhberita, faktorlain,
      pendapatperibadi, partiataucalon, mengundiAdun, tidakundi, cenderunguntukundi, pilihanpartinasional, pilihanpartitempatan, pemimpinsabah, pemimpinsabahlain, responseid, starttime, endtime) 
      VALUES ${placeholders}`;

    // Execute the query
    await pool.query(queryText, values);


   // Send a JSON response
    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data', error);
    res.status(500).json({ message: 'Error saving data', error: error.message });
  }
});



app.post('/testResponse2', async (req, res) => {
  const userDataArray = req.body;

  console.log("Hi Habri");

  // Validate input
  if (!Array.isArray(userDataArray) || userDataArray.length === 0) {
    return res.status(400).send('Invalid data');
  }

  // Define column names (in correct table order)
  const columns = [
    'tarikh', 'kod', 'dun', 'umur', 'jantina', 'bangsa', 'bangsalain',
    'kerajaansemasa', 'mempengaruhiundian', 'cenderunguntukundi',
    'mengundiAdun', 'mengundiAdunLain', 'pemimpinsabah', 'pemimpinsabahlain',
    'lokasi', 'longitude', 'latitude', 'responseid', 'starttime', 'endtime'
  ];

  const columnCount = columns.length;

  try {
    // Dynamically generate placeholders
    const placeholders = userDataArray.map((_, rowIndex) => {
      const rowPlaceholders = columns.map((_, colIndex) =>
        `$${rowIndex * columnCount + colIndex + 1}`
      );
      return `(${rowPlaceholders.join(', ')})`;
    }).join(', ');

    // Flatten values in correct column order
    const values = userDataArray.flatMap(user =>
      columns.map(col => user[col] ?? '') // Use empty string if any field is undefined
    );

    // Construct dynamic SQL query
    const queryText = `
      INSERT INTO cycle4Test (${columns.join(', ')})
      VALUES ${placeholders}
    `;

    // Execute query
    await pool.query(queryText, values);

    // Respond success
    res.status(200).json({ message: 'Data saved successfully' });

  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ message: 'Error saving data', error: error.message });
  }
});

// USE THIS FOR NOW!!
//Use this for Cycle 4 to deploy
// for test table
app.post('/cycle4_official', async (req, res) => {
  const userDataArray = req.body;  // The array of user data

  console.log("Hi Amiirul");
  
  // Ensure the array is valid
  if (!Array.isArray(userDataArray) || userDataArray.length === 0) {
    return res.status(400).send('Invalid data');
  }

  try {
    // Construct the placeholders for the values dynamically
    const columnCount = 18;  // Adjust based on the number of columns in your table
    const placeholders = userDataArray.map((_, index) => {
      return `(${Array.from({ length: columnCount }, (_, i) => `$${index * columnCount + (i + 1)}`).join(', ')})`;
    }).join(',');

    // Flatten the userDataArray into a single array of values
    const values = userDataArray.reduce((acc, {
     responseid, tarikh, kod, zon, dun, parlimen, umur, jantina, bangsa, bangsalain, mengundiBedasarkan, cenderunguntukundi,
     pemimpinsabah, starttime, endtime, lokasi, latitude, longitude
    }) => {
      acc.push(responseid, tarikh, kod, zon, dun, parlimen, umur, jantina, bangsa, bangsalain, mengundiBedasarkan, cenderunguntukundi,
      pemimpinsabah, starttime, endtime, lokasi, latitude, longitude || '');
      return acc;
    }, []);

    // Construct the SQL query dynamically | table name + column name
    const queryText = `INSERT INTO cycle4_official (responseid, tarikh, kod, zon, dun, parlimen, umur, jantina, bangsa, bangsalain, mengundiBedasarkan, cenderunguntukundi,
      pemimpinsabah, starttime, endtime, lokasi, latitude, longitude) 
      VALUES ${placeholders}`;
    // Execute the query
    await pool.query(queryText, values);


   // Send a JSON response
    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data', error);
    res.status(500).json({ message: 'Error saving data', error: error.message });
  }
});



//Use this for Cycle 4 to test
// for test table
app.post('/test_cycle4', async (req, res) => {
  const userDataArray = req.body;  // The array of user data

  console.log("Hi Amiirul");
  
  // Ensure the array is valid
  if (!Array.isArray(userDataArray) || userDataArray.length === 0) {
    return res.status(400).send('Invalid data');
  }

  try {
    // Construct the placeholders for the values dynamically
    const columnCount = 24;  // Adjust based on the number of columns in your table
    const placeholders = userDataArray.map((_, index) => {
      return `(${Array.from({ length: columnCount }, (_, i) => `$${index * columnCount + (i + 1)}`).join(', ')})`;
    }).join(',');

    // Flatten the userDataArray into a single array of values
    const values = userDataArray.reduce((acc, {
      responseid, tarikh, kod, zon, dun, parlimen, umur, jantina, bangsa, bangsalain, kerajaansemasa, mempengaruhiundian, pilihanRaya, cenderunguntukundi,
      mengundiAdun, mengundiAdunLain, pemimpinsabah, pemimpinsabahlain, starttime, endtime, lokasi, latitude, longitude, isiboranglagi
    }) => {
      acc.push(responseid, tarikh, kod, zon, dun, parlimen, umur, jantina, bangsa, bangsalain, kerajaansemasa, mempengaruhiundian, pilihanRaya, cenderunguntukundi,
      mengundiAdun, mengundiAdunLain, pemimpinsabah, pemimpinsabahlain, starttime, endtime, lokasi, latitude, longitude, isiboranglagi || '');
      return acc;
    }, []);

    // Construct the SQL query dynamically | table name + column name
    const queryText = `INSERT INTO cycle4_demo (responseid, tarikh, kod, zon, dun, parlimen, umur, jantina, bangsa, bangsalain, kerajaansemasa, mempengaruhiundian, pilihanRaya, cenderunguntukundi,
      mengundiAdun, mengundiAdunLain, pemimpinsabah, pemimpinsabahlain, starttime, endtime, lokasi, latitude, longitude, isiboranglagi) 
      VALUES ${placeholders}`;
    // Execute the query
    await pool.query(queryText, values);


   // Send a JSON response
    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data', error);
    res.status(500).json({ message: 'Error saving data', error: error.message });
  }
});



// for test table
app.post('/testResponse', async (req, res) => {
  const userDataArray = req.body;  // The array of user data

  console.log("Hi Habri");
  
  // Ensure the array is valid
  if (!Array.isArray(userDataArray) || userDataArray.length === 0) {
    return res.status(400).send('Invalid data');
  }

  try {
    // Construct the placeholders for the values dynamically
    const columnCount = 25;  // Adjust based on the number of columns in your table
    const placeholders = userDataArray.map((_, index) => {
      return `(${Array.from({ length: columnCount }, (_, i) => `$${index * columnCount + (i + 1)}`).join(', ')})`;
    }).join(',');

    // Flatten the userDataArray into a single array of values
    const values = userDataArray.reduce((acc, {
      tarikh, kod, dun, umur, jantina, bangsa, bangsalain, pengaruhmediasemasa, persepsi, persepsilain, pengaruhberita, faktorlain, pendapatperibadi, partiataucalon,
      mengundiAdun, tidakundi, cenderunguntukundi, pilihanpartinasional, pilihanpartitempatan, pemimpinsabah, pemimpinsabahlain, responseid, starttime, endtime, lokasi
    }) => {
      acc.push(tarikh, kod, dun, umur, jantina, bangsa, bangsalain, pengaruhmediasemasa, persepsi, persepsilain, pengaruhberita, faktorlain, pendapatperibadi, partiataucalon,
        mengundiAdun, tidakundi, cenderunguntukundi, pilihanpartinasional, pilihanpartitempatan, pemimpinsabah, pemimpinsabahlain, responseid, starttime, endtime, lokasi || '');
      return acc;
    }, []);

    // Construct the SQL query dynamically | table name + column name
    const queryText = `INSERT INTO cycle2Test (tarikh, kod, dun, umur, jantina, bangsa, bangsalain, pengaruhmediasemasa, persepsi, persepsilain, pengaruhberita, faktorlain,
      pendapatperibadi, partiataucalon, mengundiAdun, tidakundi, cenderunguntukundi, pilihanpartinasional, pilihanpartitempatan, pemimpinsabah, pemimpinsabahlain, responseid, starttime, endtime, lokasi) 
      VALUES ${placeholders}`;

    // Execute the query
    await pool.query(queryText, values);


   // Send a JSON response
    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data', error);
    res.status(500).json({ message: 'Error saving data', error: error.message });
  }
});

// for test table cycle 3
app.post('/cycle3Demo', async (req, res) => {
  const userDataArray = req.body;  // The array of user data

  console.log("Hi Habri");
  
  // Ensure the array is valid
  if (!Array.isArray(userDataArray) || userDataArray.length === 0) {
    return res.status(400).send('Invalid data');
  }

  try {
    // Construct the placeholders for the values dynamically
    const columnCount = 15;  // Adjust based on the number of columns in your table
    const placeholders = userDataArray.map((_, index) => {
      return `(${Array.from({ length: columnCount }, (_, i) => `$${index * columnCount + (i + 1)}`).join(', ')})`;
    }).join(',');

    // Flatten the userDataArray into a single array of values
    const values = userDataArray.reduce((acc, { tarikh, kod, dun, umur, jantina, bangsa, bangsalain,
      mengundiAdun, cenderunguntukundi, pemimpinsabah, pemimpinsabahlain, responseid, starttime, endtime, mengundiAdunLain

    }) => {
      acc.push(tarikh, kod, dun, umur, jantina, bangsa, bangsalain,
        mengundiAdun, cenderunguntukundi, pemimpinsabah, pemimpinsabahlain, responseid, starttime, endtime, mengundiAdunLain || '');
      return acc;
    }, []);

    // Construct the SQL query dynamically | table name + column name
    const queryText = `INSERT INTO cycle3 (tarikh, kod, dun, umur, jantina, bangsa, bangsalain, mengundiAdun,  cenderunguntukundi, pemimpinsabah, pemimpinsabahlain, responseid, starttime, endtime, mengundiAdunLain) 
      VALUES ${placeholders}`;

    // Execute the query
    await pool.query(queryText, values);

   // Send a JSON response
    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data', error);
    res.status(500).json({ message: 'Error saving data', error: error.message });
  }
});



// for test table cycle 3
app.post('/cycle4', async (req, res) => {
  const userDataArray = req.body;  // The array of user data

  console.log("Hi Amiirul");
  
  // Ensure the array is valid
  if (!Array.isArray(userDataArray) || userDataArray.length === 0) {
    return res.status(400).send('Invalid data');
  }

  try {
    // Construct the placeholders for the values dynamically
    const columnCount = 22;  // Adjust based on the number of columns in your table
    const placeholders = userDataArray.map((_, index) => {
      return `(${Array.from({ length: columnCount }, (_, i) => `$${index * columnCount + (i + 1)}`).join(', ')})`;
    }).join(',');

    // Flatten the userDataArray into a single array of values
    const values = userDataArray.reduce((acc, { tarikh, responseid, kod, zon, dun, umur, jantina, bangsa, bangsalain, kerajaansemasa, mempengaruhiundian
       , parlimen, cenderunguntukundi, mengundiAdun, mengundiAdunLain, pemimpinsabah, pemimpinsabahlain, lokasi, latitude, longitude, starttime, endtime

    }) => {
      acc.push(tarikh, responseid, kod, zon, dun, umur, jantina, bangsa, bangsalain, kerajaansemasa, mempengaruhiundian
       , parlimen, cenderunguntukundi, mengundiAdun, mengundiAdunLain, pemimpinsabah, pemimpinsabahlain, lokasi, latitude, longitude, starttime, endtime || '');
      return acc;
    }, []);

    // Construct the SQL query dynamically | table name + column name
    const queryText = `INSERT INTO cycle4 (tarikh, responseid, kod, zon, dun, umur, jantina, bangsa, bangsalain, kerajaansemasa, mempengaruhiundian, parlimen, cenderunguntukundi, mengundiAdun, mengundiAdunLain, pemimpinsabah, pemimpinsabahlain, lokasi, latitude, longitude, starttime, endtime) 
      VALUES ${placeholders}`;

    // Execute the query
    await pool.query(queryText, values);

   // Send a JSON response
    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data', error);
    res.status(500).json({ message: 'Error saving data', error: error.message });
  }
});


// for test table cycle 3
// app.post('/cycle3Official', async (req, res) => {
//   const userDataArray = req.body;  // The array of user data

//   console.log("Hi Habri");
  
//   // Ensure the array is valid
//   if (!Array.isArray(userDataArray) || userDataArray.length === 0) {
//     return res.status(400).send('Invalid data');
//   }

//   try {
//     // Construct the placeholders for the values dynamically
//     const columnCount = 15;  // Adjust based on the number of columns in your table
//     const placeholders = userDataArray.map((_, index) => {
//       return `(${Array.from({ length: columnCount }, (_, i) => `$${index * columnCount + (i + 1)}`).join(', ')})`;
//     }).join(',');

//     // Flatten the userDataArray into a single array of values
//     const values = userDataArray.reduce((acc, { tarikh, kod, dun, umur, jantina, bangsa, bangsalain,
//       mengundiAdun, cenderunguntukundi, pemimpinsabah, pemimpinsabahlain, responseid, starttime, endtime, mengundiAdunLain

//     }) => {
//       acc.push(tarikh, kod, dun, umur, jantina, bangsa, bangsalain,
//         mengundiAdun, cenderunguntukundi, pemimpinsabah, pemimpinsabahlain, responseid, starttime, endtime, mengundiAdunLain
//  || '');
//       return acc;
//     }, []);

//     // Construct the SQL query dynamically | table name + column name
//     const queryText = `INSERT INTO cycle3 (tarikh, kod, dun, umur, jantina, bangsa, bangsalain, mengundiAdun, cenderunguntukundi, pemimpinsabah, pemimpinsabahlain, responseid, starttime, endtime, mengundiAdunLain) 
//       VALUES ${placeholders}`;

//     // Execute the query
//     await pool.query(queryText, values);

//    // Send a JSON response
//     res.status(200).json({ message: 'Data saved successfully' });
//   } catch (error) {
//     console.error('Error saving data', error);
//     res.status(500).json({ message: 'Error saving data', error: error.message });
//   }
//});

// for test table cycle 3
app.post('/testResponseCycle3', async (req, res) => {
  const userDataArray = req.body;  // The array of user data

  console.log("Hi Habri");
  
  // Ensure the array is valid
  if (!Array.isArray(userDataArray) || userDataArray.length === 0) {
    return res.status(400).send('Invalid data');
  }

  try {
    // Construct the placeholders for the values dynamically
    const columnCount = 17;  // Adjust based on the number of columns in your table
    const placeholders = userDataArray.map((_, index) => {
      return `(${Array.from({ length: columnCount }, (_, i) => `$${index * columnCount + (i + 1)}`).join(', ')})`;
    }).join(',');

    // Flatten the userDataArray into a single array of values
    const values = userDataArray.reduce((acc, { tarikh, kod, dun, umur, jantina, bangsa, bangsalain, partiataucalon,
      mengundiadun, cenderunguntukundi, pilihanpartinasional, pilihanpartitempatan, pemimpinsabah, pemimpinsabahlain, respondid, starttime, endtime, mengundiAdunLain
    }) => {
      acc.push(tarikh, kod, dun, umur, jantina, bangsa, bangsalain, partiataucalon,
        mengundiadun, cenderunguntukundi, pilihanpartinasional, pilihanpartitempatan, pemimpinsabah, pemimpinsabahlain, respondid, starttime, endtime, mengundiAdunLain || '');
      return acc;
    }, []);

    // Construct the SQL query dynamically | table name + column name
    const queryText = `INSERT INTO cycle3test (tarikh, kod, dun, umur, jantina, bangsa, bangsalain, partiataucalon, mengundiadun, cenderunguntukundi, pilihanpartinasional, pilihanpartitempatan, pemimpinsabah, pemimpinsabahlain, respondid, starttime, endtime, mengundiAdunLain) 
      VALUES ${placeholders}`;

    // Execute the query
    await pool.query(queryText, values);

   // Send a JSON response
    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data', error);
    res.status(500).json({ message: 'Error saving data', error: error.message });
  }
});




app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


