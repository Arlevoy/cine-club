import React, { Fragment } from "react"
import { Router } from "@reach/router"
import App from "./app"
import { Link } from "gatsby"
import { Layout } from "../components/AppLayout/layout"
import { Content } from "../components/AppLayout/content"
import { DesignedButton } from "../components/button"
import { Helmet } from "react-helmet"

const styles = {
  button: {
    display: "flex",
    justifyContent: "center",
  },
}

const IndexPage = () => (
  <Fragment>
    <Helmet
      title="Cinedim : Votre ClubCine du Dimanche soir"
      defer={false}
      link={[
        {
          rel: "icon",
          type: "image/svg",
          href: "https://image.flaticon.com/icons/svg/148/148723.svg",
        },
      ]}
    />
    <Layout hasNavbar={false}>
      <Content>
        <Link style={styles.button} to="/app/home">
          <DesignedButton label="Entrez" />
        </Link>
      </Content>
    </Layout>
  </Fragment>
)

export default IndexPage
