import React, { useState, Fragment, useEffect } from "react"
import { Button } from "antd"
import netlifyIdentity from "netlify-identity-widget"
import { Layout } from "../components/layout"

import themes from "../data/theme.json"
import {
  FlexDirectionProperty,
  TextAlignProperty,
  PositionProperty,
  ZIndexProperty,
  FontWeightProperty,
  TextTransformProperty,
} from "csstype"

interface MainProps {
  path: string
}

const styles = {
  backgroundImage: {
    height: "100%",
    width: "100%",
    zIndex: "-1" as ZIndexProperty,
    position: "absolute" as PositionProperty,
    top: 0,
    filter: "blur(3px)",
    left: 0,
    backgroundSize: "cover",
    backgroundPosition: "bottom center",
    backgroundImage: `url(
      "https://images.unsplash.com/photo-1458053688450-eef5d21d43b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1652&q=80)`,
  },
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column" as FlexDirectionProperty,
    alignItems: "center",
  },
  header: {
    textTransform: "uppercase" as TextTransformProperty,
    color: "white",
    padding: 50,
    fontWeight: "bold" as FontWeightProperty,
    fontFamily: "Didact Gothic",
    textAlign: "center" as TextAlignProperty,
    fontSize: 35,
  },
  button: {
    backgroundColor: "black",
    borderColor: "white",
    width: "auto",
    height: "auto",
    padding: 24,
    fontSize: 30,
  },
  content: {
    display: "flex",
    flexDirection: "column" as FlexDirectionProperty,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  text: {
    textAlign: "center" as TextAlignProperty,
    padding: 12,
    fontFamily: "Didact Gothic",
    color: "white",
    fontSize: 52,
    marginBottom: 48,
  },
}

const renderThemes = (themes: string[]) => {
  const randomThemes = themes.sort(function() {
    return 0.5 - Math.random()
  })
  return randomThemes[0]
}

export const Main = (props: MainProps) => {
  const [theme, setTheme] = useState("")
  const [isChoosing, setIsChoosing] = useState(false)
  const [randomInterval, setRandomInterval] = useState(null)

  useEffect(() => {
    fetch("/.netlify/functions/getTheme").then(response => {
      return response.json()
    })
    netlifyIdentity.init()
  })

  const onClick = () => {
    setIsChoosing(isChoosing => !isChoosing)
    if (!isChoosing) {
      const interval = setInterval(() => setTheme(renderThemes(themes)), 100)
      setRandomInterval(interval)
    }
    return isChoosing && clearInterval(randomInterval)
  }
  const user = netlifyIdentity.currentUser()
  return (
    <Layout>
      <div style={styles.header}>Bienvenue au Ciné-Club de la Rue de Tracy</div>
      <div style={styles.content}>
        <div style={styles.text}>{theme}</div>
        <Button style={styles.button} type="primary" onClick={onClick}>
          {isChoosing ? "Stop" : "Choisir le thème"}
        </Button>
      </div>
    </Layout>
  )
}
