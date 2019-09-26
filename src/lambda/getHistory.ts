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
