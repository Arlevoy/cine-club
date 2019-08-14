import React from "react"
import { Button } from "antd"
import { handleLogin } from "./services/auth"
import { navigate } from "@reach/router"
import { Layout } from "../components/layout"

export const Login = () => {
  const onClick = () => handleLogin(() => navigate("/"))
  return (
    <Layout>
      <div>Login</div>
      <Button onClick={onClick}>Login</Button>
    </Layout>
  )
}
