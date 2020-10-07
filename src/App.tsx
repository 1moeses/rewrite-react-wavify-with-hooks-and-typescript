import React from 'react'
import Wave from './components/Wave'
import './index.css'

// Todo: rewrite wavify in hooks and import script
const App: React.FC = () => {
  const options = {
    speed: 0.7,
    fill: 'url(#gradient-blue-red)',
    height: 300,
    width: 20,
    amplitude: 20,
    points: 5,
    paused: false,
    children: null,
    style: { zIndex: 10 },
    className: 'wave',
  }

  return (
    <Wave {...options}>
      <defs>
        <linearGradient id="gradient-blue-red" gradientTransform="rotate(90)">
          <stop offset="10%" stopColor="#257" />
          <stop offset="90%" stopColor="#f5576c" />
        </linearGradient>
        <linearGradient id="gradient-red-blue" gradientTransform="rotate(90)">
          <stop offset="50%" stopColor="#f5576c" />
          <stop offset="50%" stopColor="#257" />
        </linearGradient>
      </defs>
    </Wave>
  )
}

export default App
