import React, { useEffect } from "react"
import { Router } from "@reach/router" // comes with gatsby v2
import { Main } from "./main"
import { Login } from "./login"
import { initAuth } from "./services/auth"
import { PrivateRoute } from "./components/PrivateRoute"

// remember everything in /app/* is dynamic now!
const App = () => {
  useEffect(() => initAuth())
  return (
    <Router>
      <PublicRoute path="/app">
        <PrivateRoute path="/" component={Main} />
        <Login path="/login" />
      </PublicRoute>
    </Router>
  )
}
function PublicRoute(props) {
  return <div>{props.children}</div>
}

export default App
