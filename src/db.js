const Pool = require('pg').Pool;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  // host: 'localhost',
  // port: 5432,
  // user: 'postgres',
  // password: 'docker',
  // database: 'trivia-game',
});

const getRanking = async (req, res) => {
  const query = 'SELECT * FROM ranking';
  console.log('req');
  try {
    const result = await pool.query(query);
    console.log(result);

    return res.status(200).json(result.rows);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ ok: false });
  }
};

const setRanking = async (req, res) => {
  const { name, score, picture } = req.body;

  const query = 'INSERT INTO ranking (name, score, picture) VALUES ($1, $2, $3)';

  try {
    await pool.query(query, [name, score, picture]);
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ ok: false });
  }
};

module.exports = { getRanking, setRanking };
