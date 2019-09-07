import { client, faunaDbQuery } from "../lambda"

exports.handler = async event => {
  console.log("data", JSON.parse(event.body))
  const { rate, comments, email, fullName } = JSON.parse(event.body)
  const rating = {
    data: {
      ratings: {
        [email]: {
          user: fullName,
          rate,
          comments,
        },
      },
    },
  }

  try {
    const response = await client.query(
      faunaDbQuery.Update(
        faunaDbQuery.Ref(
          faunaDbQuery.Collection("movies"),
          "241963225072009739"
        ),
        rating
      )
    )
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    }
  } catch (error) {
    console.log("error", error)
    return { statusCode: 500, body: JSON.stringify(error) }
  }
}
