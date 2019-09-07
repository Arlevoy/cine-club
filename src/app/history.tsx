import React, { useState, useEffect } from "react"
import { Layout, Content } from "../components/AppLayout"
import { Card, Divider, Spin } from "antd"
import { getUser } from "./services/auth"

interface PropsType {}

interface MovieHistory {
  title: string
  director: string
  theme: string[]
  releaseYear: string
  watchingDate: string | Date
  ratings: Record<
    string,
    {
      user: string
      rate: string
      comments: string
    }
  >
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    maxHeight: "95vh",
    overflow: "scroll",
  },
  historyCard: {
    margin: 24,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  user: {
    fontWeight: "bold",
    color: "grey",
  },
  theme: { color: "#659DBD" },
  watchingDate: { color: "#BC986A" },
  spin: { position: "absolute", top: "50%", bottom: 0, left: 0, right: 0 },
}

interface FaunaDbData {
  data: MovieHistory
  ref: {
    "@ref": {
      id: string
    }
  }
}

const formatMovies = (movies: FaunaDbData[]) =>
  movies.map(movie => ({ ...movie.data, id: movie.ref["@ref"].id }))

export const History = (props: PropsType) => {
  const [history, setHistory] = useState<MovieHistory[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => {
    fetch("/.netlify/functions/getHistory")
      .then(response => {
        return response.json()
      })
      .then(result => {
        setHistory(formatMovies(result))
      })
    // fetch("/.netlify/functions/postRating")
    //   .then(response => {
    //     return response.json()
    //   })
    //   .then(result => console.log(result))
  }, [history.length])
  return (
    <Layout {...props}>
      <Content>
        {history ? (
          history.map((movie: MovieHistory) => {
            return (
              <Card key={movie.title} style={styles.historyCard}>
                <div style={styles.title}>{movie.title}</div>
                <div>{movie.director}</div>
                <div>{movie.releaseYear}</div>
                <div style={styles.theme}>{movie.theme.join(" , ")}</div>
                <div style={styles.watchingDate}>
                  Visonné le {movie.watchingDate}
                </div>
                <div>
                  {movie.ratings &&
                    Object.values(movie.ratings).map(rating => {
                      return (
                        <div>
                          <Divider />
                          <div style={styles.user}>{rating.user}</div>
                          <div>Notes : {rating.rate}</div>
                          <div>Commentaires : {rating.comments}</div>
                        </div>
                      )
                    })}
                </div>
              </Card>
            )
          })
        ) : (
          <Spin style={styles.spin} size="large" />
        )}
      </Content>
    </Layout>
  )
}
