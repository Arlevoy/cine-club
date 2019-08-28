import React, { Fragment } from "react"
import PropTypes from "prop-types"
import {
  ZIndexProperty,
  PositionProperty,
  FlexDirectionProperty,
} from "csstype"
import { Menu } from "antd"
import { Navbar } from "../navbar"

const styles = {
  backgroundImage: {
    height: "100%",
    width: "100%",
    zIndex: "-1" as ZIndexProperty,
    position: "absolute" as PositionProperty,
    top: 0,
    filter: "blur(3px)",
    left: 0,
    backgroundColor: 'black',
    backgroundSize: "cover",
    backgroundPosition: "bottom center",
    backgroundImage: `url(
      "https://images.unsplash.com/photo-1458053688450-eef5d21d43b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1652&q=80)`,
  },
  background: {
    backgroundColor: 'black'
  },
}
export const Layout = ({ children, hasNavbar = true, ...props }) => {
  return (
    <div style={styles.background}>
      {hasNavbar && <Navbar {...props} />}
      {children}
      <div style={styles.backgroundImage} />
    </div>
  )
}
