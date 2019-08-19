const faunadb = require("faunadb") /* Import faunaDB sdk */

/* configure faunaDB Client with our secret */
const q = faunadb.query
console.log("process.env", process.env.FAUNADB_CINEVIM_SECRET)
const client = new faunadb.Client({
  secret: process.env.FAUNADB_CINEVIM_SECRET,
})

console.log("client", client)

/* export our lambda function as named "handler" export */
exports.handler = (event, context, callback) => {
  /* parse the string body into a useable JS object */

  /* construct the fauna query */
  return client
    .query(q.Paginate(q.Match(q.Index("all_movies"))))
    .then(response => {
      console.log("success", response)
      /* Success! return the response with statusCode 200 */
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(response),
      })
    })
    .catch(error => {
      console.log("error", error)
      /* Error! return the error with statusCode 400 */
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error),
      })
    })
}
