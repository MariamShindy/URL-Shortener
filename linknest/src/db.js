const Database = require('better-sqlite3');
const { drizzle } = require('drizzle-orm/better-sqlite3');
const { sql } = require('drizzle-orm'); 

const sqlite = new Database('linknest.db');
const db = drizzle(sqlite);

module.exports = db;
