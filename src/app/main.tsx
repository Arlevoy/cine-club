import React, { useState, Fragment, useEffect } from "react"
import { Button, Menu } from "antd"
import netlifyIdentity from "netlify-identity-widget"
import { Layout, Header, Content } from "../components/Layout"
import { DesignedButton } from "../components/button"

import themes from "../data/theme.json"
import { TextAlignProperty, PositionProperty } from "csstype"

interface MainProps {
  path: string
}

const styles = {
  buttonContainer: {
    marginBottom: 24,
  },
  text: {
    textAlign: "center" as TextAlignProperty,
    padding: 12,
    fontFamily: "Didact Gothic",
    color: "white",
    height: 150,
    fontSize: 40,
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
  console.log("props", props)
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
  console.log(process.env.FAUNADB_CINEVIM_SECRET)
  return (
    <Layout {...props}>
      <Header>Bienvenue au Ciné-Club de la Rue de Tracy</Header>
      <Content>
        <div style={styles.buttonContainer}>
          <DesignedButton
            label={isChoosing ? "Stop" : "Choisir le thème"}
            onClick={onClick}
          />
        </div>
        <div style={styles.text}>{theme}</div>
      </Content>
    </Layout>
  )
}
