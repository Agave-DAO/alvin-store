import React from 'react'
import styled, { createGlobalStyle, ThemeProvider as StyledComponentsThemeProvider, keyframes } from 'styled-components'

export default createGlobalStyle`
  @import url('https://rsms.me/inter/inter.css');
  
  body {
    min-height:100vh;
    padding: 0;
    margin: 0;
    font-family: sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: Inter, sans-serif;
    background: linear-gradient(188.87deg, #019D8B 4.99%, #122C34 62.79%),
    radial-gradient(64.22% 34.97% at 0% 0%, rgba(188, 242, 152, 0.3) 0%, rgba(188, 242, 152, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
  }
  body::-webkit-scrollbar {
    width: 1px;               /* width of the entire scrollbar */
  }
`

const theme = {
  uniswapPink: '#019D8B',
  primary: '#019D8B',
  secondary: '#F1F2F6',
  text: '#000',
  textDisabled: '#737373',
  orange: '#CF2C0A',
  green: '#66BB66',
  grey: '#F1F2F6',
  blue: '#2F80ED',
  white: '#FFF',
  black: '#000'
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const Spinner = styled.img`
  animation: 2s ${rotate} linear infinite;
  width: 16px;
  height: 16px;
`

export function ThemeProvider({ children }) {
  return <StyledComponentsThemeProvider theme={theme}>{children}</StyledComponentsThemeProvider>
}
