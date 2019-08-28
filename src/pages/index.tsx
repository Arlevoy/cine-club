import React from "react"
import { Router } from "@reach/router"
import App from "./app"
import { Link } from "gatsby"
import { Layout } from "../components/AppLayout/layout"
import { Content } from "../components/AppLayout/content"
import { DesignedButton } from "../components/button"

// remember everything in /app/* is dynamic now!
const IndexPage = () => (
  <Layout hasNavbar={false}>
    <Content>
      <Link to="/app/home">
        <DesignedButton label="Entrez" />
      </Link>
    </Content>
  </Layout>
)

export default IndexPage
