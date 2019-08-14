import React, { useEffect } from "react"
import { navigate } from "gatsby"
import { isLoggedIn } from "../services/auth"

export const PrivateRoute = ({ location, component: Component, ...props }) => {
  useEffect(() => {
    if (!isLoggedIn() && location.pathname !== `/app/login`) {
      navigate(`/app/login`)
    }
  })
  return <Component {...props} />
}
