import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

// Create a single pool and reuse it
export const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "tssnitrcr",
    database: "QuikPost",
});

