import React from 'react'
import ReactDOM from 'react-dom'
import App from './src/App'
import Favicon from 'react-favicon';
import favIcon from './src/assets/images/favicon-96x96.png'

ReactDOM.render(
  <>
    <Favicon url={favIcon} />
    <App />
  </>,
  document.getElementById('root')
)