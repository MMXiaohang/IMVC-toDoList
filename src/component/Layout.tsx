// @ts-ignore
import React from "react"
import { Style } from "react-imvc/component"

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div style={{ height: "100%", background: "#fff" }}>
        <Style name="main" />
        {children}
    </div>
  )
}
