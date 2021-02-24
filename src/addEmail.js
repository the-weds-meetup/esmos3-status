const dotenv = require("dotenv");
const { Client } = require("pg");

dotenv.config();
const isProduction = process.env.NODE_ENV === "production";

const connectionString = isProduction
  ? {
      host: process.env.DATABASE_URL,
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

module.exports = addEmails = async (req, res) => {
  const { email } = req.params;

  if (!email) {
    res.status(400).send("Invalid data");
  } else {
    const query = {
      text: 'INSERT INTO public."Users"(email) VALUES ($1)',
      values: [email],
    };

    const client = new Client(connectionString);
    await client.connect();

    await client
      .query(query)
      .then(() => res.status(201).send("OK"))
      .catch((error) => {
        console.log(error);
        res.status(418).send("Server Error");
      })
      .finally(() => client.end());
  }
};
