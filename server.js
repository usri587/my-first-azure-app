const express = require('express');
const sql = require('mssql');
const app = express();
const PORT = process.env.PORT || 5000;


const config = {
  user: 'your_database_user',
  password: 'your_database_password',
  server: 'your_server_name.database.windows.net',
  database: 'your_database_name',
  options: {
    encrypt: true, // Use this if you're on Windows Azure
  },
};


app.get('/api/products', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM Product');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Internal Server Error');
  } finally {
    sql.close();
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
