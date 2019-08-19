import React, { useEffect } from "react"
import { Router } from "@reach/router" // comes with gatsby v2
import { Main } from "./main"
import { Login } from "./login"
import { History } from "./history"
import { initAuth } from "./services/auth"
import { PrivateRoute } from "./components/PrivateRoute"

// remember everything in /app/* is dynamic now!
const App = () => {
  useEffect(() => initAuth())
  console.log("coucouc")
  return (
    <Router>
      <PublicRoute path="/app">
        <PrivateRoute path="/home" component={Main} />
        <PrivateRoute path="/history" component={History} />
        <Login path="/login" />
      </PublicRoute>
    </Router>
  )
}
function PublicRoute(props) {
  return <div>{props.children}</div>
}

export default App
