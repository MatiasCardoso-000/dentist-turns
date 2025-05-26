import pg from "pg";

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

export const db = new Pool({
  allowExitOnIdle: true,
  connectionString
});

const connectDB = async () => {
  try {
    await db.query("SELECT NOW()");
    console.log("PostgreSQL connected 🚀🚀🚀");
  } catch (error) {
    console.error("Error connecting to PostgreSQL:", error);
    process.exit(1);
  }
};

export default {  connectDB };
