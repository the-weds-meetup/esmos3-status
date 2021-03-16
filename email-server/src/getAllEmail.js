const dotenv = require("dotenv");
const { Client } = require("pg");

dotenv.config();
const isProduction = process.env.NODE_ENV === "production";

const connectionString = isProduction
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    }
  : {
      user: process.env.DATABASE_USER,
      host: process.env.DATABASE_URL,
      database: process.env.DATABASE_NAME,
      password: process.env.DATABASE_PASSWORD,
      port: 5432,
      ssl: {
        rejectUnauthorized: false,
      },
    };

module.exports = getAllEmail = async (req, res) => {
  const query = 'SELECT * FROM "Users"';

  const client = new Client(connectionString);
  await client.connect();

  try {
    const data = await client.query(query).then((res) => {
      return res.rows.map((fields) => fields.email);
    });
    res.status(200).send({
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  } finally {
    client.end();
  }
};
