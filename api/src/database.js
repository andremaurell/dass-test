
//RODAR HOSPEDADO NA INTERNET:

// const { Pool } = require('pg');
// require('dotenv').config();

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false, 
//   },
// });

// pool.connect()
//   .then(() => console.log('Conectado ao banco de dados!'))
//   .catch((err) => {
//     console.error('Erro ao conectar ao banco de dados:', err);
//     process.exit(1);
//   });

// module.exports = pool;


//RODAR LOCALMENTE:
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
});

module.exports = pool;