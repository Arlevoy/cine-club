import React, { useState } from "react"
import { Layout, Content } from "../components/Layout"
import fakeHistory from "./fakeHistory.json"
import { Card, Divider, Form } from "antd"
import Text from "antd/lib/typography/Text"

interface PropsType {}

interface MovieHistory {
  title: string
  director: string
  ratings: {
    user: string
    rate: string
    comments: string
  }[]
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
  },
  user: {
    fontWeight: "bold",
    color: "grey",
  },
}

export const History = (props: PropsType) => {
  console.log("props", props)
  const [history, setHistory] = useState(fakeHistory)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const onClick = () => {
    setIsModalVisible(true)
    setHistory(history => [
      ...history,
      {
        title: "Memories of A Murder",
        director: "Alfred Hitchkok",
        ratings: [
          { user: "Edgar Servera", rate: "8,7", comments: "Bof" },
          { user: "Coraline Sainte-Beuve", rate: "7,7", comments: "Top" },
        ],
      },
    ])
  }

  return (
    <Layout {...props}>
      <div style={styles.container}>
        {history.map((movie: MovieHistory) => {
          return (
            <Card onClick={onClick} style={styles.historyCard}>
              <div style={styles.title}>{movie.title}</div>
              <div>
                {movie.ratings.map(rating => {
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
        })}
      </div>
    </Layout>
  )
}
