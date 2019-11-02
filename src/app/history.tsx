import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
} from "react"
import { Layout, Content } from "../components/AppLayout"
import { RatingForm } from "./components/RatingForm"
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
  comments: {
    textAlign: "center",
    fontSize: 24,
    paddingTop: 24,
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
  ratingsContainer: {
    "&:hover": {
      backgroundColor: "blue",
    },
  },
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
  const [form, setForm] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currentMovie, setCurrentMovie] = useState(null)

  const measuredRef = useCallback(node => {
    if (node !== null) {
      setForm(node.getForm())
    }
  }, [])

  const showModal = movie => () => {
    console.log("movie", movie)
    setCurrentMovie(movie)
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const fetchHistory = () => {
    setIsLoading(true)
    return fetch("/.netlify/functions/getHistory")
      .then(response => {
        return response.json()
      })
      .then(result => {
        setHistory(formatMovies(result).reverse())
      })
      .finally(() => setIsLoading(false))
  }

  const handleCreate = () => {
    if (!getUser()) return null
    const { email, user_metadata } = getUser()
    const fullName = user_metadata["full_name"] || "Inconnu"
    form.validateFields(async (err, values) => {
      if (err) {
        return
      }
      try {
        const response = await fetch("/.netlify/functions/postRating", {
          body: JSON.stringify({ ...values, email, fullName, currentMovie }),
          method: "POST",
        })
        fetchHistory()
      } catch (error) {
        console.log("error", error)
      }
      console.log("Received values of form: ", values)
      form.resetFields()
      setIsModalVisible(false)
    })
  }

  useEffect(() => {
    fetchHistory()
  }, [history.length])
  return (
    <Layout {...props}>
      <Spin spinning={isLoading} delay={500}>
        <Content>
          {history ? (
            history.map((movie: MovieHistory) => {
              return (
                <Card
                  onClick={showModal(movie)}
                  key={movie.title}
                  style={styles.historyCard}
                >
                  <div style={styles.title}>{movie.title}</div>
                  <div>{movie.director}</div>
                  <div>{movie.releaseYear}</div>
                  <div style={styles.theme}>{movie.theme.join(" , ")}</div>
                  <div style={styles.watchingDate}>
                    Visionné le {movie.watchingDate}
                  </div>
                  <div style={styles.comments}>Commentaires</div>
                  {movie.ratings &&
                    Object.values(movie.ratings).map(rating => {
                      return (
                        <div style={styles.ratingsContainer}>
                          <Divider />
                          <div style={styles.user}>{rating.user}</div>
                          <div>Notes : {rating.rate}</div>
                          <div>Commentaires : {rating.comments}</div>
                        </div>
                      )
                    })}
                </Card>
              )
            })
          ) : (
            <Spin style={styles.spin} size="large" />
          )}
          <RatingForm
            ref={measuredRef}
            visible={isModalVisible}
            onCancel={handleCancel}
            onCreate={handleCreate}
          />
        </Content>
      </Spin>
    </Layout>
  )
}
