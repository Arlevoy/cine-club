import React, { useState } from "react"
import { Link } from "gatsby"
import { Button, Layout } from "antd"

import SEO from "../components/seo"
import themes from "../data/theme.json"
import { FlexDirectionProperty, TextAlignProperty } from "csstype"

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column" as FlexDirectionProperty,
    alignItems: "center",
  },
  header: {
    padding: 50,
    textAlign: "center" as TextAlignProperty,
    fontSize: 20,
  },
  content: {
    display: "flex",
    flexDirection: "column" as FlexDirectionProperty,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  text: {
    fontSize: 48,
    marginBottom: 24,
  },
}

const renderThemes = (themes: string[]) => {
  const randomThemes = themes.sort(function() {
    return 0.5 - Math.random()
  })
  return randomThemes[0]
}

const IndexPage = () => {
  const [theme, setTheme] = useState("")
  const [isChoosing, setIsChoosing] = useState(false)
  const [randomInterval, setRandomInterval] = useState(null)

  const onClick = () => {
    setIsChoosing(isChoosing => !isChoosing)
    if (!isChoosing) {
      const interval = setInterval(() => setTheme(renderThemes(themes)), 100)
      setRandomInterval(interval)
    }
    return isChoosing && clearInterval(randomInterval)
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>Bienvenue au Ciné-Club de la Rue de Tracy</div>
      <div style={styles.content}>
        <div style={styles.text}>{theme}</div>
        <Button type="primary" onClick={onClick}>
          {isChoosing ? "Stop" : "Choisir le thème"}
        </Button>
      </div>
    </div>
  )
}

export default IndexPage
