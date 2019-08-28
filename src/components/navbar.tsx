import React, { useState } from "react"
import { Menu } from "antd"

interface PropsType {}

export const Navbar = props => {
  const currentPath = props.path.replace("/", "")
  const [currentItem, setCurrentItem] = useState(currentPath)

  const onClick = e => {
    props.navigate(`/app/${e.key}`)
  }

  return (
    <Menu mode="horizontal" onClick={onClick} selectedKeys={[currentItem]}>
      <Menu.Item key="home">Home</Menu.Item>
      <Menu.Item key="history">Historique</Menu.Item>
    </Menu>
  )
}
