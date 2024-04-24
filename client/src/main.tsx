import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className='bg-stone-900 text-white h-screen w-full'>
    <App />
    </div>
  </React.StrictMode>,
)
