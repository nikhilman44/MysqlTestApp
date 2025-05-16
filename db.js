// create-db.js
const mysql = require('mysql');

// Connect without specifying a database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'NMan4@*44' // your MySQL password
});

connection.connect((err) => {
  if (err) throw err;
  console.log('✅ Connected to MySQL');

  // Create database
  connection.query('CREATE DATABASE IF NOT EXISTS userdb', (err) => {
    if (err) throw err;
    console.log('✅ Database created or already exists');

    // Switch to the database
    connection.changeUser({ database: 'userdb' }, (err) => {
      if (err) throw err;

      // Create users table
      const tableQuery = `
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255),
          email VARCHAR(255) UNIQUE,
          password VARCHAR(255)
        );
      `;

      connection.query(tableQuery, (err) => {
        if (err) throw err;
        console.log('✅ Users table created or already exists');
       
      });
    });
  });
});

module.exports = connection;