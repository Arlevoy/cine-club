import React, { MouseEvent } from "react"
import { PositionProperty } from "csstype"
import { Button } from "antd"

const styles = {
  button: {
    backgroundColor: "black",
    borderColor: "white",
    width: "auto",
    height: "auto",
    padding: 24,
    fontSize: 30,
    marginTop: 24,
  },
}

interface DesignedButtonProps {
  label: string
  onClick: any
}

export const DesignedButton = ({ label, onClick }: DesignedButtonProps) => (
  <Button style={styles.button} type="primary" onClick={onClick}>
    {label}
  </Button>
)
