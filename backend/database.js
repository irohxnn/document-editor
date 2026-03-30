const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('./database.db')

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS documents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      content TEXT
    )
  `)
  db.run(`
    CREATE TABLE IF NOT EXISTS shares (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    documentId INTEGER,
    userEmail TEXT
    )
    `)
})

module.exports = db