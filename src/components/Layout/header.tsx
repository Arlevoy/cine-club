import React from "react"
import {
  TextTransformProperty,
  FontWeightProperty,
  TextAlignProperty,
} from "csstype"

const styles = {
  header: {
    textTransform: "uppercase" as TextTransformProperty,
    color: "white",
    padding: 50,
    marginBottom: 100,
    fontWeight: "bold" as FontWeightProperty,
    fontFamily: "Didact Gothic",
    textAlign: "center" as TextAlignProperty,
    fontSize: 35,
  },
}

export const Header = ({ children }) => (
  <div style={styles.header}>{children}</div>
)
