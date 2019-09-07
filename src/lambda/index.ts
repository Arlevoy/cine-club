const faunadb = require("faunadb") /* Import faunaDB sdk */
require("dotenv").config()
console.log(
  "process.env.FAUNADB_CINEDIM_SECRET",
  process.env.FAUNADB_CINEDIM_SECRET
)
/* configure faunaDB Client with our secret */
export const faunaDbQuery = faunadb.query
export const client = new faunadb.Client({
  secret: process.env.FAUNADB_CINEDIM_SECRET,
})
