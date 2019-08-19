import React from "react"
import { FlexDirectionProperty } from "csstype"

const styles = {
  content: {
    display: "flex",
    flexDirection: "column" as FlexDirectionProperty,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
}

export const Content = ({ children }) => (
  <div style={styles.content}>{children}</div>
)
