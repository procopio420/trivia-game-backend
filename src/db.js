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
  try {
    const result = await pool.query(query);

    return res.status(200).json(result.rows);
  } catch (e) {
    return res.status(500).json({ ok: false });
  }
};

const setRanking = async (req, res) => {
  const { name, score, picture } = req.body;

  const query = 'INSERT INTO ranking (name, score, picture) VALUES ($1, $2, $3)';

  if (name === 'Nome da pessoa' || name === 'Outra pessoa' || name === 'Mais uma pessoa') {
    return res.status(500).json({ ok: false });
  }

  try {
    await pool.query(query, [name, score, picture]);
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ ok: false });
  }
};

module.exports = { getRanking, setRanking };
