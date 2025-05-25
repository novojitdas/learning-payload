import React from 'react'

const css = `
  html[data-theme="dark"] .graphic-logo {
    filter: invert(1);
  }

  .graphic-logo {
    width: 250px;
    height: auto;
  }
`

export const QuilLogo: any = () => {
  return (
    <>
      <style type="text/css">{css}</style>
      <img
        className="graphic-logo"
        src="https://raw.githubusercontent.com/TheQuilCraft/quilcraft-logos-icons/refs/heads/main/Logo%20Black.svg"
        alt="Your Logo"
      />
    </>
  )
}
