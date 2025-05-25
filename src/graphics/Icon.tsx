import React from 'react'
import type { CustomComponent } from 'payload'

const css = `
  html[data-theme="dark"] .graphic-icon {
    filter: invert(1);
  }

  .graphic-icon {
    width: auto;
    height: auto;
  }
`

export const QuilIcon: any = () => {
  return (
    <>
      <img
        className="graphic-icon"
        src="https://raw.githubusercontent.com/TheQuilCraft/quilcraft-logos-icons/refs/heads/main/ICON%20Black.svg"
        alt="QuilCraft Logo Icon"
      />
    </>
  )
}
