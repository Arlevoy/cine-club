import { client, faunaDbQuery } from "../lambda"

exports.handler = async event => {
  // const data = JSON.parse(event.body)
  // console.log("Function `create rating` invoked", data)
  const rating = {
    data: {
      ratings: {
        "servera.edgar@gmail.com": {
          user: "Edgar Servera",
          rate: "8,7",
          comments: "Meilleur film du monde",
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
