import React, { useEffect } from "react"
import { navigate } from "gatsby"
import { isLoggedIn } from "../services/auth"

export const PrivateRoute = ({ location, component: Component, ...props }) => {
  useEffect(() => {
    console.log("isLoggedIn()", isLoggedIn())
    if (!isLoggedIn() && location.pathname !== `/app/login`) {
      navigate(`/app/login`)
    }
  })
  return <Component {...props} />
}
