import { client, faunaDbQuery } from "../lambda"

console.log("client", client)

exports.handler = async event => {
  try {
    const { data } = await client.query(
      faunaDbQuery.Paginate(
        faunaDbQuery.Match(faunaDbQuery.Index("all_movies"))
      )
    )
    const getAllMoviesQuery = data.map(ref => {
      return faunaDbQuery.Get(ref)
    })
    const result = await client.query(getAllMoviesQuery)
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    }
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify(error) }
  }
}

/* export our lambda function as named "handler" export */
// exports.handler = (event, context, callback) => {
//   /* parse the string body into a useable JS object */

//   /* construct the fauna query */
//   return client
//     .query(
//       faunaDbQuery.Paginate(
//         faunaDbQuery.Match(faunaDbQuery.Index("all_movies"))
//       )
//     )
//     .then(response => {
//       const moviesRef = response.data

//       const getAllMoviesQuery = moviesRef.map(ref => {
//         return faunaDbQuery.Get(ref)
//       })
//       return client
//         .query(getAllMoviesQuery)
//         .then(allMoviesResponse => {
//           return callback(null, {
//             statusCode: 200,
//             body: JSON.stringify(allMoviesResponse),
//           })
//         })
//         .catch(error => {
//           /* Error! return the error with statusCode 400 */
//           return callback(null, {
//             statusCode: 400,
//             body: JSON.stringify(error),
//           })
//         })
//     })
//   /* Success! return the response with statusCode 200 */
// }
