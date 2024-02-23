import { Pool } from "postgres-pool";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

export default pool;
