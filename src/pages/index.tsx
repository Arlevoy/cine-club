import React from "react"
import { Router } from "@reach/router" // comes with gatsby v2

// remember everything in /app/* is dynamic now!
const App = () => {
  return (
    <Router>
      <PublicRoute path="/app" />
    </Router>
  )
}
function PublicRoute(props) {
  return <div>{props.children}</div>
}

export default App
