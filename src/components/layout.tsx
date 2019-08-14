import React, { Fragment } from "react"
import PropTypes from "prop-types"
import {
  ZIndexProperty,
  PositionProperty,
  FlexDirectionProperty,
} from "csstype"

const styles = {
  backgroundImage: {
    height: "100%",
    width: "100%",
    zIndex: "-1" as ZIndexProperty,
    position: "absolute" as PositionProperty,
    top: 0,
    filter: "blur(3px)",
    left: 0,
    backgroundSize: "cover",
    backgroundPosition: "bottom center",
    backgroundImage: `url(
      "https://images.unsplash.com/photo-1458053688450-eef5d21d43b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1652&q=80)`,
  },
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column" as FlexDirectionProperty,
    alignItems: "center",
  },
}
export const Layout = ({ children }) => {
  return (
    <Fragment>
      <div style={styles.container}>{children}</div>
      <div style={styles.backgroundImage} />
    </Fragment>
  )
}
