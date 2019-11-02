import React from "react"
import { FlexDirectionProperty } from "csstype"

const styles = {
  content: {
    display: "flex",
    flexDirection: "column" as FlexDirectionProperty,
    justifyContent: "center",
    overflow: "scroll",
    flex: 1,
    backgroundColor: "black",
  },
}

export const Content = ({ children, additionnalStyle }) => (
  <div style={{ ...styles.content, ...additionnalStyle }}>{children}</div>
)
