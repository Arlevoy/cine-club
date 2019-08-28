import React from "react"
import { Typography } from "antd"
import { handleLogin } from "./services/auth"
import { navigate } from "@reach/router"
import { Layout, Header, Content } from "../components/AppLayout"
import { DesignedButton } from "../components/button"

const styles = {
  title: {
    color: "white",
  },
  button: {},
}

export const Login = () => {
  const onClick = () => handleLogin(() => navigate("/app"))
  return (
    <Layout hasNavbar={false}>
      <Header>
        <Typography style={styles.title}>
          🥺 Vous devez être connecté.e pour accèder au contenu
        </Typography>
      </Header>
      <Content>
        <DesignedButton label="Se connecter" onClick={onClick} />
      </Content>
    </Layout>
  )
}
