const express = require('express');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'bright',
  password: 'bright',
  database: 'demoapp'
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to MySQL server');
  }
});

app.get('/api/data', (req, res) => {
  const query = 'SELECT * FROM test_table';
  connection.query(query, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error fetching data');
    } else {
      res.json(results);
    }
  });
});

app.listen(3001, () => {
  console.log('Server listening on port 3001');
});
