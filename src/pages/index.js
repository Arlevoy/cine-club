import React, { useState } from "react"
import { Link } from "gatsby"
import { Button } from "antd"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import themes from "../data/theme.json"

const renderThemes = themes => {
  const randomThemes = themes.sort(function() {
    return 0.5 - Math.random()
  })
  return randomThemes[0]
}

const IndexPage = () => {
  const [theme, setTheme] = useState("")

  const onClick = () => setTheme(renderThemes(themes))

  return (
    <Layout>
      <SEO title="Home" />
      <div>{renderThemes(themes)}</div>
      <Button type="primary" onClick={onClick}>
        Choisir le thème
      </Button>
    </Layout>
  )
}

export default IndexPage
