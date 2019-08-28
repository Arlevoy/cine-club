const faunadb = require("faunadb") /* Import faunaDB sdk */

/* configure faunaDB Client with our secret */
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_CINEDIM_SECRET,
})

console.log("client", client)

/* export our lambda function as named "handler" export */
exports.handler = (event, context, callback) => {
  /* parse the string body into a useable JS object */

  /* construct the fauna query */
  return client
    .query(q.Paginate(q.Match(q.Index("all_movies"))))
    .then(response => {
      const moviesRef = response.data
      console.log("success", moviesRef)
      console.log(`${moviesRef.length} todos found`)

      const getAllMoviesQuery = moviesRef.map(ref => {
        return q.Get(ref)
      })
      return client
        .query(getAllMoviesQuery)
        .then(allMoviesResponse => {
          console.log("allMoviesResponse", allMoviesResponse)
          return callback(null, {
            statusCode: 200,
            body: JSON.stringify(allMoviesResponse),
          })
        })
        .catch(error => {
          console.log("error", error)
          /* Error! return the error with statusCode 400 */
          return callback(null, {
            statusCode: 400,
            body: "Hello Error",
          })
        })
    })
  /* Success! return the response with statusCode 200 */
}
